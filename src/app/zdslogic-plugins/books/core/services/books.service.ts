import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { map, catchError, finalize } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

import { application } from '../../../../../../application';

@Injectable({
	providedIn: 'root'
})
export class BooksService {

	public total = 0;

	private booksSubject = new BehaviorSubject<Book[]>([]);

	private loadingSubject = new BehaviorSubject<boolean>(false);

	constructor(
		private _http: HttpClient,
		private _errorHandlerService: ErrorHandlerService) {

		this.loadBooks('', '', 'asc', 0, 6);

	}

	public getData(route: string): any {
		return this._http.get(this.createCompleteRoute(route, environment.booksApiUrl), this.generateHeaders());
	}

	public create(route: string, body): any {
		return this._http.post(this.createCompleteRoute(route, environment.booksApiUrl), body, this.generateHeaders());
	}

	public update(route: string, body): any {
		return this._http.put(this.createCompleteRoute(route, environment.booksApiUrl), body, this.generateHeaders());
	}

	public delete(route: string): any {
		return this._http.delete(this.createCompleteRoute(route, environment.booksApiUrl), this.generateHeaders());
	}

	loadBooks(
		filter: string,
		sortProperty: string,
		sortDirection: string,
		pageIndex: number,
		pageSize: number): void {

		this.loadingSubject.next(true);

		const sort = new PaginationPropertySort();
		sort.property = sortProperty;
		sort.direction = sortDirection;

		this.findBooksWithSortAndFilter(filter, sort,
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

	findBooksWithSortAndFilter(

		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {
		let apiUrl = this.createCompleteRoute('books', environment.booksApiUrl);
		const paramsx: any = { page: pageNumber, size: pageSize };
		if (sort != null) {
			paramsx.sort = sort.property + ',' + sort.direction;
		}

		let sortTest = sort.direction;
		if (sort.property !== '') {
			sortTest = sort.property + ',' + sort.direction;
		}

		let search: string;
		if (filter !== '') {
			apiUrl = this.createCompleteRoute('books/search', environment.booksApiUrl);

			const title = '\'*' + filter + '*\'';
			const author = '\'*' + filter + '*\'';

			//search = 'bookName==*' + filter + '* or ' + 'bookDescription==*' + filter + '*';
			//search = 'bookDescription==' + filter + '*';
			search = 'title==' + title + ' or ' + 'author==' + author;

		}

		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Credentials': 'true',
					'Access-Control-Allow-Origin': environment.originHeader,
//					'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),
			params: new HttpParams()

				.set('search', search)
				.set('sort', sortTest)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())

		}).pipe(
			// map(res => res['content']
			map(res => res),
			catchError((error) => { this._errorHandlerService.handleError(error); return throwError(error.statusText); })
		);
	}

	public getBooks(): Observable<Book[]> {
		return this.booksSubject;
	}

	private createCompleteRoute(route: string, envAddress: string): any {
		return `${envAddress}/${route}`;
	}

	private generateHeaders(): any {

		const headers = new HttpHeaders(
			{
				'apikey': application.apiKey,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Origin': environment.originHeader,
//				'Authorization': 'Bearer ' + Cookie.get('access_token')

			}
		);

		return {

			headers: headers

		};
	}
}
