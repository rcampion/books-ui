import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from '../core/services/contacts.service';
//import { ContactsPostService } from 'app/zdslogic-ui-base/core/services/contacts-post.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-contact-delete-dialog',
	templateUrl: './contact-delete-dialog.component.html',
	styleUrls: ['./contact-delete-dialog.component.scss']
})
export class ContactDeleteDialogComponent implements OnInit {
	id: string;
	constructor(private _angularLogService: AngularLogService,
		//private postService: ContactsPostService,
		private _errorHandlerService: ErrorHandlerService,
		private _dialogRef: MatDialogRef<ContactDeleteDialogComponent>,
		private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data,
		private _repository: ContactsService,) {

		this.id = data.id;
	}

	ngOnInit(): void {
	}

	public delete(): void {
		const apiUrl = `contacts/${this.id}`;
		this._repository.delete(apiUrl)
			.subscribe((result) => {
				this.id = result as string;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
		this._dialogRef.close();

		//this.postService.delete(this.id);

	}

}
