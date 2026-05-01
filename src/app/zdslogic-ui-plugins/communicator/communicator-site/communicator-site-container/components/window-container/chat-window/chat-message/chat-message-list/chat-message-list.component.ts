import { Component, Input, OnInit, AfterViewInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Output, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject, takeUntil } from 'rxjs';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';
import { delay, finalize, filter } from 'rxjs/operators';

import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { Cookie } from 'ng2-cookies';

import { ChatMessageService } from 'app/zdslogic-ui-base/app/core/services/chat-message.service';
import { ChatMessage } from 'app/zdslogic-ui-base/app/core/models/chat-message.model';

import { ChatAdapter } from 'app/zdslogic-ui-base/chat/core/chat-adapter';
import { ChatParticipant } from 'app/zdslogic-ui-base/app/core/models/chat-participant.model';
import { ChatUser } from 'app/zdslogic-ui-base/chat/core/user';
import { ChatParticipantStatus } from 'app/zdslogic-ui-base/chat/core/chat-participant-status.enum';
import { ChatParticipantType } from 'app/zdslogic-ui-base/chat/core/chat-participant-type.enum';
import { DefaultFileUploadAdapter } from 'app/zdslogic-ui-base/chat/core/default-file-upload-adapter';
import { Group } from 'app/zdslogic-ui-base/chat/core/group';
import { IChatGroupAdapter } from 'app/zdslogic-ui-base/chat/core/chat-group-adapter';
import { IChatOption } from 'app/zdslogic-ui-base/chat/core/chat-option';
import { IChatParticipant } from 'app/zdslogic-ui-base/chat/core/chat-participant';
import { IFileUploadAdapter } from 'app/zdslogic-ui-base/chat/core/file-upload-adapter';
import { Localization } from 'app/zdslogic-ui-base/chat/core/localization';
import { StatusDescription } from 'app/zdslogic-ui-base/chat/core/localization';
import { MessageCounter } from 'app/zdslogic-ui-base/chat/core/message-counter';
import { MessageType } from 'app/zdslogic-ui-base/chat/core/message-type.enum';
import { ParticipantResponse } from 'app/zdslogic-ui-base/chat/core/participant-response';
import { ScrollDirection } from 'app/zdslogic-ui-base/chat/core/scroll-direction.enum';
import { Theme } from 'app/zdslogic-ui-base/chat/core/theme.enum';
import { chatParticipantStatusDescriptor } from 'app/zdslogic-ui-base/chat/core/chat-participant-status-descriptor';
import { Window } from 'app/zdslogic-ui-base/chat/core/window';

import { Contact } from '../../../../../../../../../zdslogic-ui-plugins/contacts/core/interfaces/contact.model';
import { PaginationPropertySort } from 'app/zdslogic-ui-base/core/interfaces/pagination';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';

import { ErrorService } from 'app/zdslogic-ui-base/core/services/error.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

import { environment } from '../../../../../../../../../../environments/environment';
import { application } from '../../../../../../../../../../../application';

@Component({
	selector: 'app-chat-message-list',
	templateUrl: './chat-message-list.component.html',
	styleUrls: ['./chat-message-list.component.scss',
		'./../../../../../assets/icons.css',
		'./../../../../../assets/loading-spinner.css',
		'./../../../../../assets/ng-chat.component.default.css',
		'./../../../../../assets//themes/ng-chat.theme.default.scss',
		'./../../../../../assets//themes/ng-chat.theme.dark.scss'

	],

})
export class ChatMessageListComponent implements OnInit, AfterViewInit {

	@Input()
	public contact: Contact;
	@Input()
	public theme: Theme = Theme.Light;
	@Input()
	public showMessageDate: boolean = true;
	@Input()
	public messageDatePipeFormat: string = 'short';

	@ViewChild('chatMessages') chatMessages: any;
	@ViewChild('nativeFileInput') nativeFileInput: ElementRef;
	@ViewChild('chatWindowInput') chatWindowInput: any;
	public displayedColumns = ['fromText', 'subject', 'dateSent', 'details', 'delete', 'junk'];
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	//@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
	@Output()
	public onMessagesSeen: EventEmitter<ChatMessage[]> = new EventEmitter<ChatMessage[]>();

	public contactId: number;

	public userId: number;
	public participant: ChatParticipant;
	public window: Window;
	public chatHistory: Array<ChatMessage> = [];
	private chatHistoryLoaded = false;
	public chatHistoryLoading = false;
	public searchString: string = '';

