//import { AuthenticationTeamsService } from './../services/authentication-teams.service';
import { UsersService } from '../services/users.service';

import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';

import { Cookie } from 'ng2-cookies';
import { application } from '../../../../../application';
import { environment } from '../../../../environments/environment';

@Injectable()
export class HTTPStatus {
	private requestInFlight$: BehaviorSubject<boolean>;
	constructor() {
		this.requestInFlight$ = new BehaviorSubject(false);
	}

	setHttpStatus(inFlight: boolean): void {
		this.requestInFlight$.next(inFlight);
	}

	getHttpStatus(): Observable<boolean> {
		return this.requestInFlight$.asObservable();
	}
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(
		private _authenticationService: UsersService,
		private status: HTTPStatus) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const deviceInfo = localStorage.getItem('JD-D');
		if (!deviceInfo || deviceInfo === null || deviceInfo === 'null') {
			this._authenticationService.getFingerPrint();
		}
		if (this._authenticationService && this._authenticationService.getToken()) {
			if (request.url.indexOf('attach') <= 0) {
				request = request.clone({
					setHeaders: {
						'apikey': application.apiKey,
						'Access-Control-Allow-Origin': environment.originHeader,
						'Access-Control-Allow-Credentials': 'true',
						'Authorization': 'Bearer ' + Cookie.get('access_token'),
						'X-AUTH-TOKEN': this._authenticationService.getToken(),
						'X-TZ': Intl.DateTimeFormat().resolvedOptions().timeZone,
						'X-JD-D': deviceInfo,
						'Content-Type': 'application/json',
					}
				});
			} else {
				request = request.clone({
					setHeaders: {
						'apikey': application.apiKey,
						'Access-Control-Allow-Origin': environment.originHeader,
						'Access-Control-Allow-Credentials': 'true',
						'Authorization': 'Bearer ' + Cookie.get('access_token'),
						'X-AUTH-TOKEN': this._authenticationService.getToken(),
						'X-TZ': Intl.DateTimeFormat().resolvedOptions().timeZone,
						'X-JD-D': deviceInfo,
					}
				});
			}
		} else {
			request = request.clone({
				setHeaders: {
					'apikey': application.apiKey,
					'Access-Control-Allow-Origin': environment.originHeader,
					'Access-Control-Allow-Credentials': 'true',
					'Authorization': 'Bearer ' + Cookie.get('access_token'),
					'X-TZ': Intl.DateTimeFormat().resolvedOptions().timeZone,
					'X-JD-D': deviceInfo,
				}
			});
		}
		this.status.setHttpStatus(true);
		return next.handle(request)
			.pipe(takeUntil(this._authenticationService.onCancelPendingRequests()))
			.pipe(
				map((event) => {
					return event;
				}),
				catchError((error) => {
					return throwError(error);
				}),
				finalize(() => {
					this.status.setHttpStatus(false);
				})
			);
	}
}
