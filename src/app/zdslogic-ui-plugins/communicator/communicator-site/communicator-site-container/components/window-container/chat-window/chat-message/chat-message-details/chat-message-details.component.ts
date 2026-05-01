import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ChatMessageService } from 'app/zdslogic-ui-base/app/core/services/chat-message.service';
import { ChatMessage } from 'app/zdslogic-ui-base/app/core/models/chat-message.model';
import { Contact } from './../../../../../../../../../zdslogic-ui-plugins/contacts/core/interfaces/contact.model';
import { ContactsService } from './../../../../../../../../../zdslogic-ui-plugins/contacts/core/services/contacts.service';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-chat-message-details',
	templateUrl: './chat-message-details.component.html',
	styleUrls: ['./chat-message-details.component.scss']
})
export class ChatMessageDetailsComponent implements OnInit {
	@Input()
	public contact: Contact;
	public chatMessage: ChatMessage;
	public showAccounts;

	contactId: number;
	messageId: number;

	constructor(private _angularLogService: AngularLogService,
		private _contactsService: ContactsService,
		private _chatMessageService: ChatMessageService,
		public _route: ActivatedRoute,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {
		this._route.paramMap.subscribe((p) => {
			this.contactId = +this._route.snapshot.parent.parent.paramMap.get(
				'contactId'
			);

			this.messageId = +this._route.snapshot.paramMap.get('messageId');
			this.getChatMessageDetails(this.messageId);

		});

	}

	private getContactDetails(contactId: number): any {

		const apiUrl = `contacts/${contactId}`;

		this._contactsService.getData(apiUrl)
			.subscribe((result) => {

				this.contact = result as Contact;
				//this.reloadComponent(false, '/messaging/messages');
				console.log(this.contact);
				//this.reloadComponent(false,'messages');
				//alert('Ureka: Contact=' + this.contact.fullName);
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private getChatMessageDetails(messageId: number): any {

		const apiUrl = `chat-message/${messageId}`;

		this._chatMessageService.getData(apiUrl)
			.subscribe((result) => {
				this.chatMessage = result as ChatMessage;
				this.getContactDetails(this.chatMessage.fromId);

			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
