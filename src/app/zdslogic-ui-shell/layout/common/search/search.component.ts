import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { delay } from 'rxjs/operators';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, takeUntil } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { fuseAnimations } from 'app/zdslogic-ui-shell/@fuse/animations/public-api';

import { SCREEN_SIZE } from 'app/zdslogic-ui-base/core/services/screen-size.enum';
import { ResizeService } from 'app/zdslogic-ui-base/core/services/resize.service';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SearchBoxResultsComponent } from './search-results/search-results.component';
import { SearchBoxComponent } from './search-box/search-box.component';

import { environment } from '../../../../../environments/environment';

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
	//encapsulation: ViewEncapsulation.None,
	//exportAs: 'fuseSearch',
	//animations: fuseAnimations
})
export class SearchComponent implements OnInit, AfterViewInit {

    @Input() appearance: 'basic' | 'bar' = 'basic';

	overlayRef: OverlayRef;
	public searchString: string = '';

	//@ViewChildren("appMenu")
	//public appMenu: QueryList<SearchComponent>;

	//@ViewChildren("appSearchBox")
	//public appSearchBox: QueryList<SearchBoxComponent>;

	//private SearchGrid: MainMenuComponent;
	//private menu: SearchComponent;
	//private SearchGrid: MainMenuComponent;
	private search: SearchBoxComponent;

	isUserLoggedIn: boolean = false;
	isUser: boolean = false;

	messages15: any;
	mysubid15 = 'my-subscription-id-015';
	private unsubscribeSubject: Subject<void> = new Subject<void>();

	isPortal = false;

	size: SCREEN_SIZE = SCREEN_SIZE.XS;

	room: any;

	public getScreenWidth: any;
	public getScreenHeight: any;
	currentUser: any;

	constructor(
		private _http: HttpClient,
		private _router: Router,

		private _dataSharingService: DataSharingService,
		private _resizeService: ResizeService,

		private overlay: Overlay
	) {

	}

	setSearchString(appSearchBoxValue: string): void {
		this.searchString = appSearchBoxValue;
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this._dataSharingService.isPortal.subscribe((value) => {
			this.isPortal = value;
		});

		this.processChildren();
	}
/*
	public redirectToSearch() {
		this.isPortal = true;
		this._dataSharingService.isPortal.next(true);
		const url = '/search';
		this._router.navigate([url]);
		return false;
	}

	private createCompleteRoute(route: string, envAddress: string){
		return `${envAddress}/${route}`;
	}
*/
	private processChildren(): void {
		////console.log('Processing children. Their count:', this.appMenu.toArray().length)
		//const array1 = this.appMenu.toArray();
		//this.menu = array1[0];

		//const array2 = this.appSearchBox.toArray();
		//this.search = array2[0];
	}
}
