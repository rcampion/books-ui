import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from 'app/zdslogic-shell/@fuse/services/media-watcher';
import { FuseNavigationItem, FuseNavigationService, FuseVerticalNavigationComponent } from 'app/zdslogic-shell/@fuse/components/navigation';
import { adminSideMenuItems, authMenuItems, authSideMenuItems, menuItems, sideMenuItems } from 'app/zdslogic-shell/layout/common/menuItems';
import { AuthService } from 'app/zdslogic-shell/core/auth/auth.service';

//import { AppService } from 'app/zdslogic-base/core/services/app.service';
//import { UsersService } from 'app/zdslogic-base/core/services/users.service';
//import { DataSharingService } from 'app/zdslogic-base/core/services/datasharing.service';

@Component({
	selector: 'guest-layout',
	templateUrl: './guest.component.html',
	styleUrls: ['./guest.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GuestLayoutComponent implements OnInit, OnDestroy {
	menuItems: FuseNavigationItem[];
	sideMenuItems: FuseNavigationItem[];
	isScreenSmall: boolean;
	navigationAppearance: 'default' | 'dense' = 'dense';
	isLoggedIn: boolean;
	isLoggedIn$: Observable<boolean>;

	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		//private _dataSharingService: DataSharingService,
		//private _appService: AppService,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _fuseNavigationService: FuseNavigationService,
		//private _usersService: UsersService
	) {
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Getter for current year
	 */
	get currentYear(): number {
		return new Date().getFullYear();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {

		this.isLoggedIn = true;

		if (this.isLoggedIn) {
			this.menuItems = authMenuItems;
			this.sideMenuItems = adminSideMenuItems;
		}
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	setMenuAfterLogin(): void {
		this.isLoggedIn$.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((tokenStatus) => {
				this.isLoggedIn = tokenStatus;
				if (this.isLoggedIn) {
					this.menuItems = authMenuItems;
					this.sideMenuItems = adminSideMenuItems;
				}
			});

		// Subscribe to media changes
		this._fuseMediaWatcherService.onMediaChange$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(({ matchingAliases }) => {

				// Check if the screen is small
				this.isScreenSmall = !matchingAliases.includes('md');
				this.navigationAppearance = this.isScreenSmall ? 'default' : 'dense';
			});
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Toggle navigation
	 *
	 * @param name
	 */
	toggleNavigation(name: string): void {
		// Get the navigation
		const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

		if (navigation) {
			// Toggle the opened status
			navigation.toggle();
		}
	}

	toggleNavigationAppearance(): void {
		this.navigationAppearance = (this.navigationAppearance === 'default' ? 'dense' : 'default');
	}
}
