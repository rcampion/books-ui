import { Component, Input, OnInit, AfterViewInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Output, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

import { FuseMediaWatcherService } from 'app/zdslogic-ui-shell/@fuse/services/media-watcher';
import { FuseNavigationItem } from 'app/zdslogic-ui-shell/@fuse/components/navigation';

import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

import { ProfileEntity } from 'app/zdslogic-ui-base/core/models/profile-entity.model';
import { ProfileEntityService } from 'app/zdslogic-ui-base/core/services/profile-entity.service';

import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { UserContact } from '../../../../../../../..//zdslogic-ui-plugins/contacts/connections/core/interfaces/user-contact.model';

import { ChatChannel } from 'app/zdslogic-ui-base/app/core/models/chat-channel.model';

import { Contact } from '../../../../../../../../zdslogic-ui-plugins/contacts/core/interfaces/contact.model';
import { ContactsService } from '../../../../../../../../zdslogic-ui-plugins/contacts/core/services/contacts.service';

@UntilDestroy()
@Component({
	selector: 'app-chat-window-container',
	templateUrl: './chat-window-container.component.html',
	styleUrls: ['./chat-window-container.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ChatWindowContainerComponent implements OnInit {
	//	@ViewChild("popupChat") chat: PopupComponent;
	@ViewChild('drawer') drawer: MatDrawer;
	drawerMode: 'over' | 'side' = 'side';
	drawerOpened: boolean = true;
	menuData: FuseNavigationItem[] = [];

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

	isUserLoggedIn: boolean = false;
	isUserAuthorized: boolean = false;
	isUserSubscribed: boolean = false;

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

	constructor(private observer: BreakpointObserver,
		private _angularLogService: AngularLogService,
		private _activeRoute: ActivatedRoute,
		private _contactsService: ContactsService,
		private _dataSharingService: DataSharingService,
		private _errorHandlerService: ErrorHandlerService,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _matDialog: MatDialog,
		private _profilesService: ProfileEntityService,
		private _router: Router,
		private _usersService: UsersService,

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

	}

	ngOnInit(): void {
		//this.getMenuItems();

		this.currentUser = this._usersService.getCurrentUser();

		this.userId = this.currentUser?.contactId;

		this._activeRoute.paramMap.subscribe((p) => {
			const contactId = this._activeRoute.snapshot.parent.paramMap.get(
				'contactId'
			);

			const contactIdNumber: number = +contactId;
			this.contactId = contactIdNumber;

			this.getContactDetails(contactIdNumber);

		});

		this.getProfileDetails();

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
	private getProfileDetails = (): void => {
		const username = this.currentUser?.userName;

		if (username !== undefined) {

			const id: string = username;
			//const url = `/profiles/${id}`;
			const apiUrl = `profile/${id}`;

			this._profilesService.getData(apiUrl)
				.subscribe((result) => {
					this.currentProfile = result as ProfileEntity;
					//this.isUser = (this.currentUser.userName === this.currentProfile.userName);
				},
					(error) => {
						this._errorHandlerService.handleError(error);
					});
		}
	};

	private getMenuItems(): void {
		this.menuData = [
			{
				id: 'mailboxes',
				title: 'Mailboxes',
				type: 'group',
				open: false,
				children: [
					{
						id: 'mail.inbox',
						title: 'Inbox',
						type: 'basic',
						icon: 'heroicons_outline:inbox',
						link: '/messaging/email/inbox'
					},
					{
						id: 'mail.sent',
						title: 'Sent',
						type: 'basic',
						icon: 'heroicons_outline:paper-airplane',
						link: '/messaging/email/sent'
					},
					{
						id: 'mail.junk',
						title: 'Junk',
						type: 'basic',
						icon: 'heroicons_outline:exclamation',
						link: '/messaging/email/junk'
					}
				]
			}
		];

		if (this._usersService.isUserAuthorized(['ROLE_ADMIN'])) {
			this.menuData[0].children.push(
				{
					id: 'mail.blacklist',
					title: 'BlackList',
					type: 'basic',
					icon: 'heroicons_outline:view-list',
					link: '/messaging/email/blacklist'
				}
			);
		}
	}
}
