import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ChatMessage } from 'app/zdslogic-ui-base/app/core/models/chat-message.model';
import { Contact } from 'app/zdslogic-ui-plugins/contacts/core/interfaces/contact.model';

@Component({
	selector: 'app-chat-preview',
	templateUrl: './chat-preview.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPreviewComponent {
	@Input() contact: Contact;
	@Input() message: ChatMessage;
	constructor(
		private _router: Router,
	) { }
	trackByFn(index, item): void {
		return index;
	}

	onToggleFavorite(favorited: boolean): void {
		this.message['favorited'] = favorited;

		if (favorited) {
			this.message['favoritesCount']++;
		} else {
			this.message['favoritesCount']--;
		}
	}

	public redirectToMessage(message: ChatMessage): void {
		//const url = `/messaging/messages/details/${message.id}`;
		const contactId: number = this.contact.id;
		const messageId: number = message.id;

		//const url = `/messaging/${contactId}`;

		const url = `/messaging/${contactId}/message/${messageId}`;

		this._router.navigate([url]);
	};
}
