//import { lastValueFrom } from 'rxjs';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { ContactsService } from 'app/zdslogic-ui-plugins/contacts/core/services/contacts.service';
import { Contact } from 'app/zdslogic-ui-plugins/contacts/core/interfaces/contact.model';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Injectable()
export class IsUserRouteGuard implements CanActivate {

	currentContact: Contact;
	currentUser: User;
	isUser: boolean;
	isAuthorized: boolean;
	responseData: any;

	constructor(private _angularLogService: AngularLogService,
		private _router: Router,
		private _usersService: UsersService,
		private _contactsService: ContactsService,
		private _activeRoute: ActivatedRoute,
	) { }

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		this.isAuthorized = this._usersService.isUserAuthorized(['ROLE_ADMIN']);
		if (this._usersService.isUserAuthorized(['ROLE_ADMIN'])) {
			return true;
		}
		this.currentUser = this._usersService.getCurrentUser();
		this.currentContact = await this.getCurrentUserInformation(state);
		this.isUser = (this.currentUser.userName === this.currentContact.userName);
		if (!this.isUser) {
			this._router.navigate(['/contacts'], {
				queryParams: {
					return: state.url
				}
			});
		}
		return this.isUser;
	}

	public getCurrentUserInformation(state: RouterStateSnapshot): Promise<any> {
		const id = state.url.substring(state.url.lastIndexOf('/') + 1);
		const apiUrl = `contacts/${id}`;
		return this._contactsService.getData(apiUrl).toPromise();
		/*
				let promise = new Promise<void>((resolve, reject) => {
					const id = state.url.substring(state.url.lastIndexOf('/') + 1);
					this.isUser = false;
					//const id: string = this._activeRoute.snapshot.params['id'];
					const apiUrl = `contacts/${id}`;
					this._contactsService.getData(apiUrl)
						.toPromise()
						.then(
							res => { // Success
								//console.log(res);
								this.currentContact = res as Contact;

								this.isUser = (this.currentUser.userName === this.currentContact.userName);

								resolve();

							}
						);
				});
				return promise;
		*/
	}
	/*
		public getCurrentUserInformation(state: RouterStateSnapshot): Promise<any> {
			const id = state.url.substring(state.url.lastIndexOf('/') + 1);
			this.isUser = false;
			//const id: string = this._activeRoute.snapshot.params['id'];
			const apiUrl = `contacts/${id}`;

			this._contactsService.getData(apiUrl)
				.subscribe((res) => {
					this.currentContact = res as Contact;

					this.currentUser = this._usersService.getCurrentUser();

					this.isUser = (this.currentUser.userName === this.currentContact.userName);
					if (this._usersService.isUserAuthorized(['ROLE_ADMIN'])) {
						this.isUser = true;
						let promise = new Promise((resolve, reject) => {
							this.isUser = true;
						});
						return promise;
						////console.log("false");
					}
					if (this.isUser) {
						let promise = new Promise((resolve, reject) => {
							this.isUser = true;
						});
						return promise;
					} else {
						this._router.navigate(['/contacts/contacts'], {
							queryParams: {
								return: state.url
							}
						});
					}
					let promise = new Promise((resolve, reject) => {
						this.isUser = true;
					});
					return promise;
				})


		}
	*/
}