	sortProperty = 'dateSent';
	sortDirection = 'desc';
	filter: string = '';
	pageIndex = 0;
	pageSize = 25;
	total = 0;

	selectedMessage: number;
	currentUser: User = new User();

	/**
	 * Constructor
	 */
	constructor(
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService,
		private _http: HttpClient,
		private _router: Router,
		private _usersService: UsersService,) {

	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this._activeRoute.firstChild?.paramMap.pipe(
			filter(params => params.has('messageId'))
		).subscribe((params) => {
			this.selectedMessage = parseInt(params.get('messageId'), 10);
		});

		this.userId = this._usersService.getUserId();
		this.currentUser = this._usersService.getCurrentUser();

		this.contactId = this.contact.id;

		this.participant = new ChatParticipant();
		this.participant.participantType = ChatParticipantType.ChatUser;
		this.participant.id = this.contact.id;
		this.participant.status = ChatParticipantStatus.Online;
		this.participant.avatar = this.contact.imageURL;
		this.participant.displayName = this.contact.fullName;

		this.window = new Window(this.participant, true, false);

		this.fetchMessageHistory(this.window);
	}


	ngAfterViewInit(): void {

		this.sort.sortChange.subscribe((event) => {
			this.paginator.pageIndex = 0;
			this.sortProperty = event.active;
		});

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.fetchMessageHistory(this.window)
				)
			)
			.subscribe(

				(data) => {
					console.log(data);
				}

			);

		console.log(this.window);
		console.log('ChatWindowComponent completed');
	}

	searchFormSubmitted(type: string = 'All'): void {

		//this.paginator.pageIndex = 0;
		this.pageIndex = 0;

		this.fetchMessageHistory(this.window);

	}

	searchValueChanged(): void {

		//this.paginator.pageIndex = 0;
		this.pageIndex = 0;

		this.fetchMessageHistory(this.window);

	}

	onPaginatorChange($event: PageEvent): void {

		this.pageIndex = this.paginator.pageIndex;
		this.pageSize = this.paginator.pageSize;
		this.fetchMessageHistory(this.window);

	}

	public onMessageSelected(message: ChatMessage): void {
		//const url = `/messaging/messages/details/${message.id}`;
		//const url = `/messaging/${this.contact.id}/message/${message.id}`;

		//this._router.navigate([url]);

		const contactId: number = this.contact.id;
		const messageId: number = message.id;

		//const url = `/messaging/${contactId}`;

		const url = `/messaging/${contactId}/message/${messageId}`;

		this._router.navigate([url]);
	};

	fetchMessageHistory(window: Window): any {
		const sort = new PaginationPropertySort();
		sort.property = this.sortProperty;
		sort.direction = this.sortDirection;

		//this.paginator.pageIndex = 0;
		//this.paginator.pageSize = 25;
		this.getMessageHistory(window.participant.id)
			.pipe(
				map((result: ChatMessage[]) => {
					result.forEach(message => this.assertMessageType(message));

					window.messages = result.concat(window.messages);
					window.isLoadingHistory = false;

					this.window.messages = window.messages;
					this.window.isLoadingHistory = false;




					setTimeout(() => this.onFetchMessageHistoryLoaded(result, window, ScrollDirection.Bottom));
				})
			).subscribe();
	}

	getMessageHistory(destinataryId: any): Observable<ChatMessage[]> {
		this.chatHistoryLoaded = false;
		this.chatHistory = [];
		////console.log('destinataryId:' + destinataryId);
		const sort = new PaginationPropertySort();
		sort.property = this.sortProperty;
		sort.direction = this.sortDirection;

		this.findAllUserHistory(
			destinataryId,
			this.searchString,
			sort,
			this.paginator.pageIndex,
			this.paginator.pageSize

		).subscribe((response) => {

			this.total = response.totalElements;

			const content = response.content;

			const systemUser = this._usersService.getCurrentUser();
			content.forEach((element) => {

				if (((element.toId === destinataryId)
					|| (element.fromId === destinataryId))
					&& ((element.toId === systemUser.contactId)
						|| (element.fromId === systemUser.contactId))) {

					this.chatHistory.push(element);
				}
			});

			//this.chatHistory = this.removeDuplicates(this.chatHistory);

			this.chatHistoryLoaded = true;

		});

		return of(this.chatHistory).pipe(delay(2000));
	}

	findAllUserHistory(
		contactId = 0,
		filter = '',
		sort: PaginationPropertySort,
		pageNumber = 0,
		pageSize = 25): Observable<any> {

		const id: number = contactId;
		//sort.property = this.sortProperty;
		//sort.direction = this.sortDirection;

		const buildApiUrl = 'chat-message/history/' + id + '/page';
		let apiUrl = this.createCompleteRoute(buildApiUrl, environment.apiUrl);

		const paramsx: any = { page: pageNumber, size: pageSize };
		if (sort != null) {
			paramsx.sort = sort.property + ',' + sort.direction;
		}
		// const sortTest = 'firstName' + '\&' + 'firstName.dir=desc';
		// const sortTestEncoded = encodeURIComponent(sortTest);
		let sortTest = sort.direction;
		if (sort.property !== '') {
			sortTest = sort.property + ',' + sort.direction;
		}
		let search: string;
		let search1: string;
		let search2: string;
		if (filter !== '') {
			apiUrl = this.createCompleteRoute('chat-message/history/' + id + '/search', environment.apiUrl);
			//const fromText = '\'*' + filter + '*\'';
			//const subject = '\'*' + filter + '*\'';

			search1 = '(('+
				'(fromId===' + this.currentUser.contactId + ')'
				+ ' or '
				+ '(toId===' + this.currentUser.contactId + '))'
				+ ' and '
				+ '((fromId===' + contactId + ')'
				+ ' or '
				+ '(toId===' + contactId + '))'
				+ ')';

			//const message = '\'*' + filter + '*\'';
			const fromText = '\'*' + filter + '*\'';
			const subject = '\'*' + filter + '*\'';
			const message = '\'*' + filter + '*\'';

			search2 = '(fromText==' + fromText
				+ ' or '
				+ 'subject==' + subject
				+ ' or '
				+ 'message==' + message + ')';

			search = search1 + ' and ' + search2;
		}

		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Access-Control-Allow-Origin': environment.originHeader,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),

			params: new HttpParams()

				.set('search', search)
				.set('sort', sortTest)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())

		}).pipe(
			//map(result => result['content']),
			//			map((response) => {response['content'];}),
			map(response => response),
			catchError((error) => { this._errorHandlerService.handleError(error); return throwError(error.statusText); })
		);
	}

	private createCompleteRoute(route: string, envAddress: string): any {
		return `${envAddress}/${route}`;
	}

	private onFetchMessageHistoryLoaded(messages: ChatMessage[], window: Window, direction: ScrollDirection, forceMarkMessagesAsSeen: boolean = false): void {
		this.scrollChatWindow(window, direction);

		if (window.hasFocus || forceMarkMessagesAsSeen) {
			const unseenMessages = messages.filter(m => !m.dateSeen);

			this.markMessagesAsRead(unseenMessages);
		}
	}

	// Scrolls a chat window message flow to the bottom
	scrollChatWindow(window: Window, direction: ScrollDirection): void {
		if (!window.isCollapsed) {
			setTimeout(() => {
				if (this.chatMessages) {
					const element = this.chatMessages.nativeElement;
					const position = (direction === ScrollDirection.Top) ? 0 : element.scrollHeight;
					element.scrollTop = position;
				}
			});
		}
	}

	//ng-chat

	// Marks all messages provided as read with the current time.
	markMessagesAsRead(messages: ChatMessage[]): void {
		const currentDate = new Date();

		messages.forEach((msg) => {
			msg.dateSeen = currentDate;
		});

		this.onMessagesSeen.emit(messages);
	}

	private assertMessageType(message: ChatMessage): void {
		// Always fallback to 'Text' messages to avoid rendenring issues
		if (!message.type) {
			message.type = MessageType.Text;
		}
	}

	//ng-chat

	// Asserts if a user avatar is visible in a chat cluster
	isAvatarVisible(window: Window, message: ChatMessage, index: number): boolean {
		if (message.fromId !== this.userId) {
			if (index === 0) {
				return true; // First message, good to show the thumbnail
			}
			else {
				// Check if the previous message belongs to the same user, if it belongs there is no need to show the avatar again to form the message cluster
				if (window.messages[index - 1].fromId !== message.fromId) {
					return true;
				}
			}
		}

		return false;
	}

	getChatWindowAvatar(participant: IChatParticipant, message: ChatMessage): string | null {
		if (participant.participantType === ChatParticipantType.ChatUser) {
			return participant.avatar;
		}
		else if (participant.participantType === ChatParticipantType.Group) {
			const group = participant as Group;
			const userIndex = group.chattingTo.findIndex(x => x.id === message.fromId);

			return group.chattingTo[userIndex >= 0 ? userIndex : 0].avatar;
		}

		return null;
	}

}
