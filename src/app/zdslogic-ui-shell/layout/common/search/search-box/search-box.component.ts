import { Component, OnInit, OnDestroy, ViewEncapsulation, Output, EventEmitter, ElementRef, Injector} from '@angular/core';
import { FlexibleConnectedPositionStrategy, Overlay, OverlayRef, ScrollDispatcher, ScrollStrategy, ScrollStrategyOptions} from '@angular/cdk/overlay';

import { ComponentPortal } from '@angular/cdk/portal';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

import { SearchBoxResultsComponent } from '../search-results/search-results.component';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { Subscription } from 'rxjs';
import { AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-search-box',
	templateUrl: './search-box.component.html',
	styleUrls: ['./search-box.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class SearchBoxComponent implements OnInit, AfterViewInit, OnDestroy {
	overlayRef: OverlayRef;
	opened: boolean = false;
	public searchString: string = '';

	@Output() newSearchEvent = new EventEmitter<string>();

	sortProperty = '';

	isSearchResultsOpen: boolean;

	private subscription: Subscription;
  private scrollSubscription: Subscription;
  private positionStrategy: FlexibleConnectedPositionStrategy;

	constructor(
		private _angularLogService: AngularLogService,
		private _dataSharingService: DataSharingService,
		private overlay: Overlay,
		private elementRef: ElementRef,
		private scrollDispatcher: ScrollDispatcher
	) {
	}

	open(): void {
		if ( this.opened ){ return; }

		if(this.elementRef && this.elementRef.nativeElement){
			// We create the overlay

			this.positionStrategy = this.overlay.position()
        .flexibleConnectedTo(this.elementRef)
        .withFlexibleDimensions(false)
        .withPush(false)
        .withViewportMargin(0)
        .withGrowAfterOpen(false)
        .withPositions([{
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        }]);

			this.overlayRef = this.overlay.create({
				positionStrategy: this.positionStrategy,
			});
			//Then we create a portal to render a component
			const componentPortal = new ComponentPortal(SearchBoxResultsComponent, null, Injector.create({
				providers: [
					{ provide: OverlayRef, useValue: this.overlayRef },
					{ provide: ElementRef, useValue: this.elementRef  }
				]
			}));

			 const componentRef = this.overlayRef.attach(componentPortal);
			// Add a custom CSS class to the overlay
			this.overlayRef.addPanelClass('search-result-overlay');

			this.opened = true;
		}

	}

	public close(): void {
		this.overlayRef.dispose();
		this.opened = false;
		this.subscription.unsubscribe();
	}

	ngOnDestroy(): void {
		this.overlayRef?.dispose();

		if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

	ngOnInit(): void {

		this.scrollSubscription = this.scrollDispatcher.scrolled().subscribe(() => {
      if (this.overlayRef && this.overlayRef.hasAttached()) {
        this.positionStrategy.apply();
      }
    });

		this._dataSharingService.isSearchResultsOpen.subscribe((value) => {
			this.isSearchResultsOpen = value;
		});
	}

	ngAfterViewInit(): void{

	}

	searchValueChanged(): void {

		if (this.searchString) {
			this.newSearchEvent.emit(this.searchString);
			this._dataSharingService.searchString.next(this.searchString);
			this._dataSharingService.isSearchResultsOpen.next(true);
			this.open();
		} else {
			this._dataSharingService.isSearchResultsOpen.next(false);
			this.opened = false;
		}

	}

	searchFormSubmitted(type: string = 'All'): void {

		if (this.searchString) {
			this.newSearchEvent.emit(this.searchString);
			this._dataSharingService.searchString.next(this.searchString);
			this._dataSharingService.isSearchResultsOpen.next(true);
			this.open();
		} else {
			this._dataSharingService.isSearchResultsOpen.next(false);
			this.opened = false;
		}

	}
/*
	public doFilter = (value: string) => {
		//        this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	private processChildren(): void {
		////console.log('Processing children. Their count:', this.appMenu.toArray().length)

		//let array1 = this.appMenu.toArray();
		//this.menu = array1[0];

		const array2 = this.appSearchResults.toArray();
		this.results = array2[0];
	}
*/
}
