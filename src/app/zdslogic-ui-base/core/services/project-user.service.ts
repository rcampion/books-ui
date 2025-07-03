//import { JDUser } from './user';
import { User } from './../models/user.model';
import { ToastrService } from './toastr.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ApiService } from './api.service';

@Injectable()
export class ProjectUserService {
	users: User[];
	user: User = new User();
	userChange: Subject<boolean> = new Subject<boolean>();
	constructor(
		private _http: HttpClient,
		private _apiService: ApiService,
		private _toastr: ToastrService) { }

	getTeamsUsers(): any {
		/*
				this._http.get<JDUser[]>(HttpService.getBaseURL() + '/manage/user/')
					.subscribe(resp => {
						this.users = resp;
						return this.users;
					}, (error) => {
						console.log(error);
					}, () => { console.log('Finish loading all users'); });
		*/

		this._apiService.getData('manage/user/').subscribe((resp) => {
			this.users = resp;
			return this.users;
		}, (error) => {
			console.log(error);
		}, () => { console.log('Finish loading all users'); });
	}

	getTeamsUser(id: number): any {
		/*
				this._http.get<JDUser>(HttpService.getBaseURL() + '/manage/user/' + id)
					.subscribe(resp => {
						this.user = resp;
						this.user.edit = false;
						this.userChange.next(true);
					}, (error) => {
						console.log(error);
					}, () => { console.log('Finish loading all user' + id); });
		*/
		this._apiService.getData('manage/user/' + id)
			.subscribe((resp) => {
				this.user = resp;
				this.user.edit = false;
				this.userChange.next(true);
			}, (error) => {
				console.log(error);
			}, () => { console.log('Finish loading all user' + id); });

	}

	searchUser(projectKey: string, q: string): any {
		//return this._http.get<JDUser[]>(HttpService.getBaseURL() + '/manage/user/search?project=' + projectKey + '&q=' + q);
		return this._apiService.getData('manage/user/search?project=' + projectKey + '&q=' + q);
	}

	createUser(user: User): any {
		/*		return this._http.post<any>(HttpService.getBaseURL() + '/manage/user/create', user, { observe: 'response' })
					.subscribe(resp => {
						if (resp.status === 200) {
							this._toastr.success('Success', 'User created');
							this.getUsers();
							this.user = resp.body;
							this.userChange.next(true);
						}
						return resp;
					}, (error) => {
						// tslint:disable-next-line:no-debugger
						debugger;
					});
		*/
		return this._apiService.post('/manage/user/create', user).subscribe((resp) => {
			if (resp.status === 200) {
				this._toastr.success('Success', 'User created');
				this.getTeamsUsers();
				this.user = resp.body;
				this.userChange.next(true);
			}
			return resp;
		}, (error) => {
			// tslint:disable-next-line:no-debugger
			debugger;
		});
	}

	save(user: User): any {
/*		return this._http.post<any>(HttpService.getBaseURL() + '/manage/user/save', user, { observe: 'response' })
			.subscribe(resp => {
				if (resp.status === 200) {
					this._toastr.success('Success', 'User saved');
					this.user = resp.body;
					this.userChange.next(true);
				}
				return resp;
			}, (error) => {
				// tslint:disable-next-line:no-debugger
				debugger;
			});
*/
		return this._apiService.post('/manage/user/save', user).subscribe((resp) => {
			if (resp.status === 200) {
				this._toastr.success('Success', 'User saved');
				this.user = resp.body;
				this.userChange.next(true);
			}
			return resp;
		}, (error) => {
			// tslint:disable-next-line:no-debugger
			debugger;
		});
	}

	closeUser(): void {
		this.user = undefined;
		this.userChange.next(true);
	}

	fetchUser(): any {
		return this.user;
	}

	slackEnabled(): any {
		//return this._http.get<any>(HttpService.getBaseURL() + '/manage/user/slackStatus');
		return this._apiService.getData('manage/user/slackStatus');

	}

	getSlackCandidates(): any {
		//return this._http.get<any[]>(HttpService.getBaseURL() + '/manage/user/slackImportCandidate');
		return this._apiService.getData('manage/user/slackImportCandidate');
	}

	getPendingUsers(): any {
		//return this._http.get<JDUser[]>(HttpService.getBaseURL() + '/manage/user/pending');
		return this._apiService.getData('manage/user/pending');
	}

	approvePendingUser(login: User): any {
		//return this._http.post<any>(HttpService.getBaseURL() + '/manage/user/pending/approve', login);
		return this._apiService.post('/manage/user/pending/approve', login);
	}

	rejectPendingUser(login: User): any {
		//return this._http.post<any>(HttpService.getBaseURL() + '/manage/user/pending/reject', login);
		return this._apiService.post('/manage/user/pending/reject', login);
	}

	importSlackUser(id: string): any {
		//return this._http.get<any>(HttpService.getBaseURL() + '/manage/user/slackImport?id=' + id);
		return this._apiService.getData('manage/user/slackImport?id=' + id);
	}

	getApiToken(user: User): any {
		return this._http.post<string>(HttpService.getBaseURL() + '/manage/user/getApiToken', user);
	}

	resetApiToken(user: User): any {
		return this._http.post<string>(HttpService.getBaseURL() + '/manage/user/resetApiToken', user);
	}

}
