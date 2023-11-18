import { Injectable } from '@angular/core';
//import { AppService } from './app.service';
//import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { map, catchError } from 'rxjs/operators';
import { AppLog } from '../models/applog.model';
import { ErrorHandlerService } from './error-handler.service';
import { AngularLogService } from '../../core/services/angular-log.service';

@Injectable({
	providedIn: 'root'
})
export class AppLogsService {

	constructor(
		private _http: HttpClient,
		private _errorHandlerService: ErrorHandlerService) {
		}

	public getData(route: string): any {
		return this._http.get(this.createCompleteRoute(route, environment.booksApiUrl), this.generateHeaders());
	}

	public create(route: string, body: any): any {
		return this._http.post(this.createCompleteRoute(route, environment.booksApiUrl), body, this.generateHeaders());
	}

	public update(route: string, body: any): any {
		return this._http.put(this.createCompleteRoute(route, environment.booksApiUrl), body, this.generateHeaders());
	}

	public delete(route: string): any {
		return this._http.delete(this.createCompleteRoute(route, environment.booksApiUrl), this.generateHeaders());
	}

	findLogs(

		filter = '', sortOrder = 'asc',
		pageNumber = 0, pageSize = 3): Observable<any> {
		const apiUrl = this.createCompleteRoute('log', environment.booksApiUrl);

		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Access-Control-Allow-Origin': environment.originHeader,
					//                    'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),

			params: new HttpParams()
				.set('filter', filter)
				.set('sort', sortOrder)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())
		}).pipe(
			// map(result => result['content']
			map(result => result
			)
		);
	}

	findLogsWithSort(

		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {
		const apiUrl = this.createCompleteRoute('log', environment.booksApiUrl);
		const paramsx: any = { page: pageNumber, size: pageSize };
		if (sort != null) {
			paramsx.sort = sort.property + ',' + sort.direction;
		}

		let sortTest = sort.direction;
		if (sort.property !== '') {
			sortTest = sort.property + ',' + sort.direction;
		}
		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					//                   'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),
			params: new HttpParams()
				.set('search', filter)
				.set('sort', sortTest)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())

		}).pipe(
			// map(result => result['content']
			map(result => result
			)
		);
	}

	findLogsWithSortAndFilter(

		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {
		let apiUrl = this.createCompleteRoute('app/log', environment.booksApiUrl);
		const paramsx: any = { page: pageNumber, size: pageSize };
		if (sort != null) {
			paramsx.sort = sort.property + ',' + sort.direction;
		}

		let sortTest = sort.direction;
		if (sort.property !== '') {
			sortTest = sort.property + ',' + sort.direction;
		}
		let search: string = '';
		if (filter !== '') {
			apiUrl = this.createCompleteRoute('app/log/search', environment.booksApiUrl);
			search =
				'message===' + '\'*' + filter + '*\'';
			//            + ' or ' + 'level===' + '\'*' + filter + '*\'';

		}

		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Access-Control-Allow-Origin': environment.originHeader,
					//                   'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),

			params: new HttpParams()
				.set('search', search)
				.set('sort', sortTest)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())

		}).pipe(
			// map(result => result['content']
			map(result => result),
			catchError((error) => { this._errorHandlerService.handleError(error); return throwError(error.statusText); })
		);
	}

	private createCompleteRoute(route: string, envAddress: string): any {
		return `${envAddress}/${route}`;
	}

	private generateHeaders(): any {
		return {

			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': environment.originHeader,
					//                   'Authorization': 'Bearer ' + Cookie.get('access_token')
				})
		};
	}
}

