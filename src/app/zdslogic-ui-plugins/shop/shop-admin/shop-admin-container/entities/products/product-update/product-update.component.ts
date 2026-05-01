import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ProductsService } from '../../../../../core/services/products.service';
import { Product } from '../../../../../core/interfaces/product.model';

import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-update',
	templateUrl: './product-update.component.html',
	styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
	public product: Product;
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
	constructor(private _angularLogService: AngularLogService, private _location: Location, private _repository: ProductsService, private _dialog: MatDialog,
		router: Router,
		private _activeRoute: ActivatedRoute, private _errorHandlerService: ErrorHandlerService) { }


	ngOnInit(): void  {

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

		this.getProductDetails();


	}
	private getProductDetails = () => {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `products/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.product = result as Product;
				this.populateForm();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private populateForm() {
		this.productForm.controls['productId'].setValue(this.product.productId);
		this.productForm.controls['archived'].setValue(this.product.archived);
		this.productForm.controls['canSellWithoutOptions'].setValue(this.product.canSellWithoutOptions);
		this.productForm.controls['canonicalUrl'].setValue(this.product.canonicalUrl);
		this.productForm.controls['displayTemplate'].setValue(this.product.displayTemplate);
		this.productForm.controls['isFeaturedProduct'].setValue(this.product.isFeaturedProduct);
		this.productForm.controls['manufacture'].setValue(this.product.manufacture);
		this.productForm.controls['metaDesc'].setValue(this.product.metaDesc);
		this.productForm.controls['metaTitle'].setValue(this.product.metaTitle);
		this.productForm.controls['model'].setValue(this.product.model);
		this.productForm.controls['overrideGeneratedUrl'].setValue(this.product.overrideGeneratedUrl);
		this.productForm.controls['url'].setValue(this.product.url);
		this.productForm.controls['urlKey'].setValue(this.product.urlKey);
		this.productForm.controls['defaultCategoryId'].setValue(this.product.defaultCategoryId);
		this.productForm.controls['defaultSkuId'].setValue(this.product.defaultSkuId);
		this.productForm.controls['name'].setValue(this.product.name);
		this.productForm.controls['longDescription'].setValue(this.product.longDescription);
	}

	public updateProduct = (productFormValue) => {
		if (this.productForm.valid) {
			this.executeProductUpdate(productFormValue);
		}
	}

	private executeProductUpdate = (productFormValue) => {
		const product: Product = {
			productId: productFormValue.productId,
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
		this._repository.update(apiUrl, product)
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
		return this.productForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

}
