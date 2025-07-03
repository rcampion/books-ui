import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { map, catchError } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { AngularLogService } from './angular-log.service';

import { application } from '../../../../../application';

@Injectable({
	providedIn: 'root'
})
export class SubscriptionsService {

	constructor(private _http: HttpClient,
		private _errorHandlerService: ErrorHandlerService) { }

	public getData(route: string): any {
		return this._http.get(this.createCompleteRoute(route, environment.apiUrl), this.generateHeaders());
	}

	public create(route: string, body: any): any {
		return this._http.post(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
	}

	public update(route: string, body: any): any {
		return this._http.put(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
	}

	public delete(route: string): any {
		return this._http.delete(this.createCompleteRoute(route, environment.apiUrl), this.generateHeaders());
	}

	public findSubscriptionsWithSortAndFilter(

		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {
		let apiUrl = this.createCompleteRoute('subscription', environment.apiUrl);
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
			apiUrl = this.createCompleteRoute('subscription/search', environment.apiUrl);

			const description = '\'*' + filter + '*\'';

			search = 'description==' + description;

		}
		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Access-Control-Allow-Origin': environment.originHeader,
					'Authorization': 'Bearer ' + Cookie.get('access_token')
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

	public findSubscriptionMembersWithSortAndFilter(
		subscriptionId = 0,
		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {

		const id: number = subscriptionId;
		const buildApiUrl = 'subscription/member/' + id;
		let apiUrl = this.createCompleteRoute(buildApiUrl, environment.apiUrl);
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
			apiUrl = this.createCompleteRoute('contacts/search', environment.apiUrl);

			const fullName = '\'*' + filter + '*\'';
			const firstName = '\'*' + filter + '*\'';
			const lastName = '\'*' + filter + '*\'';
			const company = '\'*' + filter + '*\'';
			const title = '\'*' + filter + '*\'';

			search = 'fullName==' + fullName + ' or ' + 'firstName==' + firstName + ' or ' + 'lastName==' + lastName + ' or ' + 'company==' + company + ' or ' + 'title==' + title;
		}
		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Access-Control-Allow-Origin': environment.originHeader,
					'Authorization': 'Bearer ' + Cookie.get('access_token')
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

		const headers = new HttpHeaders(
			{
				'apikey': application.apiKey,
				'Access-Control-Allow-Origin': environment.originHeader,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'Authorization': 'Bearer ' + Cookie.get('access_token')

			}
		);

		return {

			headers: headers

		};
	}
}
