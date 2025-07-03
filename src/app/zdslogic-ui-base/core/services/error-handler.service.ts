import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';

import * as AppUtils from '../../utils/app.utils';
//import { JwtService } from './jwt.service';
//import { ApiService } from './api.service';
//import { AccountEventsService } from './account.events.service';
import { environment } from '../../../../environments/environment';

//import { AngularLogService } from '../../core/services/angular-log.service';

@Injectable({
	providedIn: 'root'
})
export class ErrorHandlerService {
	public errorMessage = '';
	public dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	constructor(
		private _http: HttpClient,
		//private _apiService: ApiService,
		//private _jwtService: JwtService,
		//private _accountEventService: AccountEventsService,
		private _router: Router,
		private _dialog: MatDialog
	) {

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}

	public handleError(error: HttpErrorResponse): any {
		if (error.status === 500) {
			this.handle500Error(error);
		} else if (error.status === 404) {
			this.handle404Error(error);
		} else if (error.status === 403) {
			this.handle403Error(error);
		} else {
			this.handleOtherError(error);
		}
	}

	private handle500Error(error: HttpErrorResponse): any {
		this.createErrorMessage(error);
		this._router.navigate(['/500']);
	}

	private handle404Error(error: HttpErrorResponse): any {
		this.createErrorMessage(error);
		this._router.navigate(['/404']);
	}


	private handle403Error(error: HttpErrorResponse): any {
		if (error.error === 'No jwt cookie found') {
			this.errorMessage = 'No jwt cookie found';
			this._router.navigate(['/login']);
		} else if (error.error === 'The Json Web Token is expired') {
			this.errorMessage = 'The Json Web Token is expired';
			this._router.navigate(['/login']);
		} else if (error.error.includes('UserAlreadyExistException')) {
			this.errorMessage = 'User Already Exists!';
		} else {
			this.errorMessage = 'Unauthorized Request!';
		}

		this.dialogConfig.data = { 'errorMessage': this.errorMessage };
		this._dialog.open(ErrorDialogComponent, this.dialogConfig);
	}

	private handleOtherError(error: HttpErrorResponse): any {
		this.createErrorMessage(error);
		this.dialogConfig.data = { 'errorMessage': this.errorMessage };
		this._dialog.open(ErrorDialogComponent, this.dialogConfig);
	}

	private handleTextError(error: HttpErrorResponse): any {
		this.errorMessage = error.error;
		this.dialogConfig.data = { 'errorMessage': this.errorMessage };
		this._dialog.open(ErrorDialogComponent, this.dialogConfig);
		if ((this.errorMessage === 'No jwt cookie found') ||
			(this.errorMessage === 'The Json Web Token is expired')) {
			this._router.navigate(['/about']);
		}
	}

	private createErrorMessage(error: HttpErrorResponse): any {
		this.errorMessage = error.error ? error.error : error.message;
		// this.errorMessage = error.statusText;
	}

	private createCompleteRoute(route: string, envAddress: string): any {
		return `${envAddress}/${route}`;
	}
}
