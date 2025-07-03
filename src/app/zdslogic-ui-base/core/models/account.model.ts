import * as _ from 'lodash';
import { Authority } from './authority.model';

export class Account {
	id: number;
	contactId: string;
	login: string;
	userName: string;
	password: string;
	firstName: string;
	lastName: string;
	enabled: string;
	email: string;
	bio: string;
	image: string;
	isLoggedIn: string;
	authorities: Array<Authority>;
	authoritiesStringArray: Array<string>;
	authenticated = false;

	constructor(account?: {
		id: number,
		contactId: string,
		login: string,
		userName: string,
		password: string,
		firstName: string,
		lastName: string,
		enabled: string,
		email: string,
		bio: string,
		image: string,
		isLoggedIn: string,
		authorities: Array<string>
	}) {
		if (account) {
			_.assignIn(this, account);
			this.authenticated = false;
		}
	}
}
