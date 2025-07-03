import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map, tap } from 'rxjs/operators';

import { AngularLogService } from '../../core/services/angular-log.service';

import { environment } from '../../../../environments/environment';
import { application } from '../../../../../application';

@Injectable()
export class ApiSecureService {
	constructor(
		private _http: HttpClient
	) { }

	private formatErrors(error: any): any {
		return throwError(error.error);
	}

	get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
		return this._http.get(`${environment.apiUrl}${path}`, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Access-Control-Allow-Origin': environment.originHeader,
					'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),
			params
		})
			.pipe(catchError(this.formatErrors));
	}

	public getData(route: string): any {
		return this._http.get(this.createCompleteRoute(route, environment.apiUrl), this.generateHeaders());
	}
	/*
		get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
			return this._http.get(`${environment.apiUrl}${path}`, {
				headers: new HttpHeaders(
					{
						'apikey': application.apiKey,
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': environment.originHeader,
					}),
				params
			})
				.pipe(map(result => result),
					catchError(this.formatErrors),
					tap((result) => {//console.log(result)})
					// map(result => result['content']
	//				map((result) => {result}),catchError(this.formatErrors)
				);
	//			      .pipe(
	//		tap((data: {profile: Profile}) => //console.log(data)),
	//		map((data: {profile: Profile}) => data.profile));

		}
	*/
	put(path: string, body: any = {}): Observable<any> {
		return this._http.put(
			`${environment.apiUrl}${path}`,
			JSON.stringify(body), this.generateHeaders()
		).pipe(catchError(this.formatErrors));
	}

	post(path: string, body: any = {}): Observable<any> {
		return this._http.post(
			`${environment.apiUrl}${path}`,
			body, this.generateHeaders()
		).pipe(catchError(this.formatErrors));
	}

	delete(path: any): Observable<any> {
		return this._http.delete(
			`${environment.apiUrl}${path}`, this.generateHeaders()

		).pipe(catchError(this.formatErrors));
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

	private createCompleteRoute(route: string, envAddress: string): string {
		return `${envAddress}/${route}`;
	}
}
