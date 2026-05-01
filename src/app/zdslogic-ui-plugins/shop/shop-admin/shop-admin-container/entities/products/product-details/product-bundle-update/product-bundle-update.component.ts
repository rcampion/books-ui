import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ProductBundle } from '../../../../../../core/interfaces/product-bundle.model';
import { ProductBundlesService } from '../../../../../../core/services/product-bundles.service';

import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-bundle-update',
	templateUrl: './product-bundle-update.component.html',
	styleUrls: ['./product-bundle-update.component.scss']
})
export class ProductBundleUpdateComponent implements OnInit {
	public productBundle: ProductBundle;
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
	constructor(private _angularLogService: AngularLogService, private _location: Location, private _repository: ProductBundlesService, private _dialog: MatDialog,
		router: Router,
		private _activeRoute: ActivatedRoute, private _errorHandlerService: ErrorHandlerService) { }


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

		this.getProductBundleDetails();


	}
	private getProductBundleDetails = () => {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `productBundle/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.productBundle = result as ProductBundle;
				this.populateForm();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private populateForm() {
		this.productBundleForm.controls['productId'].setValue(this.productBundle.productId);
		this.productBundleForm.controls['autoBundle'].setValue(this.productBundle.autoBundle);
		this.productBundleForm.controls['bundlePriority'].setValue(this.productBundle.bundlePriority);
		this.productBundleForm.controls['bundlePromotable'].setValue(this.productBundle.bundlePromotable);
		this.productBundleForm.controls['itemsPromotable'].setValue(this.productBundle.itemsPromotable);
		this.productBundleForm.controls['pricingModel'].setValue(this.productBundle.pricingModel);
	}

	public updateProductBundle = (productBundleFormValue) => {
		if (this.productBundleForm.valid) {
			this.executeProductBundleUpdate(productBundleFormValue);
		}
	}

	private executeProductBundleUpdate = (productBundleFormValue) => {
		const productBundle: ProductBundle = {
			productId: productBundleFormValue.productId,
			autoBundle: productBundleFormValue.autoBundle,
			bundlePriority: productBundleFormValue.bundlePriority,
			bundlePromotable: productBundleFormValue.bundlePromotable,
			itemsPromotable: productBundleFormValue.itemsPromotable,
			pricingModel: productBundleFormValue.pricingModel,

		};

		const apiUrl = 'productBundle';
		this._repository.update(apiUrl, productBundle)
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

	public hasError(controlName: string, errorName: string): any {
		return this.productBundleForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

}
