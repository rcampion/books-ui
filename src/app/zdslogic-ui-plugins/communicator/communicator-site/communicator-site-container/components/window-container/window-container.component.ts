import { Component, Input, OnInit, ViewChildren, QueryList, HostListener, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject, takeUntil } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Cookie } from 'ng2-cookies';

import { SuccessDialogComponent } from '../../../../../../zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ThemePalette } from '@angular/material/core';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { PaginationPropertySort } from '../../../../../../zdslogic-ui-base/core/interfaces/pagination';

import { MatButton } from '@angular/material/button';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { ApiService } from '../../../../../../zdslogic-ui-base/core';
import { AppMessage } from '../../../../../../zdslogic-ui-base/core/models/appmessage.model';
import { AppService } from '../../../../../../zdslogic-ui-base/core/services/app.service';
import { AngularLogService } from '../../../../../../zdslogic-ui-base/core/services/angular-log.service';
import { DataSharingService } from '../../../../../../zdslogic-ui-base/core/services/datasharing.service';
import { ErrorHandlerService } from '../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { ProfileEntity } from '../../../../../../zdslogic-ui-base/core/models/profile-entity.model';
import { ProfileEntityService } from '../../../../../../zdslogic-ui-base/core/services/profile-entity.service';
import { User } from '../../../../../../zdslogic-ui-base/core/models/user.model';
import { UsersService } from '../../../../../../zdslogic-ui-base/core/services/users.service';

import { ChatAdapter } from '../../../../../../zdslogic-ui-base/chat/core/chat-adapter';
import { ChatMessage } from '../../../../../../zdslogic-ui-base/app/core/models/chat-message.model';
import { ChatUser } from '../../../../../../zdslogic-ui-base/chat/core/user';
import { ChatParticipant } from '../../../../../../zdslogic-ui-base/app/core/models/chat-participant.model';
import { ChatParticipantState } from '../../../../../../zdslogic-ui-base/app/core/models/chat-participant-state';
import { ChatParticipantStatus } from '../../../../../../zdslogic-ui-base/chat/core/chat-participant-status.enum';
import { ChatParticipantType } from '../../../../../../zdslogic-ui-base/chat/core/chat-participant-type.enum';
import { ChatService } from '../../../../../../zdslogic-ui-base/app/core/services/chat.service';
import { DefaultFileUploadAdapter } from '../../../../../../zdslogic-ui-base/chat/core/default-file-upload-adapter';
import { Group } from '../../../../../../zdslogic-ui-base/chat/core/group';
import { IChatController } from '../../../../../../zdslogic-ui-base/chat/core/chat-controller';
import { IChatGroupAdapter } from '../../../../../../zdslogic-ui-base/chat/core/chat-group-adapter';
import { IChatOption } from '../../../../../../zdslogic-ui-base/chat/core/chat-option';
import { IChatParticipant } from '../../../../../../zdslogic-ui-base/chat/core/chat-participant';
import { IFileUploadAdapter } from '../../../../../../zdslogic-ui-base/chat/core/file-upload-adapter';
import { Localization } from '../../../../../../zdslogic-ui-base/chat/core/localization';
import { MessageCounter } from '../../../../../../zdslogic-ui-base/chat/core/message-counter';
import { MessageType } from '../../../../../../zdslogic-ui-base/chat/core/message-type.enum';
import { PagedHistoryChatAdapter } from '../../../../../../zdslogic-ui-base/chat/core/paged-history-chat-adapter';
import { ParticipantResponse } from '../../../../../../zdslogic-ui-base/chat/core/participant-response';
import { ScrollDirection } from '../../../../../../zdslogic-ui-base/chat/core/scroll-direction.enum';
import { StatusDescription } from '../../../../../../zdslogic-ui-base/chat/core/localization';
import { Theme } from '../../../../../../zdslogic-ui-base/chat/core/theme.enum';
import { chatParticipantStatusDescriptor } from '../../../../../../zdslogic-ui-base/chat/core/chat-participant-status-descriptor';
import { Window } from '../../../../../../zdslogic-ui-base/chat/core/window';

import { ChatChannel } from '../../../../../../zdslogic-ui-base/app/core/models/chat-channel.model';
import { ChatMessageService } from '../../../../../../zdslogic-ui-base/app/core/services/chat-message.service';

import { Contact } from './../../../../../../zdslogic-ui-plugins/contacts/core/interfaces/contact.model';
import { ContactsService } from './../../../../../../zdslogic-ui-plugins/contacts/core/services/contacts.service';

import { UserContact } from '../../../../../../zdslogic-ui-plugins/contacts/connections/core/interfaces/user-contact.model';

import { environment } from '../../../../../../../environments/environment';
import { application } from '../../../../../../../../application';

@Component({
	selector: 'app-chat-window-container',
	templateUrl: './window-container.component.html',
	styleUrls: ['./window-container.component.scss']
})
export class WindowContainerComponent implements OnInit, AfterViewInit {

	public contact: Contact;
	public userId: number;
	public filter: string;
	public sortProperty: string;
	public sortDirection: string;
	public pageIndex: number;
	public pageSize: number;
	//public contact: Contact;
	public showAccounts;
	public contactId: number;
	//public contactId: string;
	private _overlayRef: OverlayRef;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	isUserLoggedIn = false;
	isDataReady = false;
	firstLoad = true;

	public currentChannel: ChatChannel;
	public windowType: number;
	public channel: ChatChannel;
	public connection: UserContact;
	sessionUser: User = new User();
	currentUser: User = new User();
	currentProfile: ProfileEntity;
	selectedChat: Contact;

	/**
	 * Constructor
	 */
	constructor(
		private _angularLogService: AngularLogService,
		private _activeRoute: ActivatedRoute,
		private _appService: AppService,
		private _contactsService: ContactsService,
		private _errorHandlerService: ErrorHandlerService,
		private _usersService: UsersService,
	) {
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		//const contactId: number = this._activeRoute.snapshot.params['contactId'];

		this._activeRoute.paramMap.subscribe((p) => {
			const contactId = this._activeRoute.snapshot.parent.paramMap.get(
				'contactId'
			);

			const contactIdNumber: number = +contactId;
			this.contactId = contactIdNumber;

			this.getContactDetails(contactIdNumber);

		});

	}

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
		console.log('ChatWindowContainerComponent completed');
	}

	private getContactDetails(contactId: number): any {
		const apiUrl = `contacts/${contactId}`;

		this._contactsService.getData(apiUrl)
			.subscribe((result) => {
				this.contact = result as Contact;
				this.selectedChat = this.contact;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	selectChat(contact: Contact): void {
		// Open the panel
		//this._toggleOpened(true);
	}
}
