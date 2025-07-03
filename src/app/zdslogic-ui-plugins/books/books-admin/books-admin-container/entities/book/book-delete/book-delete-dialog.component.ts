import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { BooksService } from '../../../../../core/services/books.service';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-book-delete-dialog',
	templateUrl: './book-delete-dialog.component.html',
	styleUrls: ['./book-delete-dialog.component.scss']
})
export class BookDeleteDialogComponent implements OnInit {
	id: string;
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: BooksService,
		private _errorHandlerService: ErrorHandlerService,
		private _dialogRef: MatDialogRef<BookDeleteDialogComponent>,
		private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

		this.id = data.id;
	}

	ngOnInit(): void {
	}

	public delete(): void {
		const apiUrl = `books/${this.id}`;
		this._repository.delete(apiUrl)
			.subscribe((res) => {
				this.id = res as string;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
		this._dialogRef.close();

	}

}
