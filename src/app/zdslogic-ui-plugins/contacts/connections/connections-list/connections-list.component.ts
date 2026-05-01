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

import { ActiveContactsService } from '../core/services/active-contacts.service';
import { AppMessage } from 'app/zdslogic-ui-base/core/models/appmessage.model';
import { AppService } from 'app/zdslogic-ui-base/core/services/app.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { ConnectionsSelectionDialogComponent } from '../../connections/connections-selection-dialog/connections-selection-dialog.component';
import { ConnectionDeleteDialogComponent } from '../connection-delete/connection-delete-dialog.component';
import { Contact } from '../../core/interfaces/contact.model';
import { ContactDeleteDialogComponent } from '../../contact-delete/contact-delete-dialog.component';
import { ContactsService } from '../../core/services/contacts.service';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { SocketClientFourService } from '../core/services/socket-client-four.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { MessageService } from 'app/zdslogic-ui-base/core/services/message.service';
import { ConfirmMessageDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/confirm-message-dialog/confirm-message-dialog.component';
import { MessageDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/message-dialog/message-dialog.component';
import { ProfileEntityService } from 'app/zdslogic-ui-base/core/services/profile-entity.service';
import { ProfileEntity } from 'app/zdslogic-ui-base/core/models/profile-entity.model';
import { UserContact } from '../core/interfaces/user-contact.model';
import { UserContactsDataSource } from '../core/services/user-contacts.datasource';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';

import { environment } from '../../../../../environments/environment';

@Component({
	selector: 'app-connections-list',
	templateUrl: './connections-list.component.html',
	styleUrls: ['./connections-list.component.scss']
})
export class ConnectionsListComponent implements OnInit, AfterViewInit {

	public clientId = 'newClient';
	public redirectUri = environment.redirectUri;

	result: boolean = false;

	userId: number;

	room: any;
	currentUser: User = new User();
	presenceStatus: number;

	public displayedColumns = ['imageURL', 'fullName', 'company', 'title', 'video', 'profile', 'details', 'update', 'delete'];

	//public displayedColumns = ['firstName', 'lastName', 'fullName', 'company', 'title', 'details', 'update', 'delete'];

	dataSource: UserContactsDataSource;

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	// @ViewChild('input', {static:false}) input: ElementRef;

	currentUserContact: UserContact;
	currentContact: Contact;

	isUser: boolean;
	currentProfile: ProfileEntity;

	private deleteDialogConfig;
	private selectDialogConfig;
	private messageDialogConfig;

	public searchString: string = '';

	sortProperty = '';

	deleteContactDialogRef: MatDialogRef<ContactDeleteDialogComponent>;

	isUserLoggedIn = false;
	isDataReady = false;
	firstLoad = true;

	messages13: any;
	mysubid13 = 'my-subscription-id-013';
	private unsubscribeSubject: Subject<void> = new Subject<void>();

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _activeContactsService: ActiveContactsService,
		private _activeRoute: ActivatedRoute,
		private _appService: AppService,
		private _contactsService: ContactsService,
		private _dataSharingService: DataSharingService,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService,
		private _messageService: MessageService,
		private _profileEntityService: ProfileEntityService,
		private _router: Router,
		private _changeDetectorRefs: ChangeDetectorRef,
		private _usersService: UsersService,
		private _wsDataService: SocketClientFourService,

	) {
	}

	ngOnInit(): void {

		this.dataSource = new UserContactsDataSource(this._contactsService);

		this._dataSharingService.isUserLoggedIn.subscribe((value) => {
			this.isUserLoggedIn = value;
		});

		let isLoggedIn = this._appService.checkCredentials();


		this._dataSharingService.isActiveContactsReady.subscribe((value) => {
			this.isDataReady = value;
			isLoggedIn = this._appService.checkCredentials();
			if (this.isDataReady && isLoggedIn) {
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

	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.loadContactsPage();

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.loadContactsPage();

	}

	public delete(element: UserContact): void {

		if (element.contactId) {
			let id = element.id;
			const apiUrl = `user/contacts/${id}`;
			this._contactsService.delete(apiUrl)
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
			const dialogRef = this._dialog.open(ContactDeleteDialogComponent, this.deleteDialogConfig)
				.afterClosed().subscribe((result) => {
					this.loadContactsPage();
				});
		}
	}

	public redirectToAdd(): void {
		const id: number = this.userId;
		this.selectDialogConfig.data = {
			userId: id
		};
		const dialogRef = this._dialog.open(ConnectionsSelectionDialogComponent, this.selectDialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadContactsPage();
			});
	}

	public redirectToProfile(id: string): any {

		const apiUrl = `contacts/${id}`;

		this._contactsService.getData(apiUrl)
			.subscribe((result) => {
				this.currentContact = result as Contact;
				const userName = this.currentContact.userName;
				const apiUrl = `profile/${userName}`;

				this._profileEntityService.getData(apiUrl)
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

	public redirectToDetails(element: UserContact): void {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/details/${element.contactId}`;
		} else {
			url = `/contacts/contact/details/${element.id}`;
		}
		this._router.navigate([url]);
	}

	public redirectToUpdate(element: UserContact): void {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/update/${element.contactId}`;
		} else {
			url = `/contacts/contact/update/${element.id}`;
		}
		this._router.navigate([url]);
	}

	public redirectToVideo(element: UserContact): void {

		this.presenceStatus = element.presenceStatus;
		if (this.presenceStatus === 4) {
			this.messageDialogConfig.data = { 'errorMessage': 'Join the Meeting' };

			const dialogRef = this._dialog.open(ConfirmMessageDialogComponent, this.messageDialogConfig);

			dialogRef.afterClosed().subscribe((dialogResult) => {
				this.result = dialogResult;
				if (this.result === true) {

					if (element.contactId) {
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

	public doFilter(value: string): void {
		//        this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	loadContactsPage(): any {
		// this.input.nativeElement.value,
		this.dataSource.loadUserContacts(
			this.userId,
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}
}
