import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from './../models/user.model';
import { AngularLogService } from '../../core/services/angular-log.service';

import { application } from '../../../../../application';
@Injectable()
export class RegistrationService {
	user: User = new User();

	constructor(
		private _http: HttpClient) {

	}

	register(userName: string, firstName: string, lastName: string, email: string, password: string) {

		const headers = new HttpHeaders(
			{
				'apikey': application.apiKey,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': environment.originHeader,
				//                'Access-Control-Allow-Credentials': 'true',
				//                'Authorization': 'Bearer ' + Cookie.get('access_token')
			}
		);

		// tslint:disable-next-line:max-line-length
		// return this._http.post(AppUtils.BACKEND_API_ROOT_URL + AppUtils.BACKEND_API_AUTHENTICATE_PATH, JSON.stringify({ login: userName, password: password }), {
		const route = 'user/registration';
		return this._http.post(this.createCompleteRoute(route, environment.apiUrl),
			JSON.stringify({ userName: userName, firstName: firstName, lastName: lastName, email: email, password: password }), {
			headers: headers,
			observe: 'response'
		});
	}

	private createCompleteRoute(route: string, envAddress: string): any {
		return `${envAddress}/${route}`;
	}
}
