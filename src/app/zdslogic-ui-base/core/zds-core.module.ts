import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
//import { ChartControlsService } from './services';

import {
	AccountEventsService,
	ActiveUsersService,
	AdminAuthGuard,
	AngularLogPublishersService,
	AngularLogPublisher,
	AngularLogService,
	ApiSecureService,
	ApiService,
	AppLogsService,
	AppMessageService,
	AppService,
	AuthenticationService,
	AuthGuard,
	ChatHistoryService,
	DataSharingService,
	ElizaChatService,
	ErrorHandlerService,
	ErrorService,
	GroupChatService,
	HttpService,
	JwtService,
	MapApiService,
	MessageService,
	MyAccountService,
	PresenceService,
	ProfileEntityService,
	ProjectUserService,
	RegistrationService,
	ResizeService,
	SCREEN_SIZE,
	SocketClientEightService,
	SocketClientElizaService,
	SocketClientFourService,
	SocketClientMessageService,
	SocketClientNineService,
	SocketClientOneService,
	SocketClientService,
	SocketClientSevenService,
	SocketClientSixService,
	SocketClientState,
	SocketClientThreeService,
	SocketClientTwoService,
	SubscriptionMembersDataSource,
	SubscriptionsDataSource,
	SubscriptionsService,
	SystemService,
	ToastrService,
	UploadService,
	UsersDataSource,
	UsersService,
	WebSocketAppLogsService,
	WebSocketMessageService,
	ZdsAuthGuard,
} from './services';
import { MaterialModule } from '../material/material.module';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
	],
	exports: [
		MaterialModule
	],

	providers: [
		//    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
		ApiService,
		ApiSecureService,
		ZdsAuthGuard,
		JwtService,
		//ProfilesService,
		//TagsService,
		//ChartControlsService
	],
	declarations: []
})
export class ZdsCoreModule { }
