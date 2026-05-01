import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { AppMessage } from 'app/zdslogic-ui-base/core/models/appmessage.model';
import { AppService } from 'app/zdslogic-ui-base/core/services/app.service';
import { ConfirmMessageDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/confirm-message-dialog/confirm-message-dialog.component';
import { ConnectionDeleteDialogComponent } from '../../connections/connection-delete/connection-delete-dialog.component';

import { Contact } from '../../core/interfaces/contact.model';
import { ContactsService } from '../../core/services/contacts.service';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';

import { MessageDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/message-dialog/message-dialog.component';
import { MessageService } from 'app/zdslogic-ui-base/core/services/message.service';

import { PresenceType } from 'app/zdslogic-ui-shell/common/interfaces/presence-type';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

@Component({
	selector: 'app-contact-data',
	templateUrl: './contact-data.component.html',
	styleUrls: ['./contact-data.component.scss']
})
export class ContactDataComponent implements OnInit, AfterViewInit {
	@Input() public contact: Contact;
	public selectOptions = [{ name: 'Show', value: 'show' }, { name: 'Don\'t Show', value: '' }];
	@Output() selectEmitt = new EventEmitter();

	//public user: User = new User();
	currentUser: User = new User();
	isUser: boolean;
	room: any;
	currentContact: Contact;
	presenceStatus: number;
	result: boolean = false;

	//currentTeamMember: TeamMember;

	private deleteDialogConfig;
	private selectDialogConfig;
	private messageDialogConfig;

	presenceTypes: PresenceType[] = [
		{ value: 0, viewValue: 'Online', statusColor: 'text-green-600 bg-green-100' },
		{ value: 1, viewValue: 'Offline', statusColor: 'text-gray-600 bg-gray-100' },
		{ value: 2, viewValue: 'Busy', statusColor: 'text-red-600 bg-red-100' },
		{ value: 3, viewValue: 'Away', statusColor: 'text-amber-600 bg-amber-100' },
		{ value: 4, viewValue: 'In a Meeting', statusColor: 'text-orange-600 bg-orange-100' }
	];

	constructor(
		private _angularLogService: AngularLogService,
		private _activeRoute: ActivatedRoute,
		private _contactsService: ContactsService,
		private _dataSharingService: DataSharingService,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService,
		private _location: Location,
		private _messageService: MessageService,
		private _router: Router,
		private _usersService: UsersService,) {

	}

	ngOnInit(): void {
		//console.log(this.contact);
	}

	ngAfterViewInit(): void {
		//console.log(this.contact);
	}

	public onChange(event): void {
		this.selectEmitt.emit(event.value);
	};

	public onCancel(): void {

		const locationUrl = '/contacts/list';
		///contacts/details/${this.contact.contactId'
		this._location.go(locationUrl);

		//this._location.back();
		this._router.navigateByUrl(locationUrl);
	};

	openLink(url: string): void {
		window.open(url, '_blank');
	}

/*
	public redirectToAdd(): void {
		const id: string = this._activeRoute.snapshot.params['id'];
		this.selectDialogConfig.data = {
			teamId: id
		};
		const dialogRef = this._dialog.open(ConnectionsSelectionDialogComponent, this.selectDialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadTeamMembersPage();
			});
	};
*/

	public delete(element: any): void {

		if (element.contactId) {
			let id = element.id;
			const apiUrl = `user/contacts/${id}`;
			this._contactsService.delete(apiUrl)
				.subscribe((result) => {
					id = result as number;
					//this.loadContactsPage();
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
					//this.loadContactsPage();
				});
		}
	}

	public redirectToDetails(element: any): void {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/details/${element.contactId}`;
		} else {
			url = `/contacts/contact/details/${element.id}`;
		}
		this._router.navigate([url]);
	};


	public redirectToProfile(element: any): void {
		let id = '';
		if (element.contactId) {
			id = element.contactId;
		} else {
			id = element.id;
		}

		const apiUrl = `contacts/${id}`;

		this._contactsService.getData(apiUrl)
			.subscribe((result) => {
				this.contact = result as Contact;
				const id = this.contact.userName;
				const url = `/profiles/${id}`;
				this._router.navigate([url]);
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	};

	public redirectToUpdate(element: any): void {

		let id = '';
		if (element.contactId) {
			id = element.contactId;
		} else {
			id = element.id;
		}

		const apiUrl = `contacts/${id}`;
		this._contactsService.getData(apiUrl)
			.subscribe((result) => {
				this.currentContact = result as Contact;

				this.currentUser = this._usersService.getCurrentUser();

				this.isUser = (this.currentUser.userName === this.currentContact.userName);
				if (!this.isUser) {
					this.isUser = (this.currentUser.id === this.currentContact.ownerId);
				}

				if (this._usersService.isUserAuthorized(['ROLE_ADMIN'])) {
					this.isUser = true;
				}

				if (this.isUser) {
					const url = `/contacts/contact/update/${id}`;
					this._router.navigate([url]);
				}
			});
	};

	public redirectToVideo(element: any): void {

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

	getStatusClass(status: number): string {
		const statusClass = this.presenceTypes.map(presenceType => presenceType.value === status ? presenceType.statusColor : '');
		return statusClass.join(' ');
	}

	getStatusName(status: number): string {
		const statusClass = this.presenceTypes.map(presenceType => presenceType.value === status ? presenceType.viewValue : '');
		return statusClass.join(' ');
	}
}
