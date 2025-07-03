import { Injectable } from '@angular/core';

import * as AppUtils from './../../utils/app.utils';

@Injectable()
export class JwtService {

	getToken(): string {
		// return window.localStorage['jwtToken'];
		return window.localStorage[AppUtils.STORAGE_ACCOUNT_TOKEN];

	}

	saveToken(token: string): void {
		// window.localStorage['jwtToken'] = token;
		window.localStorage[AppUtils.STORAGE_ACCOUNT_TOKEN] = token;

	}

	destroyToken(): void {
		// window.localStorage.removeItem('jwtToken');
		window.localStorage.removeItem(AppUtils.STORAGE_ACCOUNT_TOKEN);

	}

}
