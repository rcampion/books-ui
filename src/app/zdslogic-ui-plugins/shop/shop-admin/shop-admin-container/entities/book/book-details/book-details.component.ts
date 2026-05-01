import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../../../../core/services/books.service';
import { Product } from '../../../../../core/models/book.model';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-book-details',
	templateUrl: './book-details.component.html',
	styleUrls: ['./book-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
	public book: Product;
	public showAccounts;

	constructor(
		private _angularLogService: AngularLogService,
		private _repository: ProductsService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {
		this.getProductDetails();
	}

	private getProductDetails(): any {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `books/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((res) => {
				this.book = res as Product;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
