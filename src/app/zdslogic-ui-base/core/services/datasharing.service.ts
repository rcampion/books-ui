import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//import { ChatParticipantStatus } from './../../chat/core/chat-participant-status.enum';
//import { ChatParticipantType } from './../../chat/core/chat-participant-type.enum';

//import { IChatController } from './../../chat/core/chat-controller';

import { AngularLogService } from '../../core/services/angular-log.service';

//import { ChatChannel } from '../../app/core/models/chat-channel.model';
//import { ChatParticipantState } from '../../app/core/models/chat-participant-state';
import { EMailInboxFile } from '../models/email-inbox-file.model';
import { File } from './../models/file.model';

import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class DataSharingService {

	//public currentChannel: BehaviorSubject<any> = new BehaviorSubject<any>(ChatChannel);
	public currentEMail: BehaviorSubject<EMailInboxFile> = new BehaviorSubject<any>(EMailInboxFile);
	public currentUser: BehaviorSubject<User> = new BehaviorSubject<any>(User);
	public currentWeatherData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	public isActiveContactsReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isJoinVideo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isJoinReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isLoginReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isPdfReady: BehaviorSubject<File> = new BehaviorSubject<any>(null);
	public isPortal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isSearchResultsOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isUserAuthorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isUserContactsReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isUserSubscribed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	//public ngChatInstance: BehaviorSubject<IChatController> = new BehaviorSubject<any>(null);
	//public ngChatParticipantState = new BehaviorSubject<ChatParticipantState[]>([]);
	public peerId: BehaviorSubject<string> = new BehaviorSubject<any>(null);
	public searchString: BehaviorSubject<string> = new BehaviorSubject<any>(null);

	constructor(

		private _angularLogService: AngularLogService) {

	}
}
