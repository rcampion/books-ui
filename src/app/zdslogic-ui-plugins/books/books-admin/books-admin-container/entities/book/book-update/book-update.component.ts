import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { BooksService } from '../../../../../core/services/books.service';
import { Book } from '../../../../../core/models/book.model';
import { SuccessDialogComponent } from '../../../../../../../zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-book-update',
	templateUrl: './book-update.component.html',
	styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent implements OnInit {
	public book: Book = new Book();
	public bookForm: UntypedFormGroup;

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
		private _router: Router,
		private _activeRoute: ActivatedRoute,
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

		this.getBookDetails();


	}

	public updateBook(bookFormValue): void {
		if (this.bookForm.valid) {
			this.executeBookUpdate(bookFormValue);
		}
	}
	public hasError(controlName: string, errorName: string): any {
		return this.bookForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

	private getBookDetails(): any {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `books/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((res) => {
				this.book = res as Book;
				this.populateForm();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private populateForm(): void {
		this.bookForm.controls['bookId'].setValue(this.book.bookId);
		this.bookForm.controls['isbn13'].setValue(this.book.isbn13);
		this.bookForm.controls['title'].setValue(this.book.title);
		this.bookForm.controls['languageId'].setValue(this.book.languageId);
		this.bookForm.controls['author'].setValue(this.book.author);
		this.bookForm.controls['authorId'].setValue(this.book.authorId);
		this.bookForm.controls['category'].setValue(this.book.category);
		this.bookForm.controls['publicationDate'].setValue(this.book.publicationDate);
		this.bookForm.controls['publisherId'].setValue(this.book.publisherId);
		this.bookForm.controls['price'].setValue(this.book.price);
		this.bookForm.controls['qty'].setValue(this.book.qty);
		this.bookForm.controls['image'].setValue(this.book.image);
	}



	private executeBookUpdate(bookFormValue): void {
		const book: Book = {
			bookId: bookFormValue.bookId,
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
		this._repository.update(apiUrl, book)
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
