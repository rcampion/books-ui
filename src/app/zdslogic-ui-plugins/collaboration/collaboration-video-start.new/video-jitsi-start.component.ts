import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { Router } from '@angular/router';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { ErrorService } from 'app/zdslogic-ui-base/core/services/error.service';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';

declare var JitsiMeetExternalAPI: any;

export interface PresenceType {
	value: number;
	viewValue: string;
}

@Component({
	selector: 'app-video-jitsi-start',
	templateUrl: './video-jitsi-start.component.html',
	styleUrls: ['./video-jitsi-start.component.scss']
})
export class VideoJitsiStartComponent implements OnInit {
	presenceTypes: PresenceType[] = [
		{ value: 0, viewValue: 'Online' },
		{ value: 1, viewValue: 'Offline' },
		{ value: 2, viewValue: 'Busy' },
		{ value: 3, viewValue: 'Away' },
		{ value: 4, viewValue: 'In a Meeting' }
	];

	currentUser: User;
	isUserLoggedIn: boolean = false;
	isUser: boolean = false;
	//domain: string = 'meet.jit.si'; // For self hosted use your domain
	domain: string = 'www.zdslogic.com/live'; // For self hosted use your domain
	room: any;
	options: any;
	api: any;
	user: any;

	// For Custom Controls
	isAudioMuted = false;
	isVideoMuted = false;

	constructor(
		private logger: AngularLogService,
		private router: Router,
		public usersService: UsersService,
		private dataSharingService: DataSharingService,
		private errorHandler: ErrorHandlerService,
		private errorService: ErrorService,

	) { }

	ngOnInit(): void {

		this.currentUser = this.usersService.getCurrentUser();
		//this.currentUser.userName;
		this.room = this.currentUser.userName;
		this.user = {
			name: 'Richard Campion' // Set your username
		};

		this.options = {
			roomName: this.room,
			width: 1000,
			height: 500,
			configOverwrite: { prejoinPageEnabled: false },
			interfaceConfigOverwrite: {
				// overwrite interface properties
			},
			parentNode: document.querySelector('#jitsi-iframe'),
			userInfo: {
				displayName: this.user.name
			}
		};

		const locationUrl = `/collaboration/collaboration-video-enter/video/${this.room}`;
		//var locationUrl = `/video-jitsi/video-jitsi-enter`;

		window.location.href = locationUrl;

	}

}
