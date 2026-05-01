import { Component, Input, OnInit, AfterViewInit, OnDestroy, ViewChild, AfterContentInit, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { HostListener, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Inject, ElementRef } from '@angular/core';

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { HostBinding, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { FormControl, UntypedFormGroup } from '@angular/forms';

import { Cookie } from 'ng2-cookies';

import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
//import { AppService } from './app.service';
import { map, catchError } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { filter, ReplaySubject, Subscription } from 'rxjs';
import { fromEvent } from 'rxjs';

import { MatButton } from '@angular/material/button';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';

import { fuseAnimations } from 'app/zdslogic-ui-shell/@fuse/animations/public-api';
import { FuseNavigationItem, FuseVerticalNavigationAppearance, FuseVerticalNavigationMode, FuseVerticalNavigationPosition } from 'app/zdslogic-ui-shell/@fuse/components/navigation/navigation.types';
import { FuseNavigationService } from 'app/zdslogic-ui-shell/@fuse/components/navigation/navigation.service';
import { FuseScrollbarDirective } from 'app/zdslogic-ui-shell/@fuse/directives/scrollbar/scrollbar.directive';
import { FuseUtilsService } from 'app/zdslogic-ui-shell/@fuse/services/utils/utils.service';
import { FuseMediaWatcherService } from 'app/zdslogic-ui-shell/@fuse/services/media-watcher';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ChatAdapter } from 'app/zdslogic-ui-base/chat/core/chat-adapter';
import { ChatUser } from 'app/zdslogic-ui-base/chat/core/user';
import { ChatParticipant } from 'app/zdslogic-ui-base/app/core/models/chat-participant.model';
import { ChatParticipantState } from 'app/zdslogic-ui-base/app/core/models/chat-participant-state';
import { ChatParticipantStatus } from 'app/zdslogic-ui-base/chat/core/chat-participant-status.enum';
import { ChatParticipantType } from 'app/zdslogic-ui-base/chat/core/chat-participant-type.enum';
import { DefaultFileUploadAdapter } from 'app/zdslogic-ui-base/chat/core/default-file-upload-adapter';
import { Group } from 'app/zdslogic-ui-base/chat/core/group';
import { IChatController } from 'app/zdslogic-ui-base/chat/core/chat-controller';
import { IChatGroupAdapter } from 'app/zdslogic-ui-base/chat/core/chat-group-adapter';
import { IChatOption } from 'app/zdslogic-ui-base/chat/core/chat-option';
import { IChatParticipant } from 'app/zdslogic-ui-base/chat/core/chat-participant';
import { IFileUploadAdapter } from 'app/zdslogic-ui-base/chat/core/file-upload-adapter';
import { Localization } from 'app/zdslogic-ui-base/chat/core/localization';
import { MessageCounter } from 'app/zdslogic-ui-base/chat/core/message-counter';
import { MessageType } from 'app/zdslogic-ui-base/chat/core/message-type.enum';
import { PagedHistoryChatAdapter } from 'app/zdslogic-ui-base/chat/core/paged-history-chat-adapter';
import { ParticipantResponse } from 'app/zdslogic-ui-base/chat/core/participant-response';
import { ScrollDirection } from 'app/zdslogic-ui-base/chat/core/scroll-direction.enum';
import { StatusDescription } from 'app/zdslogic-ui-base/chat/core/localization';
import { Theme } from 'app/zdslogic-ui-base/chat/core/theme.enum';
import { chatParticipantStatusDescriptor } from 'app/zdslogic-ui-base/chat/core/chat-participant-status-descriptor';
import { Window } from 'app/zdslogic-ui-base/chat/core/window';
//import { Message } from '../../zdslogic-ui-base/chat/core/message';
import { NgChatWindowComponent } from 'app/zdslogic-ui-base/chat/components/ng-chat-window/ng-chat-window.component';
import { NgChatFriendsListComponent } from 'app/zdslogic-ui-base/chat/components/ng-chat-friends-list/ng-chat-friends-list.component';
import { NgChat } from 'app/zdslogic-ui-base/chat/ng-chat.component';

//import { ChatService } from 'app/zdslogic-ui-shell/common/core/services/chat.service';
//import { ChatHistory } from 'app/common/core/models/chat-history.model';
//import { ChatHistoryService } from 'app/zdslogic-ui-shell/common/core/services/chat-history.service';
import { ChatChannel } from 'app/zdslogic-ui-base/app/core/models/chat-channel.model';
import { ChatChannelDataSource } from 'app/zdslogic-ui-base/app/core/services/chat-channel.datasource';
import { ChatChannelService } from 'app/zdslogic-ui-base/app/core/services/chat-channel.service';
import { ChatMessage } from 'app/zdslogic-ui-base/app/core/models/chat-message.model';
import { ChatMessageService } from 'app/zdslogic-ui-base/app/core/services/chat-message.service';
//import { ComposeEMailComponent } from '../email-compose/compose-email.component';

import { AlertService } from 'app/zdslogic-ui-base/alert/alert.service';
import { AppMessage } from 'app/zdslogic-ui-base/core/models/appmessage.model';
import { AppService } from 'app/zdslogic-ui-base/core/services/app.service';
import { AuthenticationService } from 'app/zdslogic-ui-base//core/services/authentication.service';
import { ConfirmMessageDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/confirm-message-dialog/confirm-message-dialog.component';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { MessageService } from 'app/zdslogic-ui-base/core/services/message.service';
import { MessageDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/message-dialog/message-dialog.component';
import { PresenceService } from 'app/zdslogic-ui-base/core/services/presence.service';

import { SocketClientFourService } from 'app/zdslogic-ui-base/core/services/socket-client-four.service';
import { SocketClientSixService } from 'app/zdslogic-ui-base/core/services/socket-client-six.service';
//import { SocketClientSevenService } from 'app/zdslogic-ui-base/core/services/socket-client-seven.service';
//import { SocketClientNineService } from 'app/zdslogic-ui-base/core/services/socket-client-nine.service';

//import { UsersService } from 'shared';
import { ActiveFriendsService } from 'app/zdslogic-ui-shell/common/core/services/active-friends.service';

//import { OpenfireAdapter } from '../../../common/core/services/openfire-adapter';
//import { MyAdapter } from 'app/zdslogic-ui-shell/core/services/my-adapter';

import { ConnectionsSelectionDialogComponent } from '../../../../zdslogic-ui-plugins/contacts/connections/connections-selection-dialog/connections-selection-dialog.component';
import { ConnectionDeleteDialogComponent } from '../../../../zdslogic-ui-plugins/contacts/connections/connection-delete/connection-delete-dialog.component';
import { Contact } from '../../../../zdslogic-ui-plugins/contacts/core/interfaces/contact.model';
import { ContactsService } from '../../../../zdslogic-ui-plugins/contacts/core/services/contacts.service';
import { ContactDeleteDialogComponent } from '../../../../zdslogic-ui-plugins/contacts/contact-delete/contact-delete-dialog.component';

import { PresenceType } from 'app/zdslogic-ui-base/core/interfaces/presence-type';

import { ProfileEntity } from 'app/zdslogic-ui-base/core/models/profile-entity.model';
import { ProfileEntityService } from 'app/zdslogic-ui-base/core/services/profile-entity.service';

import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';

import { ActiveContactsService } from '../../../contacts/connections/core/services/active-contacts.service';
import { UserContact } from '../../../contacts/connections/core/interfaces/user-contact.model';
import { UserContactsDataSource } from '../../../contacts/connections/core/services/user-contacts.datasource';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { ErrorService } from 'app/zdslogic-ui-base/core/services/error.service';

import { environment } from '../../../../../environments/environment';
import { application } from '../../../../../../application';

@Component({
	selector: 'app-communicator-site-container',
	templateUrl: './communicator-site-container.component.html',
	styleUrls: ['./communicator-site-container.component.scss']
})
export class CommunicatorSiteContainerComponent implements OnInit, AfterViewInit {
	@Input()
	public contact: Contact;

	@Input()
	public userId: any;
	public contactId: number;

	@ViewChild('drawer') drawer: MatDrawer;
	drawerMode: 'over' | 'side' = 'side';
	drawerOpened: boolean = true;
	private _unsubscribeAll: Subject<any> = new Subject<any>();
	menuData: FuseNavigationItem[] = [];

	public currentUser: User = new User();
	public currentUserContact: UserContact;
	public currentContact: Contact;
	public currentProfile: ProfileEntity;
	public selectedChat: UserContact;

	isUser: boolean;
	presenceStatus: number;
	room: any;

	isUserLoggedIn: boolean = false;
	isUserAuthorized: boolean = false;
	isUserSubscribed: boolean = false;

	channels: ChatChannel[];
	connections: UserContact[];

	unreadCount: number = 0;
	private _overlayRef: OverlayRef;

	public clientId = 'newClient';
	public redirectUri = environment.redirectUri;

	result: boolean = false;

	chatChannelsDataSource: ChatChannelDataSource;
	public chatChannelsDisplayedColumns = ['imageURL', 'channelName', 'video', 'details', 'delete'];

	userContactsDataSource: UserContactsDataSource;
	public userContactsDisplayedColumns = ['imageURL', 'fullName', 'email', 'video', 'details'];

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	// @ViewChild('input', {static:false}) input: ElementRef;
	//@ViewChildren('chatWindow') chatWindows: QueryList<NgChatWindowComponent>;

	private deleteDialogConfig;
	private selectDialogConfig;
	private messageDialogConfig;

	public searchString: string = '';

	sortProperty = '';

	deleteContactDialogRef: MatDialogRef<ContactDeleteDialogComponent>;

	isDataReady = false;
	firstLoad = true;

	messages13: any;
	mysubid13 = 'my-subscription-id-013';

	messages91: any;
	mysubid91 = 'my-subscription-id-091';

	messages92: any;
	mysubid92 = 'my-subscription-id-092';

	private unsubscribeSubject: Subject<void> = new Subject<void>();

	chatChannel: ChatChannel;

	presenceTypes: PresenceType[] = [
		{ value: 0, viewValue: 'Online', statusColor: 'text-green-600 bg-green-100' },
		{ value: 1, viewValue: 'Offline', statusColor: 'text-gray-600 bg-gray-100' },
		{ value: 2, viewValue: 'Busy', statusColor: 'text-red-600 bg-red-100' },
		{ value: 3, viewValue: 'Away', statusColor: 'text-amber-600 bg-amber-100' },
		{ value: 4, viewValue: 'In a Meeting', statusColor: 'text-orange-600 bg-orange-100' }
	];

	constructor(
		private _activeContactsService: ActiveContactsService,
		private _activeFriendsService: ActiveFriendsService,
		private _angularLogService: AngularLogService,
		private _appService: AppService,
		private _authService: AuthenticationService,
		private _channelService: ChatChannelService,
		private _contactsService: ContactsService,
		private _dataSharingService: DataSharingService,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _messageService: MessageService,
		private _presenceService: PresenceService,
		private _profilesService: ProfileEntityService,
		private _router: Router,
		private _usersService: UsersService,
		private _wsDataServiceFour: SocketClientFourService,
		private _wsDataServiceSix: SocketClientSixService,

	) {

		this._dataSharingService.isUserLoggedIn.subscribe((value) => {
			this.isUserLoggedIn = value;
		});

		this._dataSharingService.isUserAuthorized.subscribe((value) => {
			this.isUserAuthorized = value;
		});

		this._dataSharingService.isUserSubscribed.subscribe((value) => {
			this.isUserSubscribed = value;
		});

		this.deleteDialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

		this.selectDialogConfig = {
			height: '800px',
			width: '800px',
			disableClose: true,
			data: {}
		};

		this.messageDialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {

		// get this User
		this.currentUser = this._usersService.getCurrentUser();
		this.userId = this.currentUser.id;

		// get this Contact
		this.contactId = this.currentUser.contactId;
		this.getContactDetails(this.contactId);

		// get this Profile
		this.getProfileDetails(this.contactId);

		// get Channels
		this.chatChannelsDataSource = new ChatChannelDataSource(this._channelService);
		this.chatChannelsDataSource.loadChatChannels('', '', 'asc', 0, 30);

		// get Connections
		this.userContactsDataSource = new UserContactsDataSource(this._contactsService);
		this.userContactsDataSource.loadUserContacts(this.userId, '', '', 'asc', 0, 30);

		this.firstLoad = false;

		this._fuseMediaWatcherService.onMediaChange$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(({ matchingAliases }) => {

				// Set the drawerMode and drawerOpened if the given breakpoint is active
				if (matchingAliases.includes('md')) {
					this.drawerMode = 'side';
					this.drawerOpened = true;
				}
				else {
					this.drawerMode = 'over';
					this.drawerOpened = false;
				}
			});
	}

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
		//		this.sortProperty = 'teamId';
		//		this.sort.direction = 'desc';
		this._wsDataServiceSix.connect().subscribe((result) => {

			this.messages91 = this._authService
				.onUpdate(this.mysubid91)
				.pipe(takeUntil(this.unsubscribeSubject))
				.subscribe((post) => {
					const isLoggedIn = this._appService.checkCredentials();
					if ((post.message === 'Session Expired')
						|| (post.message === 'Logged In')
						|| (post.message === 'Logged Out')
						|| (post.message === 'User Contacts Changed')) {
						if (isLoggedIn) {
							this.userId = this._usersService.getUserId();
							this.refresh();
						}
					}
				});
		});

		this._wsDataServiceFour.connect().subscribe((result) => {
			////console.log(result);

			this.messages13 = this._presenceService
				.onUpdate(this.mysubid13)
				.pipe(takeUntil(this._unsubscribeAll))
				.subscribe((post) => {
					if ((post.message === 'Session Expired')
						|| (post.message === 'Presence Changed')
						|| (post.message === 'Logged In')
						|| (post.message === 'Logged Out')) {
						if (this.firstLoad) {

							this.userId = this._usersService.getUserId();
							this.refresh(); this.firstLoad = false;

						} else {
							if (this._usersService.isUserAuthenticatedWithToken()) {

								this.userId = this._usersService.getUserId();
								this.refresh();
							}

						}
					}
				});
		});

		console.log('Communicator Site Container completed');

	}

	/*
		openComposeDialog(): void {
			// Open the dialog
			const dialogRef = this._matDialog.open(ComposeEMailComponent);

			dialogRef.afterClosed()
				.subscribe((result) => {
					console.log('Compose dialog was closed!');
				});
		}
	*/

	private getContactDetails(contactId: number): any {
		const id: number = contactId;
		const apiUrl = `contacts/${id}`;

		this._contactsService.getData(apiUrl)
			.subscribe((result) => {
				this.contact = result as Contact;
				this.currentContact = this.contact;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private getProfileDetails(contactId: number): any {
		const username = this.currentUser?.userName;

		if (username !== undefined) {

			const id: string = username;
			const apiUrl = `profile/${id}`;

			this._profilesService.getData(apiUrl)
				.subscribe((result) => {
					this.currentProfile = result as ProfileEntity;
					//this.isUser = (this.currentUser.userName === this.profileEntity.userName);

				},
					(error) => {
						this._errorHandlerService.handleError(error);
					});
		}
	};

	public selectChat(source: string, item: any): void {

		if (source === 'contact') {

			// Set currentChannel data into observable
			const channel = new ChatChannel();
			channel.channelType = '0';
			channel.contactId = item.id;

			this._dataSharingService.currentChannel.next(channel);

			const contactId: number = item.id;
			const url = `/messaging/${contactId}/chat`;

			//this.redirectToMessages(id);
			this.reloadComponent(false, url);

		}

		if (source === 'channel') {

			// Set currentChannel data into observable
			this.chatChannel = item;
			this.chatChannel.channelType = '1';
			this._dataSharingService.currentChannel.next(this.chatChannel);

			const contactId: number = item.contactId;
			const url = `/messaging/${contactId}/chat`;
			//this._router.navigate([url], { relativeTo: this._route });
			//this._router.navigate(['messages'], { relativeTo: this._route });
			//this._router.navigate([url]);
			this.reloadComponent(false, url);

		}

		if (source === 'connection') {

			// Set currentChannel data into observable
			const channel = new ChatChannel();
			channel.channelType = '2';
			channel.contactId = item.contactId;

			this._dataSharingService.currentChannel.next(channel);

			const contactId: number = item.contactId;
			const url = `/messaging/${contactId}/chat`;

			//this._router.navigate([url], { relativeTo: this._route });
			//this._router.navigate(['messages'], { relativeTo: this._route });
			//this._router.navigate([url]);
			this.reloadComponent(false, url);

		}
	}

	public refresh(): void {

		if (this._usersService.isUserAuthenticatedWithToken()) {
			// get this User
			this.currentUser = this._usersService.getCurrentUser();
			this.userId = this.currentUser.id;

			// get this Contact
			this.contactId = this.currentUser.contactId;
			this.getContactDetails(this.contactId);

			// get this Profile
			this.getProfileDetails(this.contactId);

			// get Channels
			this.chatChannelsDataSource.loadChatChannels('', '', 'asc', 0, 30);

			// get Connections
			this.userContactsDataSource.loadUserContacts(this.userId, '', '', 'asc', 0, 30);

			this.firstLoad = false;
		}

	}

	public redirectToAdd(): any {
		const id: number = this.userId;
		this.selectDialogConfig.data = {
			userId: id
		};
		const dialogRef = this._dialog.open(ConnectionsSelectionDialogComponent, this.selectDialogConfig)
			.afterClosed().subscribe((result) => {
				this.userContactsDataSource.loadUserContacts(this.userId, '', '', 'asc', 0, 30);
			});
	}

	public redirectToProfile(element: any): any {
		let id = 0;
		if (element.contactId) {
			id = element.contactId;
		} else {
			id = element.id;
		}

		const apiUrl = `contacts/${id}`;

		this._contactsService.getData(apiUrl)
			.subscribe((result) => {
				this.currentContact = result as Contact;

				const userName = this.currentContact.userName;
				const apiUrl = `profile/${userName}`;

				this._profilesService.getData(apiUrl)
					.subscribe((result) => {
						this.currentProfile = result as ProfileEntity;
						const url = '/profiles/' + this.currentProfile.userName;
						this._router.navigate([url]);
					},
						(error) => {
							this._errorHandlerService.handleError(error);
						});
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	public redirectToDetails(element: any): any {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/details/${element.contactId}`;
		} else {
			url = `/contacts/contact/details/${element.id}`;
		}
		this._router.navigate([url]);
	}

	public redirectToEMail(element: any): any {
		let url = '';
		if (element.contactId) {
			url = `/messaging/${element.contactId}/email`;
		} else {
			url = `/messaging/${element.id}/email`;
		}
		this._router.navigate([url]);
	};

	public redirectToMessages(element: any): any {
		let url = '';
		if (element.contactId) {
			url = `/messaging/${element.contactId}/chat`;
		} else {
			url = `/messaging//${element.id}/chat`;
		}
		this._router.navigate([url]);
	};

	public redirectToUpdate(element: any): any {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/update/${element.contactId}`;
		} else {
			url = `/contacts/contact/update/${element.id}`;
		}
		this._router.navigate([url]);
	}

	public redirectToVideo(element: any): any {

		this.presenceStatus = element.presenceStatus;
		if (this.presenceStatus === 4) {
			this.messageDialogConfig.data = { 'errorMessage': 'Join the Meeting' };

			const dialogRef = this._dialog.open(ConfirmMessageDialogComponent, this.messageDialogConfig);

			dialogRef.afterClosed().subscribe((dialogResult) => {
				this.result = dialogResult;
				if (this.result === true) {
					const url = '';
					if (element.contactId) {
						//url = `video-jitsi/video-jitsi-start`;
						//this._router.navigate([url]);

						this.room = element.currentRoom;
						//this.room = this.currentUser.userName;
						const locationUrl = `/collaboration/collaboration-video-enter/video/${this.room}`;
						//var locationUrl = `/video-jitsi/video-jitsi-enter`;

						window.location.href = locationUrl;

					}
				}

			});


		} else
			if (this.presenceStatus !== 0) {
				this.messageDialogConfig.data = { 'errorMessage': 'Contact is not Online' };
				this._dialog.open(MessageDialogComponent, this.messageDialogConfig);
			}

		if (this.presenceStatus === 0) {

			const url = '';
			if (element.contactId) {
				//url = `video-jitsi/video-jitsi-start`;

				this.currentUser = this._usersService.getCurrentUser();
				this.room = this.currentUser.userName;

				//send invite
				const model = new AppMessage();
				model.message = element.contactId.toString();
				model.data = this.room;
				model.flag = true;
				this._messageService.send(model);

				//this._router.navigate([url]);
				const locationUrl = `/collaboration/collaboration-video-enter/video/${this.room}`;
				//var locationUrl = `/video-jitsi/video-jitsi-enter`;

				window.location.href = locationUrl;

			}

		}

	}

	reloadComponent(self: boolean, urlToNavigateTo?: string): any {
		//skipLocationChange:true means dont update the url to / when navigating
		console.log('Current route I am on:', this._router.url);
		const url = self ? this._router.url : urlToNavigateTo;
		this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
			this._router.navigate([`/${url}`]).then(() => {
				console.log(`After navigation I am on:${this._router.url}`);
			});
		});
	}

	reloadPage(): void {
		window.location.reload();
	}

	getStatusClass(status: number): string {
		const statusClass = this.presenceTypes.map(presenceType => presenceType.value === status ? presenceType.statusColor : '');
		return statusClass.join(' ');
	}

	getStatusName(status: number): string {
		const statusClass = this.presenceTypes.map(presenceType => presenceType.value === status ? presenceType.viewValue : '');
		return statusClass.join(' ');
	}

	public onCancel(): void {

		//const locationUrl = '/contacts/list';
		///contacts/details/${this.contact.contactId'
		//this._location.go(locationUrl);

		//this._location.back();
		//this._router.navigateByUrl(locationUrl);
	};

	openLink(url: string): void {
		window.open(url, '_blank');
	}

}
/*
//@UntilDestroy()
@Component({
  selector: 'app-communicator-site-container',
  templateUrl: './communicator-site-container.component.html',
  styleUrls: ['./communicator-site-container.component.scss']
})
export class CommunicatorSiteContainerComponent implements OnInit, AfterViewInit {
	//	@ViewChild('popupChat') chat: PopupComponent;
	@Input()
	public contact: Contact;

	@Input()
	public userId: any;
	public contactId: number;

	@ViewChild('drawer') drawer: MatDrawer;
	drawerMode: 'over' | 'side' = 'side';
	drawerOpened: boolean = true;
	private _unsubscribeAll: Subject<any> = new Subject<any>();
	menuData: FuseNavigationItem[] = [];

	currentUser: User = new User();
	currentUserContact: UserContact;
	currentContact: Contact;
	currentProfile: ProfileEntity;
	selectedChat: UserContact;

	isUser: boolean;
	presenceStatus: number;
	room: any;

	isUserLoggedIn: boolean = false;
	isUserAuthorized: boolean = false;
	isUserSubscribed: boolean = false;

	channels: ChatChannel[];
	connections: UserContact[];

	unreadCount: number = 0;
	private _overlayRef: OverlayRef;

	public clientId = 'newClient';
	public redirectUri = environment.redirectUri;

	result: boolean = false;

	chatChannelsDataSource: ChatChannelDataSource;
	public chatChannelsDisplayedColumns = ['imageURL', 'channelName', 'video', 'details', 'delete'];

	userContactsDataSource: UserContactsDataSource;
	public userContactsDisplayedColumns = ['imageURL', 'fullName', 'video', 'details'];

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	// @ViewChild('input', {static:false}) input: ElementRef;

	//@ViewChildren('chatWindow') chatWindows: QueryList<NgChatWindowComponent>;

	private deleteDialogConfig;
	private selectDialogConfig;
	private messageDialogConfig;

	public searchString: string = '';

	sortProperty = '';

	deleteContactDialogRef: MatDialogRef<ContactDeleteDialogComponent>;

	isDataReady = false;
	firstLoad = true;

	messages13: any;
	mysubid13 = 'my-subscription-id-013';

	messages91: any;
	mysubid91 = 'my-subscription-id-091';

	messages92: any;
	mysubid92 = 'my-subscription-id-092';

	private unsubscribeSubject: Subject<void> = new Subject<void>();

	chatChannel: ChatChannel;

	presenceTypes: PresenceType[] = [
		{ value: 0, viewValue: 'Online', statusColor: 'text-green-600 bg-green-100' },
		{ value: 1, viewValue: 'Offline', statusColor: 'text-gray-600 bg-gray-100' },
		{ value: 2, viewValue: 'Busy', statusColor: 'text-red-600 bg-red-100' },
		{ value: 3, viewValue: 'Away', statusColor: 'text-amber-600 bg-amber-100' },
		{ value: 4, viewValue: 'In a Meeting', statusColor: 'text-orange-600 bg-orange-100' }
	];

	constructor(
		private _angularLogService: AngularLogService,
		private _activeContactsService: ActiveContactsService,
		private _activeFriendsService: ActiveFriendsService,
		private _activeRoute: ActivatedRoute,
		private _alertService: AlertService,
		private _appService: AppService,
		private _channelService: ChatChannelService,
		private _chatMessageService: ChatMessageService,
		//		private _chatHistoryService: ChatHistoryService,
		private _contactsService: ContactsService,
		private _dataSharingService: DataSharingService,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _http: HttpClient,
		private _location: Location,
		private _matDialog: MatDialog,
		private _messageService: MessageService,
		private _observer: BreakpointObserver,
		private _presenceService: PresenceService,
		private _profilesService: ProfileEntityService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _usersService: UsersService,
		private _wsDataService: SocketClientFourService,
		private _wsDataServiceSix: SocketClientSixService,
		private _wsDataServiceSeven: SocketClientSevenService,
		private _wsDataServiceNine: SocketClientNineService,

		private _changeDetectorRefs: ChangeDetectorRef
	) {

		this._dataSharingService.isUserLoggedIn.subscribe((value) => {
			this.isUserLoggedIn = value;
		});

		this._dataSharingService.isUserAuthorized.subscribe((value) => {
			this.isUserAuthorized = value;
		});

		this._dataSharingService.isUserSubscribed.subscribe((value) => {
			this.isUserSubscribed = value;
		});

		this._wsDataServiceSix.connect().subscribe((result) => {
			////console.log(result);

			this.messages91 = this._activeFriendsService
				.onUpdate(this.mysubid91)
				.pipe(takeUntil(this.unsubscribeSubject))
				.subscribe((post) => {
					const isLoggedIn = this._appService.checkCredentials();
					if ((post.message === 'Session Expired')
						|| (post.message === 'Logged In')
						|| (post.message === 'Logged Out')
						|| (post.message === 'User Contacts Changed')) {
						if (isLoggedIn) {
							this.userId = this._usersService.getUserId();
							this.refresh();
						}
					}
				});
		});

		this.deleteDialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

		this.selectDialogConfig = {
			height: '800px',
			width: '800px',
			disableClose: true,
			data: {}
		};

		this.messageDialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	}

	ngOnInit(): void {

		// get this User
		this.currentUser = this._usersService.getCurrentUser();
		this.userId = this.currentUser.id;

		// get this Contact
		this.contactId = this.currentUser.contactId;
		this.getContactDetails(this.contactId);
		this.getProfileDetails(this.contactId);

		// get Channels
		this.chatChannelsDataSource = new ChatChannelDataSource(this._channelService);
		this.chatChannelsDataSource.loadChatChannels('', '', 'asc', 0, 30);

		// get Connections
		this.userContactsDataSource = new UserContactsDataSource(this._contactsService);
		this.userContactsDataSource.loadUserContacts(this.userId, '', '', 'asc', 0, 30);

		this.firstLoad = false;

		this._fuseMediaWatcherService.onMediaChange$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(({ matchingAliases }) => {

				// Set the drawerMode and drawerOpened if the given breakpoint is active
				if (matchingAliases.includes('md')) {
					this.drawerMode = 'side';
					this.drawerOpened = true;
				}
				else {
					this.drawerMode = 'over';
					this.drawerOpened = false;
				}
			});
	}

	ngAfterViewInit(): void {
		console.log('Communicator Site Containercompleted');
	}


		openComposeDialog(): void
		{
				// Open the dialog
				const dialogRef = this._matDialog.open(ComposeEMailComponent);

				dialogRef.afterClosed()
									.subscribe((result) => {
											console.log('Compose dialog was closed!');
									});
		}




	private getContactDetails(contactId: number): any {
		//const id: string = this._activeRoute.snapshot.params['id'];
		const id: number = contactId;
		const apiUrl = `contacts/${id}`;

		this._contactsService.getData(apiUrl)
			.subscribe((result) => {
				this.contact = result as Contact;
				this.currentContact = this.contact;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private getProfileDetails(contactId: number): any {

		const username = this.currentUser?.userName;

		if (username !== undefined) {

			const id: string = username;
			const apiUrl = `profile/${id}`;

			this._profilesService.getData(apiUrl)
				.subscribe((result) => {
					this.currentProfile = result as ProfileEntity;
					//this.isUser = (this.currentUser.userName === this.profileEntity.userName);

				},
					(error) => {
						this._errorHandlerService.handleError(error);
					});
		}
	};

	public selectChat(source: string, item: any): void {

		if (source === 'contact') {

			// Set currentChannel data into observable
			const channel = new ChatChannel();
			channel.channelType = '0';
			channel.contactId = item.id;

			//this.chatChannel = item;
			this._dataSharingService.currentChannel.next(channel);

			const contactId: number = item.id;

			console.log(this._router.url);

			const url = `/messaging/${contactId}`;
			//this._router.navigate([url]);
			//this.reloadComponent(false, url);

			//this.redirectToMessages(id);
			this.reloadComponent(false, url);
		}

		if (source === 'channel') {

			// Set currentChannel data into observable
			this.chatChannel = item;
			this.chatChannel.channelType = '1';
			this._dataSharingService.currentChannel.next(this.chatChannel);

			const contactId: number = item.contactId;

			const url = `/messaging/${contactId}`;
			//			const url = '/contacts/contact/create';

			console.log(this._router.url);
			//this._router.navigate([url], { relativeTo: this._route });

			//this._router.navigate(['messages'], { relativeTo: this._route });
			//this._router.navigate([url]);
			this.reloadComponent(false, url);

		}

		if (source === 'connection') {

			// Set currentChannel data into observable
			const channel = new ChatChannel();
			channel.channelType = '2';
			channel.contactId = item.contactId;

			this._dataSharingService.currentChannel.next(channel);

			const contactId: number = item.contactId;

			const url = `/messaging/${contactId}`;

			console.log(this._router.url);
			//this._router.navigate([url], { relativeTo: this._route });
			//this._router.navigate(['messages'], { relativeTo: this._route });
			//this._router.navigate([url]);
			this.reloadComponent(false, url);

		}
	}

	public refresh(): void {

		if (this._usersService.isUserAuthenticatedWithToken()) {
			this.userId = this._usersService.getUserId();

			this.chatChannelsDataSource.loadChatChannels('', '', 'asc', 0, 30);
			this.userContactsDataSource.loadUserContacts(this.userId, '', '', 'asc', 0, 30);

			this.firstLoad = false;
		}

	}

	public redirectToAdd(): any {
		const id: number = this.userId;
		this.selectDialogConfig.data = {
			userId: id
		};
		const dialogRef = this._dialog.open(ConnectionsSelectionDialogComponent, this.selectDialogConfig)
			.afterClosed().subscribe((result) => {
				this.userContactsDataSource.loadUserContacts(this.userId, '', '', 'asc', 0, 30);
			});
	}

	public redirectToProfile(element: any): any {
		let id = 0;
		if (element.contactId) {
			id = element.contactId;
		} else {
			id = element.id;
		}

		const apiUrl = `contacts/${id}`;

		this._contactsService.getData(apiUrl)
			.subscribe((result) => {
				this.currentContact = result as Contact;
				//const lowercaseFirstName = this.currentContact.firstName.toLowerCase();
				//const lowercaseLastName = this.currentContact.lastName.toLowerCase();
				//const userName = lowercaseFirstName + '.' + lowercaseLastName;
				const userName = this.currentContact.userName;
				const apiUrl = `profile/${userName}`;

				this._profilesService.getData(apiUrl)
					.subscribe((result) => {
						this.currentProfile = result as ProfileEntity;
						const url = '/profiles/' + this.currentProfile.userName;
						this._router.navigate([url]);
					},
						(error) => {
							this._errorHandlerService.handleError(error);
						});
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	public redirectToDetails(element: any): any {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/details/${element.contactId}`;
		} else {
			url = `/contacts/contact/details/${element.id}`;
		}
		this._router.navigate([url]);
	}

	public redirectToMessages(id: string): any {
		const url = `messaging/messages/${id}`;
		this._router.navigate([url]);
	};

	public redirectToUpdate(element: any): any {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/update/${element.contactId}`;
		} else {
			url = `/contacts/contact/update/${element.id}`;
		}
		this._router.navigate([url]);
	}

	public redirectToVideo(element: any): any {

		this.presenceStatus = element.presenceStatus;
		if (this.presenceStatus === 4) {
			this.messageDialogConfig.data = { 'errorMessage': 'Join the Meeting' };

			const dialogRef = this._dialog.open(ConfirmMessageDialogComponent, this.messageDialogConfig);

			dialogRef.afterClosed().subscribe((dialogResult) => {
				this.result = dialogResult;
				if (this.result === true) {
					const url = '';
					if (element.contactId) {
						//url = `video-jitsi/video-jitsi-start`;
						//this._router.navigate([url]);

						this.room = element.currentRoom;
						//this.room = this.currentUser.userName;
						const locationUrl = `/collaboration/collaboration-video-enter/video/${this.room}`;
						//var locationUrl = `/video-jitsi/video-jitsi-enter`;

						window.location.href = locationUrl;

					}
				}

			});


		} else
			if (this.presenceStatus !== 0) {
				this.messageDialogConfig.data = { 'errorMessage': 'Contact is not Online' };
				this._dialog.open(MessageDialogComponent, this.messageDialogConfig);
			}

		if (this.presenceStatus === 0) {

			const url = '';
			if (element.contactId) {
				//url = `video-jitsi/video-jitsi-start`;

				this.currentUser = this._usersService.getCurrentUser();
				this.room = this.currentUser.userName;

				//send invite
				const model = new AppMessage();
				model.message = element.contactId.toString();
				model.data = this.room;
				model.flag = true;
				this._messageService.send(model);

				//this._router.navigate([url]);
				const locationUrl = `/collaboration/collaboration-video-enter/video/${this.room}`;
				//var locationUrl = `/video-jitsi/video-jitsi-enter`;

				window.location.href = locationUrl;

			}

		}

	}

	reloadComponent(self: boolean, urlToNavigateTo?: string): any {
		//skipLocationChange:true means dont update the url to / when navigating
		console.log('Current route I am on:', this._router.url);
		const url = self ? this._router.url : urlToNavigateTo;
		this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
			this._router.navigate([`/${url}`]).then(() => {
				console.log(`After navigation I am on:${this._router.url}`);
			});
		});
	}

	reloadPage(): void {
		window.location.reload();
	}

	getStatusClass(status: number): string {
		const statusClass = this.presenceTypes.map(presenceType => presenceType.value === status ? presenceType.statusColor : '');
		return statusClass.join(' ');
	}

	getStatusName(status: number): string {
		const statusClass = this.presenceTypes.map(presenceType => presenceType.value === status ? presenceType.viewValue : '');
		return statusClass.join(' ');
	}

	public onCancel(): void {

		//const locationUrl = '/contacts/list';
		///contacts/details/${this.contact.contactId'
		//this._location.go(locationUrl);

		//this._location.back();
		//this._router.navigateByUrl(locationUrl);
	};

	openLink(url: string): void {
		window.open(url, '_blank');
	}


}
*/

