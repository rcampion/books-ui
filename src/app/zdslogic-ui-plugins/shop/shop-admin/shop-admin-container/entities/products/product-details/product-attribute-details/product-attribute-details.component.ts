import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductAttribute } from '../../../../../../core/interfaces/product-attribute.model';
import { ProductAttributesService } from '../../../../../../core/services/product-attributes.service';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-attribute-details',
	templateUrl: './product-attribute-details.component.html',
	styleUrls: ['./product-attribute-details.component.scss']
})
export class ProductAttributeDetailsComponent implements OnInit {
	public productAttribute: ProductAttribute;
	public showAccounts;

	constructor(
		private _angularLogService: AngularLogService,
		private _repository: ProductAttributesService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void  {
		this.getProductAttributeDetails();
	}

	private getProductAttributeDetails = () => {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `productAttribute/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.productAttribute = result as ProductAttribute;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
