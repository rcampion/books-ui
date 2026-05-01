import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ChatMessage } from 'app/zdslogic-ui-base/app/core/models/chat-message.model';
import { ApiService } from 'app/zdslogic-ui-base/core';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { Contact } from '../../../../../../../../zdslogic-ui-plugins/contacts/core/interfaces/contact.model';

@Component({
	selector: 'app-chat-meta',
	templateUrl: './chat-meta.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMetaComponent {
	@Input() message: ChatMessage;
	user: User = new User();
	contact: Contact;

	constructor(
		private _angularLogService: AngularLogService,
		private _repository: ApiService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) {

	}

	public redirectToProfile(element: any): any {
		let id = '';
		if (element.contactId) {
			id = element.contactId;
		} else {
			id = element.fromId;
		}

		const apiUrl = `contacts/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.contact = result as Contact;
				const id = this.contact.userName;
				const url = `/profiles/${id}`;
				this._router.navigate([url]);
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

}
