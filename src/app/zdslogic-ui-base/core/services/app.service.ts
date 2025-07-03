import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable, distinctUntilChanged, interval, map, of } from 'rxjs';
import { throwError } from 'rxjs';
import { UsersService } from '../../core/services/users.service';

import { User } from '../models/user.model';
import { DataSharingService } from './datasharing.service';
import { AngularLogService } from './angular-log.service';

import { environment } from '../../../../environments/environment';
import { application } from '../../../../../application';

import { AuthService } from '../../../zdslogic-ui-shell/core/auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AppService {
	public clientId = 'newClient';
	public redirectUri = environment.redirectUri;
	private _http: HttpClient;

	constructor(
		private _angularLogService: AngularLogService,
		handler: HttpBackend,
		private _authService: AuthService,
		private _usersService: UsersService,
		private _dataSharingService: DataSharingService) {

		this._http = new HttpClient(handler);

	}

	public sendNoToken(route: string, formData): any {
		const headers = new HttpHeaders(
			{
				'apikey': application.apiKey,
				//'Content-Type': 'multipart/form-data',
				//'Accept': 'application/json',
				'Access-Control-Allow-Origin': environment.originHeader,
			}
		);
		return this._http.post<any>(this.createCompleteRoute(route, environment.apiUrl), formData, {
			headers: headers
		});
	}

	retrieveToken(code: any): any {
		const params = new URLSearchParams();
		params.append('grant_type', 'authorization_code');
		params.append('client_id', this.clientId);
		params.append('client_secret', 'newClientSecret');
		//params.append('client_secret', '5eb77bb1-f499-4cd5-bc30-540f7fe50a96');
		params.append('redirect_uri', this.redirectUri);
		params.append('code', code);
		const headers = new HttpHeaders(
			{
				//'apikey': application.apiKey,
				'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
				//'Accept': 'application/json'
				//'Access-Control-Allow-Origin': environment.originHeader,
				//'Access-Control-Allow-Credentials': 'true',
				//'Authorization': 'Bearer ' + Cookie.get('access_token')
			}
		);

		this._http.post(environment.ssoUrl + '/realms/zdslogic/protocol/openid-connect/token', params.toString(), { headers: headers })
			.subscribe(
				(data) => {
					this.saveToken(data);
					this._usersService.loginViaSSO();
				},
				error => alert(error + '\nInvalid Credentials')
			);
	}

	saveToken(token: any): void {
		const expireDate = new Date().getTime() + (1000 * token.expires_in);
		Cookie.set('access_token', token.access_token, expireDate, '/');
		//localStorage.setItem('accessToken', token);
		//this._angularLogService.log('AppService: Obtained Access token');
	}

	getResource(resourceUrl: any): Observable<any> {
		//const cookie = Cookie.get('access_token');
		const headers = new HttpHeaders(
			{
				'apikey': application.apiKey,
				'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
				'Access-Control-Allow-Origin': environment.originHeader,
				'Authorization': 'Bearer ' + Cookie.get('access_token')
			});
		return this._http.get(resourceUrl, { headers: headers });
		//                 .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	checkCredentials(): boolean {
		return Cookie.check('access_token');
	}

	checkTokenCerdentials(): Observable<boolean> {
		return interval(100).pipe(
			map(() => Cookie.check('access_token')),
			distinctUntilChanged()
		);
	}

	private createCompleteRoute = (route: string, envAddress: string): string => `${envAddress}/${route}`;

	private generateHeaders(): any {
		return {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-Type': 'application/json',
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
