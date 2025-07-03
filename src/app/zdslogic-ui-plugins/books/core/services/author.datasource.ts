
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';
import { AuthorService } from './author.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export class AuthorDataSource implements DataSource<Author> {

	private addressesSubject = new BehaviorSubject<Author[]>([]);

	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();

	public paginationPage: any;

	public total = 0;

	constructor(
		private _booksService: AuthorService) {
	}

	loadAuthors(
		filter: string,
		sortProperty: string,
		sortDirection: string,
		pageIndex: number,
		pageSize: number): any {

		this.loadingSubject.next(true);

		const sort = new PaginationPropertySort();
		sort.property = sortProperty;
		sort.direction = sortDirection;

		this._booksService.findAuthoresWithSortAndFilter(filter, sort,
			pageIndex, pageSize).pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe((response) => {
				this.addressesSubject.next(response.content);
				this.total = response.totalElements;
			}
			);
	}

	connect(collectionViewer: CollectionViewer): Observable<Author[]> {
		//console.log('Connecting data source');
		return this.addressesSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.addressesSubject.complete();
		this.loadingSubject.complete();
	}

}

