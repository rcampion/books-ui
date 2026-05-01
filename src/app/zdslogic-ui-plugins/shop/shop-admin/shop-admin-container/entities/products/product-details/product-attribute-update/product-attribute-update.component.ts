import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ProductAttribute } from '../../../../../../core/interfaces/product-attribute.model';
import { ProductAttributesService } from '../../../../../../core/services/product-attributes.service';

import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-attribute-update',
	templateUrl: './product-attribute-update.component.html',
	styleUrls: ['./product-attribute-update.component.scss']
})
export class ProductAttributeUpdateComponent implements OnInit {
	public productAttribute: ProductAttribute;
	public productAttributeForm: UntypedFormGroup = new UntypedFormGroup({
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
		private _repository: ProductAttributesService,
		private _dialog: MatDialog,
		router: Router,
		private _activeRoute: ActivatedRoute, private _errorHandlerService: ErrorHandlerService) { }


	ngOnInit(): void {

		this.productAttributeForm = new UntypedFormGroup({
			productAttributeId: new FormControl(''),
			name: new FormControl(''),
			productId: new FormControl(''),
			value: new FormControl(''),
		});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

		this.getProductAttributeDetails();


	}
	private getProductAttributeDetails = () => {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `productAttribute/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.productAttribute = result as ProductAttribute;
				this.populateForm();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private populateForm() {
		this.productAttributeForm.controls['productAttributeId'].setValue(this.productAttribute.productAttributeId);
		this.productAttributeForm.controls['name'].setValue(this.productAttribute.name);
		this.productAttributeForm.controls['productId'].setValue(this.productAttribute.productId);
		this.productAttributeForm.controls['value'].setValue(this.productAttribute.value);

	}

	public updateProductAttribute = (productAttributeFormValue) => {
		if (this.productAttributeForm.valid) {
			this.executeProductAttributeUpdate(productAttributeFormValue);
		}
	}

	private executeProductAttributeUpdate = (productAttributeFormValue) => {
		const productAttribute: ProductAttribute = {
			productAttributeId: productAttributeFormValue.productAttributeId,
			name: productAttributeFormValue.name,
			productId: productAttributeFormValue.pridcutId,
			value: productAttributeFormValue.value,
		};

		const apiUrl = 'productAttribute';
		this._repository.update(apiUrl, productAttribute)
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
		return this.productAttributeForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

}
