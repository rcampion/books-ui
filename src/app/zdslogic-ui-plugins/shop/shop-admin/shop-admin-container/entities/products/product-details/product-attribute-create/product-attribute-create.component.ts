import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ProductAttributesService } from '../../../../../../core/services/product-attributes.service';
import { ProductAttribute } from '../../../../../../core/interfaces/product-attribute.model';

import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-attribute-create',
	templateUrl: './product-attribute-create.component.html',
	styleUrls: ['./product-attribute-create.component.scss']
})
export class ProductAttributeCreateComponent implements OnInit {
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
		private _errorHandlerService: ErrorHandlerService) { }

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
	}

	public hasError(controlName: string, errorName: string): any {
		return this.productAttributeForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

	public createProductAttribute = (productAttributeFormValue) => {
		if (this.productAttributeForm.valid) {
			this.executeProductAttributeCreation(productAttributeFormValue);
		}
	}

	private executeProductAttributeCreation = (productAttributeFormValue) => {
		const productAttribute: ProductAttribute = {
			productAttributeId: "",
			name: productAttributeFormValue.name,
			productId: productAttributeFormValue.pridcutId,
			value: productAttributeFormValue.value,
		};

		const apiUrl = 'productAttribute';
		this._repository.create(apiUrl, productAttribute)
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
