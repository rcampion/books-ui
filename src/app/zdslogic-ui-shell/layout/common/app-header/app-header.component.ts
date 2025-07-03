import { Component, OnInit, AfterViewInit, OnDestroy, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { Cookie } from 'ng2-cookies';

import { AlertService } from 'app/zdslogic-ui-base/alert/alert.service';
import { AppMessage } from 'app/zdslogic-ui-base/core/models/appmessage.model';
import { AppService } from 'app/zdslogic-ui-base/core/services/app.service';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { PresenceService } from 'app/zdslogic-ui-base/core/services/presence.service';
import { ProfileEntity } from 'app/zdslogic-ui-base/core/models/profile-entity.model';
import { ProfileEntityService } from 'app/zdslogic-ui-base/core/services/profile-entity.service';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';

import { SocketClientSixService } from 'app/zdslogic-ui-base/core/services/socket-client-six.service';
import { SocketClientSevenService } from 'app/zdslogic-ui-base/core/services/socket-client-seven.service';
import { SocketClientNineService } from 'app/zdslogic-ui-base/core/services/socket-client-nine.service';

//import { OpenfireAdapter } from '../../../common/core/services/openfire-adapter';
//import { ActiveFriendsService } from '../../../common/core/services/active-friends.service';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { ErrorService } from 'app/zdslogic-ui-base/core/services/error.service';

import { application } from '../../../../../../application';
import { environment } from '.././../../../../environments/environment';

export interface PresenceType {
	value: number;
	viewValue: string;
}

@Component({
	selector: 'app-header',
	providers: [AppService],
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
	presenceTypes: PresenceType[] = [
		{ value: 0, viewValue: 'Online' },
		{ value: 1, viewValue: 'Offline' },
		{ value: 2, viewValue: 'Busy' },
		{ value: 3, viewValue: 'Away' },
		{ value: 4, viewValue: 'In a Meeting' }
	];

	//public clientId = 'newClient';
	//public redirectUri = environment.redirectUri;

	sessionUser: User;
	currentUser: User;
	userId;

	public headerForm: UntypedFormGroup;

	//@ViewChildren('ngChatInstance') public ngChatInstance: QueryList<IChatController>;

	options = {
		autoClose: false,
		keepAfterRouteChange: false
	};

	title = 'Messaging';
	isCollapsed = true;
	historyEnabled = true;
	browserNotificationsEnabled = false;
	theme = 'light-theme';
	emojisEnabled = true;
	fileUploadUrl = '';
	//triggeredEvents: ChatParticipantState[] = [];
	mySubscription: any;

	isUserLoggedIn: boolean = false;
	isUser: boolean = false;

	//public adapter: OpenfireAdapter = null;

	profile: ProfileEntity;
	profileEntity: ProfileEntity;

	messages15: any;
	mysubid15 = 'my-subscription-id-015';
	private unsubscribeSubject: Subject<void> = new Subject<void>();
	private dialogConfig;
	//private ngChatInstanceQueryChild: IChatController;

	constructor(
		private _angularLogService: AngularLogService,
		//private _activeFriendsService: ActiveFriendsService,
		public _alertService: AlertService,
		private _appService: AppService,
		//private _chatService: ChatService,
		//private _chatMessageService: ChatMessageService,
		//private _contactsService: ContactsService,
		private _dataSharingService: DataSharingService,
		private _errorHandlerService: ErrorHandlerService,
		private _http: HttpClient,
		private _presenceService: PresenceService,
		private _profilesService: ProfileEntityService,
		private _router: Router,
		public _usersService: UsersService,
		private _wsDataServiceSix: SocketClientSixService,
		private _wsDataServiceSeven: SocketClientSevenService,
		private _wsDataServiceNine: SocketClientNineService,
	) {

		this.fileUploadUrl = this.createCompleteRoute('files/uploadChatFile', environment.apiUrl);

		this._router.routeReuseStrategy.shouldReuseRoute = (): boolean => false;

	}

	ngOnInit(): void {
		this.headerForm = new UntypedFormGroup({
			presenceKind: new FormControl(''),
		});

		this.dialogConfig = {
			height: '1000px',
			width: '1000px',
			disableClose: true,
			data: {}
		};
		// Subscribe here, this will automatically update
		// "isUserLoggedIn" whenever a change to the subject is made.
		this._dataSharingService.isUserLoggedIn.subscribe((value) => {
			this.isUserLoggedIn = value;
			if (this.isUserLoggedIn) {
				this._dataSharingService.currentUser.subscribe(
					(userData) => {
						if (userData) {
							this.currentUser = userData;
							this.userId = this.currentUser.contactId;
							this.getProfileDetails();
							this.populateForm(this.currentUser);
						}
					}
				);
			}
		});

	}

	ngAfterViewInit(): void {

		this._alertService.success('Welcome to ZdsLogic!', this.options);

		this._wsDataServiceNine.connect().subscribe((res) => {
			////console.log(res);

			this.messages15 = this._presenceService
				.onUpdate(this.mysubid15)
				.pipe(takeUntil(this.unsubscribeSubject))
				.subscribe((post) => {
					//const isLoggedIn = this.isUserLoggedIn;
					const isLoggedIn = this._appService.checkCredentials();
					if ((post.message === 'Presence Changed')) {
						if (isLoggedIn) {

							this.sessionUser = post.data.data;
							this.currentUser = this._usersService.getCurrentUser();
							if (this.sessionUser.userName === this.currentUser.userName) {
								this.populateForm(this.sessionUser);
							}

						}
					}
				});
		});
	}

	ngAfterContentInit(): void {

	}

	ngOnDestroy(): void {
		if (this.mySubscription) {
			this.mySubscription.unsubscribe();
		}
	}

	public login(): void {
		const url = '/login';
		this._router.navigate([url]);
	}

	public loginSSO(): void {
		this._usersService.purgeZdsAuth();
		/*
		//this._appService.login();
		window.location.href = environment.ssoUrl + '/realms/zdslogic/protocol/openid-connect/auth?response_type=code&client_id=' +
			this.clientId + '&redirect_uri=' + this.redirectUri;
		*/

	}

	public logout(): void {
		this._usersService.logout();
		//this._appService.logout();
	}

	public redirectToRegister = (): void => {
		const url = '/register';
		this._router.navigate([url]);
	};


	private getProfileDetails = (): void => {
		const username = this.currentUser.userName;

		if (username !== undefined) {

			const id: string = username;
			//const url = `/profiles/${id}`;
			const apiUrl = `profile/${id}`;

			this._profilesService.getData(apiUrl)
				.subscribe((res) => {
					this.profileEntity = res as ProfileEntity;
					this.isUser = (this.currentUser.userName === this.profileEntity.userName);


				},
					(error) => {
						this._errorHandlerService.handleError(error);
					});
		}
	};

	private createCompleteRoute(route: string, envAddress: string): any {
		return `${envAddress}/${route}`;
	}

	private generateHeaders(): any {
		return {

			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': environment.originHeader,
					'Authorization': 'Bearer ' + Cookie.get('access_token')
				})
		};
	}

	private getUserDetails = (): void => {
		const id: string = this.currentUser.id.toString();
		const apiUrl = `users/${id}`;

		this._usersService.getData(apiUrl)
			.subscribe((res) => {
				this.currentUser = res as User;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	};

	private populateForm(user: User): void {
		this.headerForm.controls['presenceKind'].setValue(user.presenceStatus);
	}

	private changePresence(event): void {
		if (event.isUserInput) {
			const apiUrl = 'users/user/set/presence';

			const model = new AppMessage();
			model.message = this.currentUser.id.toString();
			model.data = event.source.value;
			model.flag = true;

			this._usersService.sendMessage(apiUrl, model)
				.subscribe((res) => {
					this.getUserDetails();
				},
					((error) => {
						this._errorHandlerService.handleError(error);
					})
				);

		}
	}

}
