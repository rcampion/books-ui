import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ErrorHandlerService } from './error-handler.service';

import { environment } from '../../../../environments/environment';
import { application } from '../../../../../application';

@Injectable({
	providedIn: 'root'
})
export class ChatHistoryService {
	constructor(
		private _http: HttpClient,
		private _errorHandlerService: ErrorHandlerService) { }


	public getData(route: string): any {
		return this._http.get(this.createCompleteRoute(route, environment.apiUrl), this.generateHeaders());
	}

	public create(route: string, body: any): any {
		return this._http.post(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
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