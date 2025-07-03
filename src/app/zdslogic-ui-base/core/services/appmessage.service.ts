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

import { application } from '../../../../../application';
@Injectable({
	providedIn: 'root'
})
export class AppMessageService {
	constructor(
		private _http: HttpClient,
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

	private createCompleteRoute(route: string, envAddress: string): any {
		return `${envAddress}/${route}`;
	}

	private generateHeaders(): any {
		return {

			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': environment.originHeader,
					//'Authorization': 'Bearer ' + Cookie.get('access_token')
				})
		};
	}
}

