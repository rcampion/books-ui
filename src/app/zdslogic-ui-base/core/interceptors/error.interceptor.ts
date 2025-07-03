import { ToastrService } from './../services/toastr.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

//import { AuthenticationTeamsService } from './../services/authentication-teams.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(
		private _authenticationService: UsersService,
		private _router: Router,
		private _toastr: ToastrService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(tap((event) => {
			this._authenticationService.authError = false;
			this._authenticationService.connectivityError = false;
		}, (error) =>{
			if (error instanceof HttpErrorResponse && error.status === 401) {
				// handle 401 errors
				//this._toastr.error('Connection Failure', 'Authentication Failure');
				this._authenticationService.authError = true;
				this._authenticationService.logoutSubject.next(new Date().getTime());
				// this._route.snapshot.
				this._authenticationService.redirectUrl = this._router.url;
				this._authenticationService.logout();
			} else if (error instanceof HttpErrorResponse && error.status === 403) {
				// If 403 for My account, then incorrect authentication - force
				if (error.error.path === '/my/') {
					console.error('received 403. redirecting to login');
					this._authenticationService.logout();
				}
			} else if (error instanceof HttpErrorResponse && error.status === 404) {
				// If 404 for Invalid TRequest
				if (error.error.message === 'Invalid Tenant') {
					//this._authenticationService.logout();
					this._router.navigateByUrl('/login?error=InvalidTenant');
				}
			} else if (error instanceof HttpErrorResponse && (error.status === 0 || error.status === 502 || error.status === 503 || error.status === 504)) {
				this._authenticationService.connectivityError = true;
				// this._router.navigate(['login']);
			} else if (error.error && error.error.error) {
				if (error.error.errors && error.error.errors.length > 0) {
					this._toastr.error('Error', error.error.errors);
				} else {
					this._toastr.error('Error', error.error.error);
				}

			}
		}));
	}
}
