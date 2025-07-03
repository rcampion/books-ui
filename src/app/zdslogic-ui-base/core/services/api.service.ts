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
export class ApiService {
	constructor(
		private _http: HttpClient
	) { }

	private formatErrors(error: any): Observable<never> {
		return throwError(error.error);
	}

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
			.pipe(catchError(this.formatErrors));
	}

	public getData(route: string): any {
		return this._http.get(this.createCompleteRoute(route, environment.apiUrl), this.generateHeaders());
	};

	public update(route: string, body: any): any {
		return this._http.put(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
	}

	put(path: string, body: any = {}): Observable<any> {
		return this._http.put(
			`${environment.apiUrl}${path}`,
			JSON.stringify(body), this.generateHeaders()
		).pipe(catchError(this.formatErrors));
	}

	post(path: string, body: any = {}): Observable<any> {
		////console.log(`${environment.apiUrl}${path}`);
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
