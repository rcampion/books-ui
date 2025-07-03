import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { UsersService } from '../services/users.service';
import { AngularLogService } from '../../core/services/angular-log.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private _router: Router,
		private _usersService: UsersService
	) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {

		return this._usersService.isUserAuthenticatedWithToken();

	}

}
