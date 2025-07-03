
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { SearchData } from '../models/search.model';
import { SearchDataService } from './search.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
//import { WikiTopicListConfig } from '../models/topic-list-config.model';

export class SearchDataDataSource implements DataSource<SearchData> {

	private searchDataSubject = new BehaviorSubject<SearchData[]>([]);

	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();

	public total = 0;

	constructor(private searchDataService: SearchDataService) {

	}

	loadResults(
		filter: string,
		sortProperty: string,
		sortDirection: string,
		pageIndex: number,
		pageSize: number): void {

		this.loadingSubject.next(true);

		const sort = new PaginationPropertySort();
		sort.property = sortProperty;
		sort.direction = sortDirection;

		this.searchDataService.findSearchDataWithSortAndFilter(
			filter,
			sort,
			pageIndex,
			pageSize
		)
			.pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe((response) => {
				this.searchDataSubject.next(response);
				this.total = response.length;
			}
			);
	}

	connect(collectionViewer: CollectionViewer): Observable<SearchData[]> {
		////console.log('Connecting data source');
		return this.searchDataSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.searchDataSubject.complete();
		this.loadingSubject.complete();
	}

}

