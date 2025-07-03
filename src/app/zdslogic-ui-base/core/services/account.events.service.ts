import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { AngularLogService } from '../../core/services/angular-log.service';

@Injectable()
export class AccountEventsService extends Subject<any> {

	constructor() {
		super();
	}

	loginSuccess(account: any): any {
		if (account) {
			account.authenticated = true;
			super.next(account);
		}
	}

	logout(account: any): any {
		if (account) {
			account.authenticated = false;
			super.next(account);
		}
	}
}
