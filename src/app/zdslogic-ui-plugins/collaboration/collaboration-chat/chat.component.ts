
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { CompatClient, Message, Stomp, StompSubscription } from '@stomp/stompjs';

import SockJS from 'sockjs-client';

import { getAudio, getButton, getButtons, getInput, getTextArea, getSpan } from 'app/zdslogic-ui-base/utils/html-utils';
import { BehaviorSubject, filter, Observable, Subject, takeUntil } from 'rxjs';
import { SocketClientState } from 'app/zdslogic-ui-base/core/services/socket-client-state';
import { GroupChatService } from 'app/zdslogic-ui-base/core/services/group-chat.service';
import { PopupComponent } from 'app/zdslogic-ui-base/utils/popup/popup.component';
import { SocketClientTwoService } from 'app/zdslogic-ui-base/core/services/socket-client-two.service';
import { SocketClientElizaService } from 'app/zdslogic-ui-base/core/services/socket-client-eliza.service';
import { ElizaChatService } from 'app/zdslogic-ui-base/core/services/eliza-chat.service';
import { Notification } from 'app/zdslogic-ui-shell/layout/common/notifications/core/models/notifications.model';
import { NotificationsService } from 'app/zdslogic-ui-shell/layout/common/notifications/core/services/notifications.service';

