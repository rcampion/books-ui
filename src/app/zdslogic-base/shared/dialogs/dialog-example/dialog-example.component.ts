import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularLogService } from '../../../core/services/angular-log.service';
import { DialogComponent } from '../dialog-component/dialog.component';
import { DialogService } from '../dialog-component/dialog.service';

@Component({
	selector: 'app-dialog-example',
	templateUrl: './dialog-example.component.html',
	styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent {

	constructor(
		private _angularLogService: AngularLogService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public _dialogRef: MatDialogRef<DialogComponent>,
		private _dialogService: DialogService,
		private _location: Location,) { }

	ngOnInit(): void {

		//open the dialog
		const ref = this._dialogService.open({ name: 'First Last' });

		//close the dialog
		ref.close();

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
