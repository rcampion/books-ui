import { Subject, Observable } from 'rxjs';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AdminAuthGuard implements CanActivate, CanActivateChild {

    constructor(
		private _authenticationService: UsersService,
		private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        console.log('checking route access');
        if (this._authenticationService.verify() && this._authenticationService.isSuperAdmin()) {
            this._authenticationService.storeTeamsCookies();
            return true;
        } else if (this._authenticationService.verify()) {
            this._authenticationService.storeTeamsCookies();
            this._router.navigate(['/']);
        } else {
            console.log(state.url);
            this._authenticationService.redirectUrl = state.url;
            this._authenticationService.clearCookies();
            this._router.navigate(['login']);
            return false;
        }
    }

    canActivateChild(): any {
        console.log('checking child route access');
        return true;
    }

}
