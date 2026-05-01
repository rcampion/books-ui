import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { FuseMediaWatcherService } from 'app/zdslogic-ui-shell/@fuse/services/media-watcher';
import { FuseNavigationItem } from 'app/zdslogic-ui-shell/@fuse/components/navigation';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';

import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

import { ProfileEntity } from 'app/zdslogic-ui-base/core/models/profile-entity.model';
import { ProfileEntityService } from 'app/zdslogic-ui-base/core/services/profile-entity.service';

import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';

import { ComposeEMailComponent } from '../email-compose/compose-email.component';

@UntilDestroy()
@Component({
	selector: 'app-email-window-container',
	templateUrl: './email-window-container.component.html',
	styleUrls: ['./email-window-container.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class EMailWindowContainerComponent implements OnInit {
	//	@ViewChild("popupChat") chat: PopupComponent;

	@ViewChild('drawer') drawer: MatDrawer;
	drawerMode: 'over' | 'side' = 'side';
	drawerOpened: boolean = true;
	private _unsubscribeAll: Subject<any> = new Subject<any>();
	menuData: FuseNavigationItem[] = [];

	currentUser: User = new User();
	userId;
	currentProfile: ProfileEntity;

	isUserLoggedIn: boolean = false;
	isUserAuthorized: boolean = false;
	isUserSubscribed: boolean = false;

	constructor(private observer: BreakpointObserver,
		private _router: Router,
		public _usersService: UsersService,
		private _profilesService: ProfileEntityService,
		private _errorHandlerService: ErrorHandlerService,
		private _dataSharingService: DataSharingService,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _matDialog: MatDialog
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
		this.getMenuItems();
		this.currentUser = this._usersService.getCurrentUser();

		this.userId = this.currentUser?.contactId;
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

	openComposeDialog(): void {
		// Open the dialog
		const dialogRef = this._matDialog.open(ComposeEMailComponent);

		dialogRef.afterClosed()
			.subscribe((result) => {
				console.log('Compose dialog was closed!');
			});
	}

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
