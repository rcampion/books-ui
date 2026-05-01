import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { AppMessage } from 'app/zdslogic-ui-base/core/models/appmessage.model';
import { ErrorService } from 'app/zdslogic-ui-base/core/services/error.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

declare var JitsiMeetExternalAPI: any;

export interface PresenceType {
	value: number;
	viewValue: string;
}

@Component({
	selector: 'app-video-jitsi-enter',
	templateUrl: './video-jitsi-enter.component.html',
	styleUrls: ['./video-jitsi-enter.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class VideoJitsiEnterComponent implements OnInit, AfterViewInit {
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
	//domain: string = meet.jit.si; // For self hosted use your domain
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
		private activeRoute: ActivatedRoute,
		public usersService: UsersService,
		private dataSharingService: DataSharingService,
		private errorHandler: ErrorHandlerService,
		private errorService: ErrorService,

	) {

		this.dataSharingService.isUserLoggedIn.subscribe((value) => {
			this.isUserLoggedIn = value;
			if (this.isUserLoggedIn) {
				this.currentUser = this.usersService.getCurrentUser();
			}
		});

	}

	ngOnInit(): void {

		this.room = this.activeRoute.snapshot.params['id'];
		this.currentUser = this.usersService.getCurrentUser();

		this.user = {
			name: this.currentUser.userName // Set your username
		};

		this.options = {
			roomName: this.room,
			width: 1200,
			height: 600,
			configOverwrite: { prejoinPageEnabled: false },
			interfaceConfigOverwrite: {
				// overwrite interface properties
			},
			parentNode: document.querySelector('#jitsi-iframe'),
			userInfo: {
				displayName: this.user.name
			}
		};

		this.api = new JitsiMeetExternalAPI(this.domain, this.options);

		// Event handlers
		this.api.addEventListeners({
			readyToClose: this.handleClose,
			participantLeft: this.handleParticipantLeft,
			participantJoined: this.handleParticipantJoined,
			videoConferenceJoined: this.handleVideoConferenceJoined,
			videoConferenceLeft: this.handleVideoConferenceLeft,
			audioMuteStatusChanged: this.handleMuteStatus,
			videoMuteStatusChanged: this.handleVideoStatus
		});

	}

	ngAfterViewInit(): void {

	}

	handleClose(): void {
		//console.log(handleClose);
	}

	handleParticipantLeft = async (participant) => {
		//console.log(handleParticipantLeft, participant); // { id: 2baa184e }
		const data = await this.getParticipants();
	};

	handleParticipantJoined = async (participant) => {
		//console.log(handleParticipantJoined, participant); // { id: 2baa184e, displayName: Shanu Verma, formattedDisplayName: Shanu Verma }
		const data = await this.getParticipants();
	};

	handleVideoConferenceJoined = async (participant) => {
		this.changePresence(4);
		//console.log(handleVideoConferenceJoined, participant); // { roomName: bwb-bfqi-vmh, id: 8c35a951, displayName: Akash Verma, formattedDisplayName: Akash Verma (me)}
		const data = await this.getParticipants();
	};

	handleVideoConferenceLeft(): void {
		this.changePresence(0);
		//console.log(handleVideoConferenceLeft);
		this.router.navigate(['/thank-you']);
	}

	handleMuteStatus(audio): void {
		//console.log(handleMuteStatus, audio); // { muted: true }
	}

	handleVideoStatus(video): void {
		//console.log(handleVideoStatus, video); // { muted: true }
	}

	getParticipants(): any {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(this.api.getParticipantsInfo()); // get all participants
			}, 500);
		});
	}

	executeCommand(command: string): void {
		this.api.executeCommand(command);;
		if (command === 'hangup') {
			this.router.navigate(['/thank-you']);
			return;
		}

		if (command === 'toggleAudio') {
			this.isAudioMuted = !this.isAudioMuted;
		}

		if (command === 'toggleVideo') {
			this.isVideoMuted = !this.isVideoMuted;
		}
	}

	changePresence(event): any {

		let apiUrl = 'users/user/set/presence';
		let model = new AppMessage();
		model.message = this.currentUser.id.toString();
		model.data = event;
		model.flag = true;

		this.usersService.sendMessage(apiUrl, model)
			.subscribe((res) => {
				apiUrl = 'users/user/set/room';

				model = new AppMessage();
				model.message = this.currentUser.id.toString();
				model.data = this.room;
				model.flag = true;

				this.usersService.sendMessage(apiUrl, model)
					.subscribe((res) => {
						this.getUserDetails();
					},
						((error) => {
							this.errorHandler.handleError(error);
						})
					);
			},
				((error) => {
					this.errorHandler.handleError(error);
				})
			);

	}

	private getUserDetails(): void{
		const id: string = this.currentUser.id.toString();
		const apiUrl = `users/${id}`;

		this.usersService.getData(apiUrl)
			.subscribe((res) => {
				this.currentUser = res as User;
			},
				(error) => {
					this.errorHandler.handleError(error);
				});
	};
}
