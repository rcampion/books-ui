import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { environment } from 'environments/environment';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { ProfileEntityService } from 'app/zdslogic-ui-base/core/services/profile-entity.service';
import { ProfileEntity } from 'app/zdslogic-ui-base/core/models/profile-entity.model';
import { PresenceType } from 'app/zdslogic-ui-base/core/interfaces/presence-type';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AppMessage } from 'app/zdslogic-ui-base/core/models/appmessage.model';
import { PresenceService } from 'app/zdslogic-ui-base/core/services/presence.service';
import { SocketClientNineService } from 'app/zdslogic-ui-base/core/services/socket-client-nine.service';
import { AppService } from 'app/zdslogic-ui-base/core/services/app.service';

@Component({
	selector: 'user',
	templateUrl: './user.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'user'
})
export class UserComponent implements OnInit, OnDestroy {
	//public clientId = 'newClient';
	//public redirectUri = environment.redirectUri;

	isUserLoggedIn: boolean = false;
	isUser: boolean = false;
	@Input() showAvatar: boolean = true;
	currentUser: User;
	userId: number;
	profileEntity: ProfileEntity;
	currentUser$: BehaviorSubject<User> = new BehaviorSubject(null);

	presenceTypes: PresenceType[] = [
		{ value: 0, viewValue: 'Online', statusColor: 'bg-green-500' },
		{ value: 1, viewValue: 'Offline', statusColor: 'bg-gray-400' },
		{ value: 2, viewValue: 'Busy', statusColor: 'bg-red-500' },
		{ value: 3, viewValue: 'Away', statusColor: 'bg-amber-500' },
		{ value: 4, viewValue: 'In a Meeting', statusColor: 'bg-orange-500' }
	];

	private _unsubscribeAll: Subject<any> = new Subject<any>();

	private messages15: any;
	private mysubid15 = 'my-subscription-id-015';
	private unsubscribeSubject: Subject<void> = new Subject<void>();
	private sessionUser: User;

	/**
	 * Constructor
	 */
	constructor(
		private _changeDetectorRef: ChangeDetectorRef,
		private _router: Router,
		private _usersService: UsersService,
		private _dataSharingService: DataSharingService,
		private profileEntityService: ProfileEntityService,
		private _errorHandlerService: ErrorHandlerService,
		private _appService: AppService,
		private _wsDataServiceNine: SocketClientNineService,
		private _presenceService: PresenceService,
	) {

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
								//this.populateForm(this.sessionUser);
							}

						}
					}
				});
		});

	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this._dataSharingService.isUserLoggedIn.pipe(takeUntil(this._unsubscribeAll)).subscribe((value) => {
			this.isUserLoggedIn = value;
			if (this.isUserLoggedIn) {
				//this._dataSharingService.ngChatInstance.next(this.ngChatInstance);
				//this.adapter.refreshFriends();
				this.currentUser = this._usersService.getCurrentUser();
				this.userId = this.currentUser.contactId;
				this.getProfileDetails();
				this._changeDetectorRef.markForCheck();
			}
		});



	}

	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}
/*
	private populateForm(user): void {
		this.presenceType.
		this.headerForm.controls['presenceKind'].setValue(user.presenceStatus);
	}
*/
	updateUserStatus(status: number): void {
		const apiUrl = 'users/user/set/presence';

		const model = new AppMessage();
		model.message = this.currentUser.id.toString();
		model.data = status;
		model.flag = true;

		this._usersService.sendMessage(apiUrl, model)
			.subscribe((res) => {
				this.getUserDetails();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				}
			);
	}

	loginSSO(): void {
		this._usersService.purgeZdsAuth();
/*
		window.location.href = environment.ssoUrl + '/realms/zdslogic/protocol/openid-connect/auth?response_type=code&client_id=' +
			this.clientId + '&redirect_uri=' + this.redirectUri;
*/
	}

	signUp(): void {
		const url = '/sign-up';
		this._router.navigate([url]);
	}

	public redirectToProfile = (): void => {
		const id = this.currentUser.userName;
		const url = `/profiles/${id}`;
		this._router.navigate([url]);
	};


	/**
	 * Sign out
	 */
	public signOut(): void {
		this._usersService.logout();
	}

	private getUserDetails(): void {
		const id: string = this.currentUser.id.toString();
		const apiUrl = `users/${id}`;

		this._usersService.getData(apiUrl)
			.subscribe((res) => {
				this.currentUser = res as User;
				this.currentUser$.next(this.currentUser);
				this._changeDetectorRef.markForCheck();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private getProfileDetails(): void {
		const username = this.currentUser.userName;

		if (username !== undefined) {

			const id: string = username;
			//const url = `/profiles/${id}`;
			const apiUrl = `profile/${id}`;

			this.profileEntityService.getData(apiUrl)
				.pipe(takeUntil(this._unsubscribeAll))
				.subscribe((res) => {
					this.profileEntity = res as ProfileEntity;
					this.isUser = (this.currentUser.userName === this.profileEntity.userName);
					this._changeDetectorRef.detectChanges();
				},
					(error) => {
						this._errorHandlerService.handleError(error);
					});
		}
	}


}
