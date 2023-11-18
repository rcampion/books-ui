
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { BooksService } from './books.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

export class BooksDataSource implements DataSource<Book> {

	private booksSubject = new BehaviorSubject<Book[]>([]);

	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();

	public paginationPage: any;

	public total = 0;

	constructor(
		private _booksService: BooksService) {
	}

	loadBooks(
		filter: string,
		sortProperty: string,
		sortDirection: string,
		pageIndex: number,
		pageSize: number): any {

		this.loadingSubject.next(true);

		const sort = new PaginationPropertySort();
		sort.property = sortProperty;
		sort.direction = sortDirection;

		this._booksService.findBooksWithSortAndFilter(filter, sort,
			pageIndex, pageSize).pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe((response) => {
				this.booksSubject.next(response.content);
				this.total = response.totalElements;
			}
			);
	}

	connect(collectionViewer: CollectionViewer): Observable<Book[]> {
		//console.log('Connecting data source');
		return this.booksSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.booksSubject.complete();
		this.loadingSubject.complete();
	}

}

