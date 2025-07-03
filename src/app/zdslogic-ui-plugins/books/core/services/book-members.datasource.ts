
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookMember } from '../models/book-member.model';
import { BooksService } from './books.service';

import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export class BookMembersDataSource implements DataSource<BookMember> {

	private contactsSubject = new BehaviorSubject<BookMember[]>([]);

	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();

	public paginationPage: any;

	public total = 0;

	constructor(private _booksService: BooksService) {

	}

	loadBookMembers(
		bookId: number,
		filter: string,
		sortProperty: string,
		sortDirection: string,
		pageIndex: number,
		pageSize: number): any {

		this.loadingSubject.next(true);

		const sort = new PaginationPropertySort();
		sort.property = sortProperty;
		sort.direction = sortDirection;

		this._booksService.findBookMembersWithSortAndFilter(bookId, filter, sort,
			pageIndex, pageSize).pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe((response) => {
				this.contactsSubject.next(response.content);
				this.total = response.totalElements;
			}
			);
	}

	connect(collectionViewer: CollectionViewer): Observable<BookMember[]> {
		//console.log('Connecting data source');
		return this.contactsSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.contactsSubject.complete();
		this.loadingSubject.complete();
	}

}

