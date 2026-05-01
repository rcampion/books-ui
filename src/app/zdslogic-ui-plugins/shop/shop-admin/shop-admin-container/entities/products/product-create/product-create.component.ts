import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ProductsService } from '../../../../../core/services/products.service';
import { Product } from '../../../../../core/interfaces/product.model';

import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-create',
	templateUrl: './product-create.component.html',
	styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
	public productForm: UntypedFormGroup = new UntypedFormGroup({
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
		private _repository: ProductsService,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {

		this.productForm = new UntypedFormGroup({
			productId: new FormControl(''),
			archived: new FormControl(''),
			canSellWithoutOptions: new FormControl(''),
			canonicalUrl: new FormControl(''),
			displayTemplate: new FormControl(''),
			isFeaturedProduct: new FormControl(''),
			manufacture: new FormControl(''),
			metaDesc: new FormControl(''),
			metaTitle: new FormControl(''),
			model: new FormControl(''),
			overrideGeneratedUrl: new FormControl(''),
			url: new FormControl(''),
			urlKey: new FormControl(''),
			defaultCategoryId: new FormControl(''),
			defaultSkuId: new FormControl(''),
			name: new FormControl(''),
			longDescription: new FormControl(''),

		});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}

	public hasError(controlName: string, errorName: string): any {
		return this.productForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

	public createProduct = (productFormValue) => {
		if (this.productForm.valid) {
			this.executeProductCreation(productFormValue);
		}
	}

	private executeProductCreation = (productFormValue) => {
		const product: Product = {
			productId: '',
			archived: productFormValue.archived,
			canSellWithoutOptions: productFormValue.canSellWithoutOptions,
			canonicalUrl: productFormValue.canonicalUrl,
			displayTemplate: productFormValue.displayTemplate,
			isFeaturedProduct: productFormValue.isFeaturedProduct,
			manufacture: productFormValue.manufacture,
			metaDesc: productFormValue.metaDesc,
			metaTitle: productFormValue.metaTitle,
			model: productFormValue.model,
			overrideGeneratedUrl: productFormValue.overrideGeneratedUrl,
			url: productFormValue.url,
			urlKey: productFormValue.urlKey,
			defaultCategoryId: productFormValue.defaultCategoryId,
			defaultSkuId: productFormValue.defaultSkuId,
			name: productFormValue.name,
			longDescription: productFormValue.longDescription,

		};

		const apiUrl = 'products';
		this._repository.create(apiUrl, product)
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
