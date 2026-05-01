import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ChatMessageService } from 'app/zdslogic-ui-base/app/core/services/chat-message.service';
import { ChatMessage } from 'app/zdslogic-ui-base/app/core/models/chat-message.model';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-chat-message-details',
	templateUrl: './chat-message-details.component.html',
	styleUrls: ['./chat-message-details.component.scss']
})
export class ChatMessageDetailsComponent implements OnInit {
	public chatMessage: ChatMessage;
	public showAccounts;

	constructor(private _angularLogService: AngularLogService,
		private _repository: ChatMessageService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void  {
		this.getChatMessageDetails();
	}

	private getChatMessageDetails(): any {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `chat-message/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.chatMessage = result as ChatMessage;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
