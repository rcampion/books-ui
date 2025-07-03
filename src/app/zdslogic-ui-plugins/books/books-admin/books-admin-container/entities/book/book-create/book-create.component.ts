import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { BooksService } from '../../../../../core/services/books.service';
import { Book } from '../../../../../core/models/book.model';
import { SuccessDialogComponent } from '../../../../../../../zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-book-create',
	templateUrl: './book-create.component.html',
	styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

	public bookForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});
	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _location: Location,
		private _repository: BooksService,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {

		this.bookForm = new UntypedFormGroup({
			bookId: new FormControl(''),
			isbn13: new FormControl(''),
			title: new FormControl(''),
			languageId: new FormControl(''),
			author: new FormControl(''),
			authorId: new FormControl(''),
			category: new FormControl(''),
			publicationDate: new FormControl(''),
			publisherId: new FormControl(''),
			price: new FormControl(''),
			qty: new FormControl(''),
			image: new FormControl(''),
		});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}

	public hasError(controlName: string, errorName: string): any {
		return this.bookForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

	public createBook(bookFormValue): void {
		if (this.bookForm.valid) {
			this.executeBookCreation(bookFormValue);
		}
	}

	private executeBookCreation(bookFormValue): any {
		const book: Book = {
			bookId: '',
			isbn13: bookFormValue.isbn13,
			title: bookFormValue.title,
			languageId: bookFormValue.languageId,
			author: bookFormValue.author,
			authorId: bookFormValue.authorId,
			category: bookFormValue.category,
			publicationDate: bookFormValue.publicationDate,
			publisherId: bookFormValue.publisherId,
			price: bookFormValue.price,
			qty: bookFormValue.qty,
			image: bookFormValue.image,
		};

		const apiUrl = 'books';
		this._repository.create(apiUrl, book)
			.subscribe((res) => {
				const dialogRef = this._dialog.open(SuccessDialogComponent, this.dialogConfig);

				// we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
				dialogRef.afterClosed()
					.subscribe((result) => {
						this._location.back();
					});
			},
				((error) => {
					this._errorHandlerService.dialogConfig = { ...this.dialogConfig };
					this._errorHandlerService.handleError(error);
				})
			);
	}

}
