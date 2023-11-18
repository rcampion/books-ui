import { Component, OnInit, NgZone, AfterViewInit, ViewEncapsulation, OnDestroy, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { Router, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

//import { AppService } from './zdslogic-base/core/services/app.service';
//import { DataSharingService } from './zdslogic-base/core/services/datasharing.service';
//import { User } from './zdslogic-base/core/models/user.model';
import { AngularLogService } from './zdslogic-base/core/services/angular-log.service';

//import { SocketClientService } from './zdslogic-base/core/services/socket-client.service';
//import { SocketClientEightService } from './zdslogic-base/core/services/socket-client-eight.service';
//import { WebSocketAppLogsService } from './zdslogic-base/core/services/websocket-applogs.service';
//import { SocketClientMessageService } from './zdslogic-base/core/services/socket-client-message.service';
//import { WebSocketMessageService } from './zdslogic-base/core/services/websocket-message.service';

//import { AlertService } from './zdslogic-base/alert/alert.service';
//import { AppMessage } from './zdslogic-base/core/models/appmessage.model';

//import { MessageDialogComponent } from './zdslogic-base/shared/dialogs/message-dialog/message-dialog.component';
//import { MessageService } from './zdslogic-base/core/services/message.service';

//import { UsersService } from './zdslogic-base/core/services/users.service';
//import { AuthenticationService } from './zdslogic-base/core/services/authentication.service';

//import { ResizeService } from './zdslogic-base/core/services/resize.service';
//import { SCREEN_SIZE } from './zdslogic-base/core/services/screen-size.enum';

//import { VideoJitsiCallDialogComponent } from './plugins/collaboration/dialog/video-jitsi-call-dialog.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	date: string;
	isPortal = false;
	isShowHideFlag = 'over';
	//sessionUser: User;
	//currentUser: User;
	isUserLoggedIn: boolean = false;
	joinVideo: boolean;

	room: any;
	message: any;
	subscription: Subscription;

	title = 'ZdsLogic Technologies';

	messages69: any;
	mysubid69 = 'my-subscription-id-069';

	messages77: any;
	mysubid77 = 'my-subscription-id-077';

	//appMessage: AppMessage;
	private dialogConfig;
	private messageDialogConfig;
	//callContactDialogRef: MatDialogRef<ContactCallDialogComponent>;

	private unsubscribeSubject: Subject<void> = new Subject<void>();
	private messageUnsubscribeSubject: Subject<void> = new Subject<void>();


	/**
	 * Constructor
	 */
	constructor(
		private location: Location,
		private logger: AngularLogService,
		private router: Router,
		private ngZone: NgZone,
		private dialog: MatDialog,
	) {

		this.date = this.getDate();

	}

	ngAfterViewInit(): void {

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

		this.messageDialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

		let j = window.location.href.indexOf('/home');
		if (j !== -1) {
			this.isPortal = false;
			return;
		}

		j = window.location.href.indexOf('/about');
		if (!this.isUserLoggedIn && j !== -1) {
			this.isPortal = true;
			//this.dataSharingService.isPortal.next(true);
			const url = '/about';
			this.router.navigate([url]);
			return;
		}

		j = window.location.href.indexOf('/contact');
		if (!this.isUserLoggedIn && j !== -1) {
			this.isPortal = true;
			//this.dataSharingService.isPortal.next(true);
			const url = '/contact';
			this.router.navigate([url]);
			return;
		}

		j = window.location.href.indexOf('/privacy');
		if (!this.isUserLoggedIn && j !== -1) {
			this.isPortal = true;
			//this.dataSharingService.isPortal.next(true);
			const url = '/privacy';
			this.router.navigate([url]);
			return;
		}

	}

	getDate(): string {
		const theDate = new Date();
		const theTime = theDate.getTime();
		const months = new Array('January', 'February', 'March',
			'April', 'May', 'June', 'July', 'August',
			'September', 'October', 'November', 'December');
		//Ensure correct for language. English is 'January 1, 2020'
		const TODAY = months[theDate.getMonth()] + ' '
			+ theDate.getDate() + ', ' + theDate.getFullYear();
		const DATETIME = months[theDate.getMonth()] + ' '
			+ theDate.getDate() + ', ' + theDate.getFullYear()
			+ ', ' + theTime;
		const DAYS = (((((theTime / 1000) / 60) / 60) / 24) / 365);

		return TODAY;
	}

	togglePortal(): any {
		this.isPortal = !this.isPortal;
		//this.dataSharingService.isPortal.next(this.isPortal);
		return false;
	}

	redirectToProfile(): any {
		this.isPortal = true;
		//this.dataSharingService.isPortal.next(this.isPortal);
		const url = '/profiles/richard.campion';
		this.router.navigate([url]);
		return false;
	}

	public redirectToVideo(post: any): void {
		//const url = `/contacts/contact/video/${post.message}`;
		//this.router.navigate([url]);
		this.room = post.data;
		//this.room = this.currentUser.userName;
		const locationUrl = `/collaboration/collaboration-video-enter/video/${this.room}`;
		//var locationUrl = `/video-jitsi/video-jitsi-enter`;

		window.location.href = locationUrl;
		//this.router.navigate([locationUrl]);

	}

}
