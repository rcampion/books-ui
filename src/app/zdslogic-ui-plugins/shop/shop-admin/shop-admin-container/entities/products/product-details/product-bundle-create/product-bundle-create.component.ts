import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ProductBundlesService } from '../../../../../../core/services/product-bundles.service';
import { ProductBundle } from '../../../../../../core/interfaces/product-bundle.model';

import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-bundle-create',
	templateUrl: './product-bundle-create.component.html',
	styleUrls: ['./product-bundle-create.component.scss']
})
export class ProductBundleCreateComponent implements OnInit {
	public productBundleForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});
	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	// tslint:disable-next-line:max-line-length
	constructor(private _angularLogService: AngularLogService,
		private _location: Location,
		private _repository: ProductBundlesService,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {

		this.productBundleForm = new UntypedFormGroup({
			productId: new FormControl(''),
			autoBundle: new FormControl(''),
			bundlePriority: new FormControl(''),
			bundlePromotable: new FormControl(''),
			itemsPromotable: new FormControl(''),
			pricingModel: new FormControl(''),

		});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}

	public hasError(controlName: string, errorName: string): any {
		return this.productBundleForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

	public createProductBundle = (productBundleFormValue) => {
		if (this.productBundleForm.valid) {
			this.executeProductBundleCreation(productBundleFormValue);
		}
	}

	private executeProductBundleCreation = (productBundleFormValue) => {
		const productBundle: ProductBundle = {
			productId: "",
			autoBundle: productBundleFormValue.autoBundle,
			bundlePriority: productBundleFormValue.bundlePriority,
			bundlePromotable: productBundleFormValue.bundlePromotable,
			itemsPromotable: productBundleFormValue.itemsPromotable,
			pricingModel: productBundleFormValue.pricingModel,

		};

		const apiUrl = 'productBundle';
		this._repository.create(apiUrl, productBundle)
			.subscribe((result) => {
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
