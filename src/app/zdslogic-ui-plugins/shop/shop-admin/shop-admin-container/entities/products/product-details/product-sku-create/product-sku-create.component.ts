import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { SkusService } from '../../../../../../core/services/skus.service';
import { Sku } from '../../../../../../core/interfaces/sku.model';

import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-sku-create',
	templateUrl: './product-sku-create.component.html',
	styleUrls: ['./product-sku-create.component.scss']
})
export class ProductSkuCreateComponent implements OnInit {
	public skuForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});
	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	// tslint:disable-next-line:max-line-length
	constructor(private _angularLogService: AngularLogService, private _location: Location, private _repository: SkusService, private _dialog: MatDialog, private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {

		this.skuForm = new UntypedFormGroup({

			skuId: new FormControl(''),
			activeEndDate: new FormControl(''),
			activeStartDate: new FormControl(''),
			addlProductId: new FormControl(''),
			availableFlag: new FormControl(''),
			containerShape: new FormControl(''),
			containerSize: new FormControl(''),
			cost: new FormControl(''),
			currencyCode: new FormControl(''),
			defaultProductId: new FormControl(''),
			depth: new FormControl(''),
			description: new FormControl(''),
			dimensionUnitOfMeasure: new FormControl(''),
			discountableFlag: new FormControl(''),
			displayTemplate: new FormControl(''),
			externalId: new FormControl(''),
			fulfillmentType: new FormControl(''),
			girth: new FormControl(''),
			height: new FormControl(''),
			inventoryType: new FormControl(''),
			isMachineSortable: new FormControl(''),
			longDescription: new FormControl(''),
			name: new FormControl(''),
			quantityAvailable: new FormControl(''),
			retailPrice: new FormControl(''),
			salePrice: new FormControl(''),
			taxCode: new FormControl(''),
			taxableFlag: new FormControl(''),
			upc: new FormControl(''),
			urlKey: new FormControl(''),
			weight: new FormControl(''),
			weightUnitOfMeasure: new FormControl(''),
			width: new FormControl(''),

		});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}

	public hasError(controlName: string, errorName: string): any {
		return this.skuForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

	public createSku = (skuFormValue) => {
		if (this.skuForm.valid) {
			this.executeSkuCreation(skuFormValue);
		}
	}

	private executeSkuCreation = (skuFormValue) => {
		const sku: Sku = {
			skuId: "",
			activeEndDate: skuFormValue.activeEndDate,
			activeStartDate: skuFormValue.activeStartDate,
			addlProductId: skuFormValue.ddlProductId,
			availableFlag: skuFormValue.availableFlag,
			containerShape: skuFormValue.containerShape,
			containerSize: skuFormValue.containerSize,
			cost: skuFormValue.cost,
			currencyCode: skuFormValue.currencyCode,
			defaultProductId: skuFormValue.defaultProductId,
			depth: skuFormValue.depth,
			description: skuFormValue.description,
			dimensionUnitOfMeasure: skuFormValue.dimensionUnitOfMeasure,
			discountableFlag: skuFormValue.discountableFlag,
			displayTemplate: skuFormValue.displayTemplate,
			externalId: skuFormValue.externalId,
			fulfillmentType: skuFormValue.fulfillmentType,
			girth: skuFormValue.girth,
			height: skuFormValue.height,
			inventoryType: skuFormValue.inventoryType,
			isMachineSortable: skuFormValue.isMachineSortable,
			longDescription: skuFormValue.longDescription,
			name: skuFormValue.name,
			quantityAvailable: skuFormValue.quantityAvailable,
			retailPrice: skuFormValue.retailPrice,
			salePrice: skuFormValue.salePrice,
			taxCode: skuFormValue.taxCode,
			taxableFlag: skuFormValue.taxableFlag,
			upc: skuFormValue.upc,
			urlKey: skuFormValue.urlKey,
			weight: skuFormValue.weight,
			weightUnitOfMeasure: skuFormValue.weightUnitOfMeasure,
			width: skuFormValue.width

		};

		const apiUrl = 'skus';
		this._repository.create(apiUrl, sku)
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
