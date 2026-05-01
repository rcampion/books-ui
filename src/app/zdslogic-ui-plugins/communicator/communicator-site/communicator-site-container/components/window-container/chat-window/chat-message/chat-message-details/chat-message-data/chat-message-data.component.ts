import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { MatButton } from '@angular/material/button';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';

import { AppMessage } from 'app/zdslogic-ui-base/core/models/appmessage.model';
import { ConfirmMessageDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/confirm-message-dialog/confirm-message-dialog.component';
import { ConnectionsSelectionDialogComponent } from '../../../../../../../../../../zdslogic-ui-plugins/contacts/connections/connections-selection-dialog/connections-selection-dialog.component';
import { MessageDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/message-dialog/message-dialog.component';

import { ChatMessageService } from 'app/zdslogic-ui-base/app/core/services/chat-message.service';
import { ChatMessage } from 'app/zdslogic-ui-base/app/core/models/chat-message.model';
import { Contact } from '../../../../../../../../../../zdslogic-ui-plugins/contacts/core/interfaces/contact.model';
import { ContactsService } from '../../../../../../../../../../zdslogic-ui-plugins/contacts/core/services/contacts.service';
import { PresenceService } from 'app/zdslogic-ui-base/core/services/presence.service';
import { PresenceType } from 'app/zdslogic-ui-base/core/interfaces/presence-type';

import { ProfileEntity } from 'app/zdslogic-ui-base/core/models/profile-entity.model';
import { ProfileEntityService } from 'app/zdslogic-ui-base/core/services/profile-entity.service';

import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { UserContact } from '../../../../../../../../../../zdslogic-ui-plugins/contacts/connections/core/interfaces/user-contact.model';
import { UserContactsDataSource } from '../../../../../../../../../../zdslogic-ui-plugins/contacts/connections/core/services/user-contacts.datasource';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { MessageService } from 'app/zdslogic-ui-base/core/services/message.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

@Component({
	selector: 'app-chat-message-data',
	templateUrl: './chat-message-data.component.html',
	styleUrls: ['./chat-message-data.component.scss']
})
export class ChatMessageDataComponent implements OnInit {

	@Input()
	public contact: Contact;
	@Input()
	public chatMessage: ChatMessage;
	//public selectOptions = [{ name: 'Show', value: 'show' }, { name: `Don't Show`, value: '' }];
	@Output() selectEmitt = new EventEmitter();

	public userId: any;
	public contactId: number;
	currentUser: User = new User();
	currentUserContact: UserContact;
	currentContact: Contact;
	currentProfile: ProfileEntity;
	selectedChat: UserContact;

	isUser: boolean;
	presenceStatus: number;
	room: any;

	private deleteDialogConfig;
	private selectDialogConfig;
	private messageDialogConfig;

	result: boolean = false;

	presenceTypes: PresenceType[] = [
		{ value: 0, viewValue: 'Online', statusColor: 'text-green-600 bg-green-100' },
		{ value: 1, viewValue: 'Offline', statusColor: 'text-gray-600 bg-gray-100' },
		{ value: 2, viewValue: 'Busy', statusColor: 'text-red-600 bg-red-100' },
		{ value: 3, viewValue: 'Away', statusColor: 'text-amber-600 bg-amber-100' },
		{ value: 4, viewValue: 'In a Meeting', statusColor: 'text-orange-600 bg-orange-100' }
	];

	constructor(
		private _angularLogService: AngularLogService,
		private _contactsService: ContactsService,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService,
		private _location: Location,
		private _messageService: MessageService,
		private _profilesService: ProfileEntityService,
		private _router: Router,
		private _usersService: UsersService,

	) {
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
		const contactId = this.chatMessage.fromId;
		this.getContactDetails(contactId);
	}

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

	public onChange(event): any {
		this.selectEmitt.emit(event.value);
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
		this._location.back();
	}

/*
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
*/

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

}
