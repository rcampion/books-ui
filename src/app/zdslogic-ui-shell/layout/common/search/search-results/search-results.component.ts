import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SearchData } from '../core/models/search.model';
import { SearchDataDataSource } from '../core/services/search.datasource';
import { SearchDataService } from '../core/services/search.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { ProfileEntityService } from 'app/zdslogic-ui-base/core/services/profile-entity.service';
import { ProfileEntity } from 'app/zdslogic-ui-base/core/models/profile-entity.model';

@Component({
	selector: 'app-search-results',
	templateUrl: './search-results.component.html',
	styleUrls: ['./search-results.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class SearchBoxResultsComponent implements OnInit {

	showResults: boolean = false;

	public displayedColumns = ['source', 'title', 'description', 'details'];
	dataSource: SearchDataDataSource;

	@Input() searchString: string;

	searchLength = 0;

	sortProperty = '';

	profileEntity: ProfileEntity;
	public isSearchResultsOpen = false;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private searchDataService: SearchDataService,
		private _profilesService: ProfileEntityService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _dataSharingService: DataSharingService,

	) { }

	ngOnInit(): void {
		this.dataSource = new SearchDataDataSource(this.searchDataService);

		this._dataSharingService.searchString.subscribe((value) => {
			this.searchString = value;
			this.loadSearchResults();
		});

		this._dataSharingService.isSearchResultsOpen.subscribe((value) => {
			this.isSearchResultsOpen = value;
		});
	}

	private loadSearchResults(): void {
		this.dataSource.loadResults(
			this.searchString,
			this.sortProperty,
			'asc',
			0,
			100);

		this.showResults = true;
	}

	public redirectToDetails(element: SearchData): void {

		if (element.source === 'Article') {
			this.showResults = false;
			this._dataSharingService.isPortal.next(true);
			this._dataSharingService.isSearchResultsOpen.next(false);
			const route = `articles/${element.id}`;
			this._router.navigate([route]);
		}

		if (element.source === 'Topic') {
			this.showResults = false;
			this._dataSharingService.isPortal.next(true);
			this._dataSharingService.isSearchResultsOpen.next(false);
			const route = `topics/topic/${element.id}`;
			this._router.navigate([route]);
		}

		if (element.source === 'Profile') {
			this.showResults = false;
			this._dataSharingService.isSearchResultsOpen.next(false);
			this._dataSharingService.isPortal.next(true);
			this.redirectToProfile(element.id);
		}

		if (element.source === 'Resume') {
			this.showResults = false;
			this._dataSharingService.isPortal.next(true);
			this._dataSharingService.isSearchResultsOpen.next(false);
			const route = `resumes/details/${element.id}`;
			this._router.navigate([route]);
		}

		if (element.source === 'Job') {
			this.showResults = false;
			this._dataSharingService.isPortal.next(true);
			this._dataSharingService.isSearchResultsOpen.next(false);
			const route = `jobs/details/${element.id}`;
			this._router.navigate([route]);
		}
	}

	private redirectToProfile(id): void {

		const apiUrl = `profile/id/${id}`;

		this._profilesService.getData(apiUrl)
			.subscribe((res) => {
				this.profileEntity = res as ProfileEntity;

				//const apiUrl = `profile/id/${element.id}`;

				const id = this.profileEntity.userName;
				const route = `/profiles/${id}`;

				this._router.navigate([route]);
				//this.sidenavClose.emit();

			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

}
