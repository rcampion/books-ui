import { Component, OnInit } from '@angular/core';

import { AngularLogService } from '../../../core/services/angular-log.service';

@Component({
	selector: 'app-success-dialog',
	templateUrl: './success-dialog.component.html',
	styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

	constructor(
		private _angularLogService: AngularLogService) { }

	ngOnInit(): void  {
	}

}