import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

	states = [
		{ name: 'Alabama', capital: 'Montgomery' },
		{ name: 'Alaska', capital: 'Juneau' },
		{ name: 'Arizona', capital: 'Phoenix' },
		{ name: 'Arkansas', capital: 'Little Rock' },
		{ name: 'California', capital: 'Sacramento' },
		{ name: 'Colorado', capital: 'Denver' },
		{ name: 'Connecticut', capital: 'Hartford' },
		{ name: 'Delaware', capital: 'Dover' },
		{ name: 'Florida', capital: 'Tallahassee' },
		{ name: 'Georgia', capital: 'Atlanta' },
		{ name: 'Hawaii', capital: 'Honolulu' },
		{ name: 'Idaho', capital: 'Boise' },
		{ name: 'Illinois', capital: 'Springfield' },
		{ name: 'Indiana', capital: 'Indianapolis' },
		{ name: 'Iowa', capital: 'Des Moines' },
		{ name: 'Kansas', capital: 'Topeka' },
		{ name: 'Kentucky', capital: 'Frankfort' },
		{ name: 'Louisiana', capital: 'Baton Rouge' },
		{ name: 'Maine', capital: 'Augusta' },
		{ name: 'Maryland', capital: 'Annapolis' },
		{ name: 'Massachusetts', capital: 'Boston' },
		{ name: 'Michigan', capital: 'Lansing' },
		{ name: 'Minnesota', capital: 'St. Paul' },
		{ name: 'Mississippi', capital: 'Jackson' },
		{ name: 'Missouri', capital: 'Jefferson City' },
		{ name: 'Montana', capital: 'Helena' },
		{ name: 'Nebraska', capital: 'Lincoln' },
		{ name: 'Nevada', capital: 'Carson City' },
		{ name: 'New Hampshire', capital: 'Concord' },
		{ name: 'New Jersey', capital: 'Trenton' },
		{ name: 'New Mexico', capital: 'Santa Fe' },
		{ name: 'New York', capital: 'Albany' },
		{ name: 'North Carolina', capital: 'Raleigh' },
		{ name: 'North Dakota', capital: 'Bismarck' },
		{ name: 'Ohio', capital: 'Columbus' },
		{ name: 'Oklahoma', capital: 'Oklahoma City' },
		{ name: 'Oregon', capital: 'Salem' },
		{ name: 'Pennsylvania', capital: 'Harrisburg' },
		{ name: 'Rhode Island', capital: 'Providence' },
		{ name: 'South Carolina', capital: 'Columbia' },
		{ name: 'South Dakota', capital: 'Pierre' },
		{ name: 'Tennessee', capital: 'Nashville' },
		{ name: 'Texas', capital: 'Austin' },
		{ name: 'Utah', capital: 'Salt Lake City' },
		{ name: 'Vermont', capital: 'Montpelier' },
		{ name: 'Virginia', capital: 'Richmond' },
		{ name: 'Washington', capital: 'Olympia' },
		{ name: 'West Virginia', capital: 'Charleston' },
		{ name: 'Wisconsin', capital: 'Madison' },
		{ name: 'Wyoming', capital: 'Cheyenne' },
	];

	@ViewChild('popupChat') chat: PopupComponent;

	private state: BehaviorSubject<SocketClientState>;
	isLoggedIn: boolean = false;

	static jsonHandler(message: Message): any {
		console.log(message.body);
		return JSON.parse(message.body);
	}

	static textHandler(message: Message): string {
		return message.body;
	}

	//private client: CompatClient;

	//serverSpan;
	//targetSpan;
	connectButton; // = HTMLButtonElement;
	//callButton;
	//hangupButton;
	disconnectButton;

	fromText;
	text;

	messages98: any;
	mysubid98 = 'my-subscription-id-098';
	messages99: any;
	mysubid99 = 'my-subscription-id-099';

	private unsubscribeSubject: Subject<void> = new Subject<void>();
	private unsubscribeSubjectEliza: Subject<void> = new Subject<void>();

	constructor(
		private groupChatService: GroupChatService,
		private elizaChatService: ElizaChatService,

		private socketClientTwoService: SocketClientTwoService,
		private socketClientElizaService: SocketClientElizaService,

		private notificationsService: NotificationsService

	) { }

	ngOnInit(): void {
	}

	public setConnected(connected: boolean): void {
		//this.serverSpan = getSpan('server');
		//this.targetSpan = getSpan('target');
		//this.connectButton = getButton('connect');
		//this.callButton = getButton('call');
		//this.hangupButton = getButton('hangup');
		//this.disconnectButton = getButton('disconnect');
		this.connectButton = getButton('connect');
		this.connectButton.disabled = connected;
		//document.getElementById('connect').disabled = connected;

		this.disconnectButton = getButton('disconnect');
		this.disconnectButton.disabled = !connected;
		//document.getElementById('disconnect').disabled = !connected;

		document.getElementById('conversationDiv').style.visibility
			= connected ? 'visible' : 'hidden';
		document.getElementById('response').innerHTML = '';
	}

	public connectToServer(): void {

		if (!this.isLoggedIn) {

			this.socketClientTwoService.connect().subscribe((res) => {
				//console.log(res);
				this.isLoggedIn = true;

				this.fromText = getInput('from');

				const from = this.fromText.value;

				const model = new Notification();

				model.id = '';
				model.userId = 41;
				model.icon = '';
				model.image = '';
				model.title = from + ' Entered the Group Chat Channel';
				model.description = 'Someone Entered the Group Chat Channel';
				const temp = new Date().toString();
				model.dateSent = new Date(temp).getTime().toString();
				model.link = '';
				model.useRouter = true;
				model.readFlag = false;

				this.notificationsService.create('notification', model)
					.subscribe((res) => {
						//console.log('message upload completed');
					});

				this.text = getTextArea('text');

				this.messages98 = this.groupChatService
					.onUpdate(this.mysubid98)
					.pipe(takeUntil(this.unsubscribeSubject))
					.subscribe((post) => {
						//console.log(post);
						this.showMessageOutput(post);
					});
			});

			/*
						this.socketClientElizaService.connect().subscribe(res => {
							//console.log(res);
							this.isLoggedIn = true;
							this.messages99 = this.elizaChatService
								.onUpdate(this.mysubid99)
								.pipe(takeUntil(this.unsubscribeSubjectEliza))
								.subscribe(post => {
									//console.log(post);
									this.showMessageOutput(post);
								});
						});

			*/
		}

		this.setConnected(true);
	}

	disconnect(): void {

		//this.socketClientService.disconnect();

		//this.setConnected(false);

		/*
				if (this.client != null) {
					this.client.disconnect();
				}
				//this.setConnected(false);
				console.log('Disconnected');
		*/
	}

	sendMessage(): void {

		this.fromText = getInput('from');

		const from = this.fromText.value;

		this.text = getTextArea('text');

		const text = this.text.value;

		this.groupChatService.save(
			JSON.stringify({ 'from': from, 'text': text }));

		setTimeout(() => {
			this.elizaChatService.save(
				JSON.stringify({ 'from': 'Eliza', 'text': text }));
		},
			1000);

	}

	showMessageOutput(messageOutput): void {

		const parsedMessageOutput = JSON.parse(messageOutput);

		const response = document.getElementById('response');
		const p = document.createElement('p');
		p.style.wordWrap = 'break-word';
		const date = new Date();
		const currentDate = date.toLocaleDateString();
		const currentTime = date.toLocaleTimeString();

		p.appendChild(document.createTextNode(parsedMessageOutput.from + ': '
			+ parsedMessageOutput.text + ' (' + currentDate + ' ' + currentTime + ')'));
		response.appendChild(p);

		const elem = document.getElementById('scrollbox');
		elem.scrollTop = elem.scrollHeight;
	}

	async asyncWait(): Promise<any> {
		const value = await this.waitForOneSecond();
		console.log(value);
	}

	waitForOneSecond(): any {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve('I promise to return after one second!');
			}, 1000);
		});
	}

	openChat(): void {
		this.chat.popup('https://www.zdslogic.com/webchat-app/');
	}
}
