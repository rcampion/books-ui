import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';
import { Observable, of, finalize, throwError, interval } from 'rxjs';

import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PaginationPropertySort } from '../interfaces/pagination';
import { map, catchError } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { User } from './../models/user.model';
import { Account } from './../models/account.model';

import { DeviceDetectorService } from 'ngx-device-detector';

import { JwtService } from './jwt.service';
import { ApiService } from './api.service';

import { ErrorService } from './error.service';
import { ErrorHandlerService } from './error-handler.service';

import { AccountEventsService } from './account.events.service';
import { SecurityToken } from '../models/security-token.model';
import { Authority } from '../models/authority.model';
import * as AppUtils from '../../utils/app.utils';

import { DataSharingService } from '../../core/services/datasharing.service';

import jwt_decode from 'jwt-decode';

import { AngularLogService } from '../../core/services/angular-log.service';

import { CookieService } from 'ngx-cookie-service';
import { AppMessage } from '../models/appmessage.model';

import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from '../models/subscription.model';
import { SubscriptionMember } from '../models/subscription-member.model';
import { application } from '../../../../../application';
//import { AuthenticationTeamsService } from './authentication-teams.service';

//teams
import { HttpService } from './http.service';
import { MyAccountService } from './myaccountservice.service';
import { Project } from './../models/project.model';
//import { JDUser } from './../models/user';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	public clientId = 'newClient';
	public redirectUri = environment.redirectUri;

	public account: Account = new Account();

	//private user: User = new User();
	public isUserAuthenticatedSubject = new ReplaySubject<boolean>(1);
	public isUserSubscribedSubject = new BehaviorSubject<boolean>(false);
	public isUserAuthenticated = this.isUserAuthenticatedSubject.asObservable();
	public isUserSubscribed = this.isUserSubscribedSubject.asObservable();

	//public loading$ = this.loadingSubject.asObservable();

	public error: string = '';
	public subscription: Subscription = new Subscription();
	public currentUser: User = new User();
	public currentTeamsUser: User = new User();
	public subscriptionMember: SubscriptionMember;

	//teams

	public connectivityError = false;
	public authError = false;
	public logoutSubject = new Subject<number>();
	public redirectUrl = '/projects/home';
	public loading = false;
	public projects: Project[];
	//public currentTeamsUser: JDUser;
	public decodedToken: any;
	public authChange = new Subject<number>();
	public canCreate = false;

	private cancelPendingRequests$ = new Subject<void>();
	private loadingSubject = new BehaviorSubject<boolean>(false);

	constructor(
		private _angularLogService: AngularLogService,
		private _http: HttpClient,
		private _jwtService: JwtService,
		private _errorService: ErrorService,
		private _errorHandlerService: ErrorHandlerService,
		private _accountEventService: AccountEventsService,
		private _dataSharingService: DataSharingService,
		private _router: Router,
		private _subscriptionsService: SubscriptionsService,
		private _deviceService: DeviceDetectorService,
		private _cookieService: CookieService,
		public _myAccountService: MyAccountService

	) { }

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

	public send(route: string, formData: any): any {
		const headers = new HttpHeaders(
			{
				//'Content-Type': 'multipart/form-data',
				//'Accept': 'application/json'
				'Access-Control-Allow-Credentials': 'true',
				'Authorization': 'Bearer ' + Cookie.get('access_token')
			}
		);
		return this._http.post<any>(this.createCompleteRoute(route, environment.apiUrl), formData, {
			headers: headers
		});
	}

	public sendMessage(route: string, message: AppMessage): any {
		const json = JSON.stringify(message);
		return this._http.post<any>(this.createCompleteRoute(route, environment.apiUrl), json,
			this.generateHeaders());
	}

	public getSetupStatus(): any {
		return this._http.get<any>(HttpService.getBaseURL() + '/auth/setup');
	}

	public setup(data: any): any {
		return this._http.post<any>(HttpService.getBaseURL() + '/auth/setup', data);
	}

	public findUsersWithSortAndFilter(

		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {
		let apiUrl = this.createCompleteRoute('users', environment.apiUrl);
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
			apiUrl = this.createCompleteRoute('users/search', environment.apiUrl);

			const userName = '\'*' + filter + '*\'';
			const firstName = '\'*' + filter + '*\'';
			const lastName = '\'*' + filter + '*\'';

			search = 'userName==' + userName + ' or ' + 'firstName==' + firstName + ' or ' + 'lastName==' + lastName;

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
			map(result => result),
			catchError((error) => {
				this._errorHandlerService.handleError(error);
				return throwError(error.statusText);
			})

		);
	}

	public findUserSubscription(): any {
		//sortProperty: string,
		//sortDirection: string,

		const filter = 'ZdsLogic Developer Network';
		const sort = new PaginationPropertySort();
		sort.property = 'description';
		sort.direction = 'asc';
		const pageNumber = 0;
		const pageSize = 3;
		const pageIndex = 0;

		this._subscriptionsService.findSubscriptionsWithSortAndFilter(
			filter,
			sort,
			pageIndex,
			pageSize).pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe((response) => {

				this.subscription = response.content[0];

				///api/subscription/member
				this.currentUser = this.getCurrentUser();
				const subscriptionId = this.subscription.id;
				const userId = this.currentUser.id;
				const apiUrl = `subscription/member/${subscriptionId}/${userId}`;
				this.getData(apiUrl)
					.subscribe((result: any) => {
						this.subscriptionMember = result as SubscriptionMember;
						if (this.subscriptionMember) {
							this.isUserSubscribedSubject.next(true);
							this._dataSharingService.isUserSubscribed.next(true);
						} else {
							this.isUserSubscribedSubject.next(false);
							this._dataSharingService.isUserSubscribed.next(false);
						}
					},
						(error) => {
							this._errorHandlerService.handleError(error);
						});
			}
			);
	}

	public findActiveUsers(
		filter = '',
		sort: PaginationPropertySort,
		pageNumber = 0,
		pageSize = 3): Observable<any> {

		let apiUrl = this.createCompleteRoute('users/active', environment.apiUrl);
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
			apiUrl = this.createCompleteRoute('users/search', environment.apiUrl);

			search = 'userName==' + filter + '* or ' + 'firstName==' + filter + '* or ' + 'lastName==' + filter + '*';
		}
		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Access-Control-Allow-Origin': environment.originHeader,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
				}),
			params: new HttpParams()

				.set('search', search)
				.set('sort', sortTest)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())

		}).pipe(
			map(result => result),
			catchError((error) => {
				this._errorHandlerService.handleError(error);
				return throwError(error.statusText);
			})

		);
	}

	public changePassword(userName: string, password: string): Observable<User> {

		const headers = new HttpHeaders(
			{
				'apikey': application.apiKey,
				'Access-Control-Allow-Origin': environment.originHeader,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			}
		);

		const route = 'users/password';
		return this._http.post(this.createCompleteRoute(route, environment.apiUrl),
			JSON.stringify({ login: userName, password: password }), {
			headers: headers,
			observe: 'response'
		})

			.pipe(
				catchError((error: any) => {
					if (error.status === 401) {
						return throwError(
							'Unauthorized');
					} else {
						if (error.status === 403) {
							return throwError(
								'Unauthorized');
						} else {
							return throwError(
								'Unknown');
						}
					}
					// do any other checking for statuses here
				}),

				map((result: any) => {
					this.currentUser = result;
					return this.currentUser;
				})

			);
	}

	public getCurrentUser(): User {
		/*
				try {
					this.getUser()
						.subscribe((resp) => {
							this.currentUser = resp;
							this.setZdsAuth(this.currentUser);
							this._dataSharingService.isUserLoggedIn.next(true);
							if (this.isUserAuthorized(['ROLE_ADMIN'])) {
								this._dataSharingService.isUserAuthorized.next(true);
							}
						},
							error => this.error = error
						); // Reach here if fails;

				} catch (e) {
					this._angularLogService.log(e);
				}
		*/
		this.getUserDetails();
		return this._dataSharingService.currentUser.value;
	}

	public  getUserDetails(): any {
		const id: number = this.currentUser.id;
		const apiUrl = `users/${id}`;

		this.getData(apiUrl)
			.subscribe((result: any) => {
				this.currentUser = result as User;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	public sendLoginSuccess(account?: Account): void {
		if (!account) {
			account = new Account(JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN)));
		}
		this._accountEventService.loginSuccess(account);
	}

	public getUserViaSSO(): void {

		try {
			this.getUser()
				.subscribe((resp) => {
					this.currentUser = resp;
					this.setZdsAuth(this.currentUser);
					this._dataSharingService.isUserLoggedIn.next(true);
					if (this.isUserAuthorized(['ROLE_ADMIN'])) {
						this._dataSharingService.isUserAuthorized.next(true);
					}
				},
					error => this.error = error
				); // Reach here if fails;

		} catch (e) {
			this._angularLogService.log(e);
		}
	}

	public getUser(): Observable<User> {
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
		const route = 'sso/getuser';

		const deviceInfo = localStorage.getItem('JD-D');
		if (!deviceInfo || deviceInfo === null || deviceInfo === 'null') {
			this.getFingerPrint();
		}
		const l: any = {};
		//l.username = username;
		//l.password = password;
		//l.mode = mode;
		//l.remember = mode;
		l.deviceFp = localStorage.getItem('JD-D');
		l.deviceInfo = btoa(JSON.stringify(this._deviceService.getDeviceInfo()));
		return this._http.post(this.createCompleteRoute(route, environment.apiUrl), l,
			{
				headers: headers,
				observe: 'response'
			})

			.pipe(

				catchError((error: any) => {
					if (error.status === 401) {
						this._errorService.changeMessage('Unauthorized request! Username/Password is invalid.');
						return throwError(
							'Unauthorized, Username / Password are invalid.');
					} else {
						if (error.status === 403) {
							this._errorService.changeMessage('Unauthorized request!');
							return throwError(
								'Unauthorized');

						} else {
							this._errorService.changeMessage(error.message);
							return throwError(
								'Unknown');
						}
					}
					// do any other checking for statuses here
				}),

				map((resp: any) => {

					if (resp.status === 200 && resp.body.success) {

						//localStorage.setItem(AppUtils.STORAGE_ACCOUNT_TOKEN, JSON.stringify(resp.body.zdsuser));
						const zdsuser = JSON.parse(resp.body.zdsuser);
						this.account = new Account(zdsuser);
						this.account.authenticated = true;
						this.sendLoginSuccess(this.account);
						this._errorService.changeMessage('');
						this.setZdsAuth(zdsuser);
						this.currentUser = zdsuser;
						return this.currentUser;
					}
				})
			);
	}

	public login(): Observable<User> {

		const deviceInfo = localStorage.getItem('JD-D');
		if (!deviceInfo || deviceInfo === null || deviceInfo === 'null') {
			this.getFingerPrint();
		}

		const l: any = {};
		//l.username = username;
		//l.password = password;
		//l.mode = mode;
		//l.remember = mode;
		l.deviceFp = localStorage.getItem('JD-D');
		l.deviceInfo = btoa(JSON.stringify(this._deviceService.getDeviceInfo()));

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
		const route = 'sso/login';
		return this._http.post(this.createCompleteRoute(route, environment.apiUrl), l,
			{
				headers: headers,
				observe: 'response'
			})

			.pipe(

				catchError((error: any) => {
					if (error.status === 401) {
						this._errorService.changeMessage('Unauthorized request! Username/Password is invalid.');
						return throwError(
							'Unauthorized, Username / Password are invalid.');
					} else {
						if (error.status === 403) {
							this._errorService.changeMessage('Unauthorized request!');
							return throwError(
								'Unauthorized');

						} else {
							this._errorService.changeMessage(error.message);
							return throwError(
								'Unknown');
						}
					}
					// do any other checking for statuses here
				}),


				map((resp: any) => {

					if (resp.status === 200 && resp.body.success) {

						const zdsuser = JSON.parse(resp.body.zdsuser);

						//localStorage.setItem(AppUtils.STORAGE_ACCOUNT_TOKEN, JSON.stringify(zdsuser));

						this.account = new Account(zdsuser);
						this.account.authenticated = true;
						this.sendLoginSuccess(this.account);

						this._errorService.changeMessage('');
						this.setZdsAuth(zdsuser);
						this.currentUser = zdsuser;

						//const teamuser = JSON.parse(resp.body.teamuser);
						const teamtoken = resp.headers.get('X-AUTH-TOKEN');

						localStorage.setItem('JD-T', teamtoken);

						this.getTeamsUser();
						this.storeTeamsCookies();
						return resp.body;
					} else {
						this.purgeZdsAuth();
					}
				})
			);
	}

	public loginViaSSO(): any {

		try {
			this.login()
				.subscribe((resp) => {

					this.account = new Account();

					const userString =
						this.currentUser.firstName
						+ ' '
						+ this.currentUser.lastName;

					const logMessage = 'UsersService:'
						+ userString
						+ ' Successfully logged in.';

					this._angularLogService.log(logMessage);

					this.account.authenticated = true;
					this._dataSharingService.isUserLoggedIn.next(true);
					if (this.isUserAuthorized(['ROLE_ADMIN'])) {
						this._dataSharingService.isUserAuthorized.next(true);
					}
				},
					error => this.error = error); // Reach here if fails;

		} catch (e) {
			this._angularLogService.log(e);
		}
	}


	public logout(callServer: boolean = true): void {

		this._dataSharingService.isUserLoggedIn.next(false);

		const userString =
			this.currentUser.firstName
			+ ' '
			+ this.currentUser.lastName;

		const logMessage = 'UsersService:'
			+ userString
			+ ' Logged Out.';

		this._angularLogService.log(logMessage);

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
		if (callServer) {
			const route = 'sso/logout';
			this._http.get(this.createCompleteRoute(route, environment.apiUrl), {
				headers: headers,
				observe: 'response'
			}).subscribe((s) => {
				this._accountEventService.logout(new Account(JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN))));
				this.removeAccount();
				this.purgeZdsAuth();
				this._dataSharingService.isUserLoggedIn.next(false);
				this._dataSharingService.isUserAuthorized.next(false);
				this._dataSharingService.isActiveContactsReady.next(false);

				this._router.navigate(['/home']);

			});
		} else {
			this._accountEventService.logout(new Account(JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN))));
			this.removeAccount();
			this.purgeZdsAuth();
			this._dataSharingService.isUserLoggedIn.next(false);
			this._dataSharingService.isUserAuthorized.next(false);
			this._dataSharingService.isActiveContactsReady.next(false);
		}
	}

	public getUserId(): any {

		//return +this.user.id;

		return this.currentUser.id;

	}

	public isUserAuthenticatedWithToken(): boolean {

		const value = Cookie.get('access_token');

		if (value) {
			return true;
		}
		else {
			return false;
		}
	}

	public isUserSubscribedTest(): boolean {

		const value = this.isUserSubscribedSubject.getValue();

		if (value) {
			return true;
		}
		else {
			return false;
		}
	}

	public isUserAuthorized(roles: Array<string>): boolean {

		let authorized = false;
		const authorities: Array<string> = [];

		if (!this.isUserAuthenticatedWithToken()) {
			return false;
		}

		if (this.isUserAuthenticatedWithToken() && roles) {
			const account: Account = new Account(JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN)));
			if (account && account.authorities) {

				for (const authority of account.authorities) {
					const obj: Authority = authority;
					authorities.push(obj.authority);
				}

				account.authoritiesStringArray = authorities;
				roles.forEach((role: string) => {
					if (authorities.indexOf(role) !== -1) {
						authorized = true;
					}
				});
			}
		}
		return authorized;
	}

	public isUserAuthorized$(roles: Array<string>): Observable<boolean> {

		let authorized = false;
		const authorities: Array<string> = [];

		return interval(100).pipe(
			map(() => Cookie.check('access_token')),
			map((token) => {
				if (!token) {
					return false;
				}

				if (token && roles) {
					const account: Account = new Account(JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN)));
					if (account && account.authorities) {
						for (const authority of account.authorities) {
							const obj: Authority = authority;
							authorities.push(obj.authority);
						}

						account.authoritiesStringArray = authorities;
						roles.forEach((role: string) => {
							if (authorities.indexOf(role) !== -1) {
								authorized = true;
							}
						});
					}
				}
				return authorized;
			}),
			distinctUntilChanged()
		);

	}

	public setZdsAuth(user: User): void {
		// Save JWT sent from server in localstorage
		this._jwtService.saveToken(JSON.stringify(user));

		// Set current user data into observable
		this._dataSharingService.currentUser.next(user);

		// Set isUserAuthenticated to true
		this.isUserAuthenticatedSubject.next(true);

		this.findUserSubscription();
	}

	public purgeZdsAuth(): void {
		// Remove JWT from localstorage
		this._jwtService.destroyToken();

		//delete SSO token
		Cookie.delete('access_token', '/');
		let cookie = Cookie.get('KC_REDIRECT');
		Cookie.delete('KC_REDIRECT', '/');
		cookie = Cookie.get('OAuth_Token_Request_State');
		Cookie.delete('OAuth_Token_Request_State', '/');

		localStorage.removeItem('JD-D');
		localStorage.removeItem('JD-T');

		this.clearCookies();

		// Set auth status to false
		this.isUserAuthenticatedSubject.next(false);

		this._dataSharingService.currentUser.next(null);
	}

	public removeAccount(): void {
		localStorage.removeItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
	}

	public getDecodedAccessToken(token: string): any {
		try {
			return jwt_decode(token);
		}
		catch (Error) {
			return null;
		}
	}

	//teams

	public cancelPendingRequests(): void {
		this.cancelPendingRequests$.next();
	}

	public onCancelPendingRequests(): any {
		return this.cancelPendingRequests$.asObservable();
	}

	public checkUser(username: string, mode: string): any {
		const l: any = {};
		l.username = username;
		l.mode = mode;
		return this._http.post<any>(HttpService.getBaseURL() + '/auth/checkUser', l);
	}

	public getFingerPrint(): void {
		const deviceInfo = this._deviceService.getDeviceInfo();
		localStorage.setItem('JD-D', btoa(deviceInfo.browser + '-' + deviceInfo.device + '-' + deviceInfo.os + '-' + deviceInfo.os_version));
	}
	/*
		login(
			username: string,
			password: string,
			mode: string): any {
			const deviceInfo = localStorage.getItem('JD-D');
			if (!deviceInfo || deviceInfo === null || deviceInfo === 'null') {
				this.getFingerPrint();
			}
			const l: any = {};
			l.username = username;
			l.password = password;
			//l.mode = mode;
			l.remember = mode;
			l.deviceFp = localStorage.getItem('JD-D');
			l.deviceInfo = btoa(JSON.stringify(this._deviceService.getDeviceInfo()));
			return this._http.post<any>(HttpService.getBaseURL() + '/auth/login', l,
				{ observe: 'response' })
				.pipe(map((resp) => {
					if (resp.status === 200 && resp.body.success) {
						const token = resp.headers.get('X-AUTH-TOKEN');
						localStorage.setItem('JD-T', token);
						this.getUser();
						this.storeAuthCookies();
						return resp.body;
					} else {
						localStorage.removeItem('JD-T');
					}
					return resp.body;
				})).pipe(catchError((e) => {
					console.log(e);
					return e;
				}));
		}
	*/

	public storeTeamsCookies(): void {
		const token = localStorage.getItem('JD-T');
		if (token) {
			this._cookieService.set('jdt', token, 1, '/', null, true, 'None');
			//this._cookieService.set('jdt', token.substr(0, token.length / 2), 365, '/');
			//this._cookieService.set('jdx', token.substr(token.length / 2, token.length), 365, '/');
			this._cookieService.set('jdd', localStorage.getItem('JD-D'), 1, '/', null, true, 'None');
			//console.log(this._cookieService.getAll());
		} else {
			this.logout();
		}
	}

	public clearCookies(): void {
		this._cookieService.deleteAll();
	}

	public getTeamsUser(): void {
		if (localStorage.getItem('JD-T')) {
			const helper = new JwtHelperService();
			const myRawToken = localStorage.getItem('JD-T');
			this.decodedToken = helper.decodeToken(myRawToken);
			const isExpired = helper.isTokenExpired(myRawToken);
			if (isExpired) {
				this.logout();
				alert('Session Expired');
			}
			this.currentTeamsUser = JSON.parse(this.decodedToken.user);
			this.projects = this.getProjects();
			this.canCreate = this.hasAuthority('ISSUE_CREATE');
		}
	}

	public getTeamsUserTimezone(): any {
		if (!this.currentTeamsUser) {
			this.getTeamsUser();
		}
		return this.currentTeamsUser ? this.currentTeamsUser.timezone : '';
	}

	public getProjects(): any {
		if (!this.currentTeamsUser) {
			this.getTeamsUser();
		}
		return this.decodedToken ? JSON.parse(this.decodedToken.accpr) : null;
	}

	public isSuperAdmin(): boolean {
		if (!this.currentTeamsUser) {
			this.getTeamsUser();
		}
		return this.currentTeamsUser ? this.currentTeamsUser.superAdmin : false;
	}

	public hasAuthority(code: string): any {
		if (this.hasGlobal(code)) {
			return true;
		}
		let hasAuthority = false;
		this.projects.forEach((p) => {
			if (p.authorities.includes(code)) {
				hasAuthority = true;
			}
		});
		return hasAuthority;
	}

	public hasGlobal(code: string): any {
		if (!this.currentTeamsUser) {
			this.getTeamsUser();
		}
		if (!this.decodedToken) {
			return false;
		} else {
			if (this.decodedToken.admin) {
				return true;
			}
			const g: string[] = this.decodedToken.g;
			return g.includes(code);
		}
	}

	public getToken(): any {
		if (!localStorage.getItem('JD-T')) {
			return '';
		}
		return localStorage.getItem('JD-T');
	}

	public retry(): void {
		this.getTeamsUserDetails().subscribe((resp) => {
			//if has response
			window.location.reload();
		});
	}

	public getCurrentTeamsUser(): any {
		if (!this.currentTeamsUser) {
			this.getTeamsUser();
		}
		return this.currentTeamsUser;
	}

	public getTeamsUserDetails(): any {
		if (!this.isLoggedIn()) {
			this.logout();
		}
		this.getFingerPrint();
		return this._http.get<any>(HttpService.getBaseURL() + '/auth/verify?tz=' + Intl.DateTimeFormat().resolvedOptions().timeZone, { observe: 'response' });
	}

	public forgot(email: string, token: string, password: string, confirmPassword: string): any {
		return this._http.post<any>(HttpService.getBaseURL() + '/auth/forgot', { username: email, token: token, password: password, confirmPassword: confirmPassword });
	}

	public register(): any {
		return this._http.get<any>(HttpService.getBaseURL() + '/auth/register');
	}

	public registerUser(data: any): any {
		return this._http.post<any>(HttpService.getBaseURL() + '/auth/register', data);
	}

	public isLoggedIn(): any {
		if (!this.currentTeamsUser) {
			this.getTeamsUser();
		}
		return this.currentTeamsUser != null;
	}

	public verify(): any {
		return this.isLoggedIn();
	}
	/*
		logout(): void {
			this.cancelPendingRequests();
			this.logoutSubject.next(new Date().getTime());
			this.clearCookies();
			localStorage.clear();
			this._http.get<any>(HttpService.getBaseURL() + '/auth/logout', { observe: 'response' })
				.pipe(map((resp) => {
					this._router.navigate(['login']);
				})).subscribe((resp) => {
					// logout success, do nothing
				}, (error) => {
					this._router.navigate(['login']);
				});
		}
	*/

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
					'Authorization': 'Bearer ' + Cookie.get('access_token')
				})
		};
	}
}

export class Login {
	public username: string = '';
	public password: string = '';
	public deviceInfo: string = '';
}
