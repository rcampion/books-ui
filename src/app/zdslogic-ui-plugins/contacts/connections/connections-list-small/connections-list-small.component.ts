import { Component, Inject, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap, takeUntil } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';
import { fromEvent } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { UserContact } from '../core/interfaces/user-contact.model';
import { UserContactsDataSource } from '../core/services/user-contacts.datasource';
import { ContactsService } from '../../core/services/contacts.service';
import { ConnectionsSelectionDialogComponent } from '../../connections/connections-selection-dialog/connections-selection-dialog.component';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { ConnectionDeleteDialogComponent } from '../connection-delete/connection-delete-dialog.component';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { AppService } from 'app/zdslogic-ui-base/core/services/app.service';
import { SocketClientFourService } from '../core/services/socket-client-four.service';
import { ActiveContactsService } from '../core/services/active-contacts.service';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { MessageService } from 'app/zdslogic-ui-base/core/services/message.service';
import { MessageDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/message-dialog/message-dialog.component';
import { ConfirmMessageDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/confirm-message-dialog/confirm-message-dialog.component';
import { AppMessage } from 'app/zdslogic-ui-base/core/models/appmessage.model';

import { environment } from '../../../../../environments/environment';

@Component({
	selector: 'app-connections-list-small',
	templateUrl: './connections-list-small.component.html',
	styleUrls: ['./connections-list-small.component.scss']
})
export class ConnectionsListSmallComponent implements OnInit, AfterViewInit {

	public clientId = 'newClient';
	public redirectUri = environment.redirectUri;

	result: boolean = false;

	//public displayedColumns = ['presenceImageUrl', 'imageURL', 'firstName', 'lastName', 'video', 'details', 'delete'];
	public displayedColumns = ['presenceImageUrl', 'imageURL', 'fullName', 'video', 'details', 'delete'];

	dataSource: UserContactsDataSource;

	room: any;
	currentUser: User = new User();
	presenceStatus: number;

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	// @ViewChild('input', { static: false }) input: ElementRef;

	userId: number;

	currentUserContact: UserContact;

	private deleteDialogConfig;
	private selectDialogConfig;
	private messageDialogConfig;

	public searchString: string = '';

	sortProperty = '';

	deleteContactDialogRef: MatDialogRef<ConnectionDeleteDialogComponent>;
	messageDialogRef: MatDialogRef<MessageDialogComponent>;

	isUserLoggedIn = false;
	isDataReady = false;
	firstLoad = true;

	messages13: any;
	mysubid13 = 'my-subscription-id-013';
	private unsubscribeSubject: Subject<void> = new Subject<void>();

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _usersService: UsersService,
		private _appService: AppService,
		private _messageService: MessageService,
		private _repository: ContactsService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _dialog: MatDialog,
		private _dataSharingService: DataSharingService,
		private _wsDataService: SocketClientFourService,
		private _activeContactsService: ActiveContactsService) {

	}

	ngOnInit(): void {
		this.dataSource = new UserContactsDataSource(this._repository);

		this._dataSharingService.isUserLoggedIn.subscribe((value) => {
			this.isUserLoggedIn = value;
		});

		let isLoggedIn = this._appService.checkCredentials();

			this._dataSharingService.isActiveContactsReady.subscribe((value) => {
				this.isDataReady = value;
				isLoggedIn = this._appService.checkCredentials();
				if (this.isDataReady && isLoggedIn ) {
					this.userId = this._usersService.getUserId();
					this.dataSource.loadUserContacts(this.userId, '', '', 'asc', 0, 6);
					this.firstLoad = false;
				}
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

	ngAfterViewInit(): void {

		this.sortProperty = 'userId';
		this.sort.direction = 'desc';

		this._wsDataService.connect().subscribe((result) => {
			////console.log(result);

			this.messages13 = this._activeContactsService
				.onUpdate(this.mysubid13)
				.pipe(takeUntil(this.unsubscribeSubject))
				.subscribe((post) => {
					//const isLoggedIn = this.isUserLoggedIn;
					const isLoggedIn = this._appService.checkCredentials();
					if ((post.message === 'Session Expired')
						|| (post.message === 'Presence Changed')
						|| (post.message === 'Logged In')
						|| (post.message === 'Logged Out')) {
						if (isLoggedIn && this.firstLoad) {

							//this.currentUser = this._usersService.getCurrentUser();
							//this.userId = parseInt(this.currentUser.id);
							this.userId = this._usersService.getUserId();
							this.dataSource.loadUserContacts(this.userId, '', '', 'asc', 0, 6);
							this.firstLoad = false;

						} else if (this._appService.checkCredentials()) {

							// = this._usersService.getCurrentUser();
							//this.userId = parseInt(this.currentUser.id);
							this.userId = this._usersService.getUserId();
							this.dataSource.refresh(this.userId);

						}
					}
				});
		});

		this.sort.sortChange.subscribe((event) => {
			this.paginator.pageIndex = 0;
			this.sortProperty = event.active;
		});

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadContactsPage())
			)
			.subscribe(

				(data) => {
					//console.log(data);
				}

			);

	}

	searchValueChanged(): void{

		this.paginator.pageIndex = 0;

		this.loadContactsPage();

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.loadContactsPage();

	}

	public delete = (element: UserContact): void => {

		if (element.contactId) {
			let id = element.id;
			const apiUrl = `user/contacts/${id}`;
			this._repository.delete(apiUrl)
				.subscribe((result) => {
					id = result as number;
					this.loadContactsPage();
				},
					(error) => {
						this._errorHandlerService.handleError(error);
					});
		} else {
			const id = element.id;
			this.deleteDialogConfig.data = {
				id: id
			};
			const dialogRef = this._dialog.open(ConnectionDeleteDialogComponent, this.deleteDialogConfig)
				.afterClosed().subscribe((result) => {
					this.loadContactsPage();
				});
		}
	};

	public redirectToAdd = (): void => {
		const id: number = this.userId;
		this.selectDialogConfig.data = {
			userId: id
		};
		const dialogRef = this._dialog.open(ConnectionsSelectionDialogComponent, this.selectDialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadContactsPage();
			});
	};

	public redirectToDetails = (element: UserContact): void => {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/details/${element.contactId}`;
		} else {
			url = `/contacts/contact/details/${element.id}`;
		}
		this._router.navigate([url]);
	};

	public redirectToUpdate = (element: UserContact): void => {
		let url = '';
		if (element.contactId) {
			url = `/contacts/update/${element.contactId}`;
		} else {
			url = `/contacts/update/${element.id}`;
		}
		this._router.navigate([url]);
	};

	public redirectToVideo = (element: UserContact): void => {

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

	};

	public doFilter = (value: string): void => {
		//        this.dataSource.filter = value.trim().toLocaleLowerCase();
	};

	public loadContactsPage(): void {
		//this.input.nativeElement.value,

		this.dataSource.loadUserContacts(
			this.userId,
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}

	public loginSSO(): void {
		this._usersService.purgeZdsAuth();
		window.location.href = environment.ssoUrl + '/realms/zdslogic/protocol/openid-connect/auth?response_type=code&client_id=' +
			this.clientId + '&redirect_uri=' + this.redirectUri + '/contact';
	}

	public redirectToRegister = (): void => {
		const url = '/register';
		this._router.navigate([url]);
	};
}
