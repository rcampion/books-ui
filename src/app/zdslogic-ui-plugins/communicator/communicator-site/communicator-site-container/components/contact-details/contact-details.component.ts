import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Contact } from '../core/interfaces/contact.model';
import { ContactsService } from '../core/services/contacts.service';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-chat-contact-details',
	templateUrl: './contact-details.component.html',
	styleUrls: ['./contact-details.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ChatContactDetailsComponent implements OnInit {
	public contact: Contact;
	public showAccounts;

	constructor(private _angularLogService: AngularLogService,
		private _repository: ContactsService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void  {
		this.getContactDetails();
	}

	private getContactDetails(): any {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `contacts/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.contact = result as Contact;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
