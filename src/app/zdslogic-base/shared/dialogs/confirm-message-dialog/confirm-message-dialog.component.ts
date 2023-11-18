import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularLogService } from '../../../core/services/angular-log.service';

@Component({
	selector: 'app-error-dialog',
	templateUrl: './confirm-message-dialog.component.html',
	styleUrls: ['./confirm-message-dialog.component.css']
})
export class ConfirmMessageDialogComponent implements OnInit {

	constructor(
		private _angularLogService: AngularLogService,
		private _location: Location,
		public _dialogRef: MatDialogRef<ConfirmMessageDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit(): void  {
		//console.log(this.data);
	}

	onConfirm(): void {
		// Close the dialog, return true
		this._dialogRef.close(true);
	}

	onDismiss(): void {
		// Close the dialog, return false
		this._dialogRef.close(false);
	}
}
