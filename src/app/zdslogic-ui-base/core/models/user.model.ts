import * as _ from 'lodash';
import { GeoIP } from './geo.model';
import { Authority } from './authority.model';

export class User {
	id: number;
	contactId: number;
	login: string;
	userName: string;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	emailPassword: string;
	emailPop3Host: string;
	emailPop3Port: string;
	osUserName: string;
	osPassword: string;
	presenceStatus: number;
	presenceImageUrl: string;
	currentRoom: string;
	enabled: string;
	ext: string;
	bio: string;
	image: string;
	isLoggedIn: string;
	apiKey: string;
	createdAt: string;
	updatedAt: string;
	loginAt: string;
	ipAddress: string;
	geoIP: GeoIP;
	location: string;

	//from Teams
	//public id: number;
	//public userName: string;
	public fullName: string;
	//public email: string;
	public superAdmin: boolean;
	public timezone: string;
	public language: string;
	//public createdAt: Date;
	//public updatedAt: Date;
	public active: boolean;
	public editable: boolean;
	public slackEnabled: boolean;
	public slackAvailable: boolean;
	public locked: boolean;
	public pic: string;
	public emailNotification: boolean;
	public slackNotification: boolean;
	public lockReason: string;
	public apiEnabled: boolean;
	public apiToken: string;
	public qrUrl: string;
	public mfaEnabled: boolean;
	public preferredAuth: string;
	public edit: boolean;;

	/*
		constructor(private edit = false) {
			this.apiToken = undefined;
		}

			constructor(user?: {
				id: number,
				contactId: number,
				login: string,
				userName: string,
				password: string,
				firstName: string,
				lastName: string,
				presenceStatus: string,
				presenceImageUrl: string,
				currentRoom: string,
				enabled: string,
				email: string,
				ext: string,
				bio: string,
				image: string,
				isLoggedIn: string,
				apiKey: string,
				createdAt: string,
				updatedAt: string,
				loginAt: string,
				ipAddress: string,
				geoIP: GeoIP
			}) {
				if (user) {
					_.assignIn(this, user);
					// this.authenticated = false;
				}
			}*/
}

export class Token {
	public id: number;
	public token: string;
	public created: Date;
	public lastAccess: Date;
	public deviceInfo: string;
	public current: boolean;
	public device: {};

}
