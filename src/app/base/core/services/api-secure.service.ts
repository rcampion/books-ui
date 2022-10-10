import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map, tap } from 'rxjs/operators';
import { AngularLogService } from '../../core/services/angular-log.service';

import { application } from 'application';

@Injectable()
export class ApiSecureService {
	constructor(
		private http: HttpClient
	) { }

	private formatErrors(error: any) {
		return throwError(error.error);
	}

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.api_url}${path}`, { 
            headers: new HttpHeaders(
                {
				'apikey': application.apiKey,    
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + Cookie.get('access_token')
            }),
            params })
            .pipe(catchError(this.formatErrors));
    }
    
	public getData = (route: string) => {
		return this.http.get(this.createCompleteRoute(route, environment.api_url), this.generateHeaders());
	}
/*
	get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
		return this.http.get(`${environment.api_url}${path}`, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,   
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
				}),
			params
		})
			.pipe(map(res => res),
				catchError(this.formatErrors),
				tap(res => {console.log(res)})
				// map(res => res['content']
//				map(res => {res}),catchError(this.formatErrors)
			);
//			      .pipe(
//		tap((data: {profile: Profile}) => console.log(data)), 
//		map((data: {profile: Profile}) => data.profile));

	}
*/
	put(path: string, body: Object = {}): Observable<any> {
		return this.http.put(
			`${environment.api_url}${path}`,
			JSON.stringify(body), this.generateHeaders()
		).pipe(catchError(this.formatErrors));
	}

	post(path: string, body: Object = {}): Observable<any> {
		return this.http.post(
			`${environment.api_url}${path}`,
			body, this.generateHeaders()
		).pipe(catchError(this.formatErrors));
	}

	delete(path): Observable<any> {
		return this.http.delete(
			`${environment.api_url}${path}`, this.generateHeaders()

		).pipe(catchError(this.formatErrors));
	}

	private generateHeaders() {
		return {

			headers: new HttpHeaders(
				{				
					'apikey': application.apiKey,   
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Credentials': 'true',
					'Access-Control-Allow-Origin': '*',
					'Authorization': 'Bearer ' + Cookie.get('access_token')
				})
		};
	}
	
    private createCompleteRoute = (route: string, envAddress: string) => {
        return `${envAddress}/${route}`;
    }
}
