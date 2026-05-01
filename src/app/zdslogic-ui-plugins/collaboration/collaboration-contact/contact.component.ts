import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'app/zdslogic-ui-base/core/services/error.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	constructor(
		private logger: AngularLogService,
		private errorService: ErrorService) { }

	ngOnInit(): void  {
		this.errorService.changeMessage('');
	}

}
