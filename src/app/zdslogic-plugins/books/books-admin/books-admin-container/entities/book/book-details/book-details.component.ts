import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BooksService } from '../../../../../core/services/books.service';
import { Book } from '../../../../../core/models/book.model';
import { ErrorHandlerService } from '../../../../../../../zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-base/core/services/angular-log.service';

@Component({
	selector: 'app-book-details',
	templateUrl: './book-details.component.html',
	styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
	public book: Book;
	public showAccounts;

	constructor(
		private _angularLogService: AngularLogService,
		private _repository: BooksService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {
		this.getBookDetails();
	}

	private getBookDetails(): any {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `books/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((res) => {
				this.book = res as Book;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
