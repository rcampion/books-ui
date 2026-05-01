import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductBundle } from '../../../../../../core/interfaces/product-bundle.model';
import { ProductBundlesService } from '../../../../../../core/services/product-bundles.service';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-bundle-details',
	templateUrl: './product-bundle-details.component.html',
	styleUrls: ['./product-bundle-details.component.scss']
})
export class ProductBundleDetailsComponent implements OnInit {
	public productBundle: ProductBundle;
	public showAccounts;

	constructor(
		private _angularLogService: AngularLogService,
		private _repository: ProductBundlesService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {
		this.getProductBundleDetails();
	}

	private getProductBundleDetails = () => {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `productBundle/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.productBundle = result as ProductBundle;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
