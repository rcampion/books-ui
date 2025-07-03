import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatDrawer } from '@angular/material/sidenav';
import { delay, filter, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Subject } from 'rxjs';
import { FuseMediaWatcherService } from 'app/zdslogic-ui-shell/@fuse/services/media-watcher';
import { FuseNavigationItem } from 'app/zdslogic-ui-shell/@fuse/components/navigation';
import { MatDialog } from '@angular/material/dialog';
//import { ComposeEMailComponent } from '../email-compose/compose-email.component';

@UntilDestroy()
@Component({
	selector: 'app-books-admin-container',
	templateUrl: './books-admin-container.component.html',
	styleUrls: ['./books-admin-container.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class BooksAdminContainerComponent implements OnInit {
	//	@ViewChild("popupChat") chat: PopupComponent;

	@ViewChild('drawer') drawer: MatDrawer;
	drawerMode: 'over' | 'side' = 'side';
	drawerOpened: boolean = true;

	menuData: FuseNavigationItem[] = [];

	isUserLoggedIn: boolean = false;

	isUserAuthorized: boolean = false;

	isUserSubscribed: boolean = false;

	private _unsubscribeAll: Subject<any> = new Subject<any>();

	constructor(
		private observer: BreakpointObserver,
		private _router: Router,
		private _errorHandlerService: ErrorHandlerService,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _matDialog: MatDialog
	) {

	}

	ngOnInit(): void {
		this.getMenuItems();

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

	/*
		openComposeDialog(): void
		{
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
					.subscribe((res) => {
						this.profileEntity = res as ProfileEntity;
						//this.isUser = (this.currentUser.userName === this.profileEntity.userName);


					},
						(error) => {
							this._errorHandlerService.handleError(error);
						});
			}
		};
	*/
	private getMenuItems(): void {
		this.menuData = [
			{
				id: 'entities',
				title: 'Entities',
				type: 'group',
				open: false,
				children: [
					{
						id: 'entities.address',
						title: 'Address',
						type: 'basic',
						icon: 'heroicons_outline:table',
						link: '/books-admin/address'
					},
					{
						id: 'entities.address-status',
						title: 'Address Status',
						type: 'basic',
						icon: 'heroicons_outline:table',
						link: '/books-admin/address-status'
					},
					{
						id: 'entities.author',
						title: 'Author',
						type: 'basic',
						icon: 'heroicons_outline:table',
						link: '/books-admin/author'
					},
					{
						id: 'entities.book',
						title: 'Book',
						type: 'basic',
						icon: 'heroicons_outline:table',
						link: '/books-admin/book'
					},
				]
			}
		];
		/*
				if( this._usersService.isUserAuthorized(['ROLE_ADMIN']) ){
					this.menuData[0].children.push(
						{
							id   : 'mail.blacklist',
							title: 'BlackList',
							type : 'basic',
							icon : 'heroicons_outline:view-list',
							link : '/my-emails/blacklist'
						}
					);
				}

		*/
	}
}
