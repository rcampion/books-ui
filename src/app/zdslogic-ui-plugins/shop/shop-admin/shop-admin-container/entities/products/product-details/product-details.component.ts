import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../../../../../core/interfaces/product.model';
import { ProductsService } from '../../../../../core/services/products.service';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
	public product: Product;
	public showAccounts;

	constructor(private _angularLogService: AngularLogService,
		private _repository: ProductsService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void  {
		this.getProductDetails();
	}

	private getProductDetails = () => {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `products/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.product = result as Product;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
