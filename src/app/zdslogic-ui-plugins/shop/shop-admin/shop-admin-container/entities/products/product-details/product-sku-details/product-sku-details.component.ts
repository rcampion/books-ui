import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Sku } from '../../../../../../core/interfaces/sku.model';
import { SkusService } from '../../../../../../core/services/skus.service';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-sku-details',
	templateUrl: './product-sku-details.component.html',
	styleUrls: ['./product-sku-details.component.scss']
})
export class ProductSkuDetailsComponent implements OnInit {
	public sku: Sku;
	public showAccounts;

	constructor(
		private _angularLogService: AngularLogService,
		private _repository: SkusService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {
		this.getSkuDetails();
	}

	private getSkuDetails = () => {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `skus/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.sku = result as Sku;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
