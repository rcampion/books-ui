import { Component, OnInit } from '@angular/core';

import { ChatChannel } from 'app/zdslogic-ui-base/app/core/models/chat-channel.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatChannelService } from 'app/zdslogic-ui-base/app/core/services/chat-channel.service';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-chat-channel-details',
	templateUrl: './chat-channel-details.component.html',
	styleUrls: ['./chat-channel-details.component.scss']
})
export class ChatChannelDetailsComponent implements OnInit {
	public chatChannel: ChatChannel;
	public showAccounts;

	constructor(private _angularLogService: AngularLogService,
		private _repository: ChatChannelService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void  {
		this.getChatChannelDetails();
	}

	private getChatChannelDetails(): any {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `chat-channel/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.chatChannel = result as ChatChannel;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
