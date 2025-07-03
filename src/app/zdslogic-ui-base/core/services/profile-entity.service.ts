import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { map, catchError } from 'rxjs/operators';
import { ProfileEntity } from '../models/profile-entity.model';
import { ErrorHandlerService } from './error-handler.service';
import { AngularLogService } from '../../core/services/angular-log.service';

import { application } from '../../../../../application';
@Injectable({
	providedIn: 'root'
})
export class ProfileEntityService {
	constructor(
		private _http: HttpClient,
		private _errorHandlerService: ErrorHandlerService) {

		}

	public getData(route: string): any {
		return this._http.get(this.createCompleteRoute(route, environment.apiUrl), this.generateHeadersNoToken());
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

	public getDataPage(route: string, page: number, pageSize: number, sort: PaginationPropertySort): any {
		const params: any = { page: page, size: pageSize, headers: this.generateHeaders(), observe: 'body' };
		if (sort != null) {
			params.sort = sort.property + ',' + sort.direction;
		}
		return this._http.get<PaginationPage<any>>(this.createCompleteRoute(route, environment.apiUrl), params);
	}

	public createNoToken(route: string, body: any): any {
		return this._http.post(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeadersNoToken());
	}

	public send(route: string, formData): any {
		const headers = new HttpHeaders(
			{
				//'Content-Type': 'multipart/form-data',
				//'Accept': 'application/json'
				'apikey': application.apiKey,
				'Access-Control-Allow-Origin': environment.originHeader,
				'Access-Control-Allow-Credentials': 'true',
				'Authorization': 'Bearer ' + Cookie.get('access_token')
			}
		);
		return this._http.post<any>(this.createCompleteRoute(route, environment.apiUrl), formData, {
			headers: headers
		});
	}

	public sendNoToken(route: string, formData): any {
		const headers = new HttpHeaders(
			{
				//'Content-Type': 'multipart/form-data',
				//'Accept': 'application/json'
				'apikey': application.apiKey,
				'Access-Control-Allow-Origin': environment.originHeader,
				'Access-Control-Allow-Credentials': 'true',
			}
		);
		return this._http.post<any>(this.createCompleteRoute(route, environment.apiUrl), formData, {
			headers: headers
		});
	}

	findProfiles(

		filter = '', sortOrder = 'asc',
		pageNumber = 0, pageSize = 3): Observable<any> {
		const apiUrl = this.createCompleteRoute('profile', environment.apiUrl);

		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Access-Control-Allow-Origin': environment.originHeader,
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

	findProfilesWithSort(

		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {
		const apiUrl = this.createCompleteRoute('profile', environment.apiUrl);
		const paramsx: any = { page: pageNumber, size: pageSize };
		if (sort != null) {
			paramsx.sort = sort.property + ',' + sort.direction;
		}
		// const sortTest = 'firstName' + '\&' + 'firstName.dir=desc';
		// const sortTestEncoded = encodeURIComponent(sortTest);
		let sortTest = sort.direction;
		if (sort.property !== '') {
			sortTest = sort.property + ',' + sort.direction;
		}
		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Access-Control-Allow-Origin': environment.originHeader,
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

	findProfilesWithSortAndFilter(

		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {
		let apiUrl = this.createCompleteRoute('profile', environment.apiUrl);
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
			apiUrl = this.createCompleteRoute('profile/search', environment.apiUrl);

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

	findUserProfilesWithSortAndFilter(
		userId = 0,
		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {

		const id: number = userId;
		const buildApiUrl = 'user/profiles/' + id;
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

			apiUrl = this.createCompleteRoute('profile/search', environment.apiUrl);

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
				}),
			params: new HttpParams()
				.set('search', search)
				.set('sort', sortTest)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())

		})
			.pipe(
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
					'apikey': application.apiKey,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Credentials': 'true',
					'Access-Control-Allow-Origin': environment.originHeader,
					'Authorization': 'Bearer ' + Cookie.get('access_token')
				})
		};
	}

	private generateHeadersNoToken(): any {
		return {

			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': environment.originHeader,
				})
		};
	}
}
