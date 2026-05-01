import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDatetimePickerInputEvent } from '@angular-material-components/datetime-picker';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Sku } from '../../../../../../core/interfaces/sku.model';
import { SkusService } from '../../../../../../core/services/skus.service';

import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-sku-update',
	templateUrl: './product-sku-update.component.html',
	styleUrls: ['./product-sku-update.component.css']
})
export class ProductSkuUpdateComponent implements OnInit {
	public sku: Sku;
	public skuForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});
	get f(): any {
		return this.skuForm.controls;
	}
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
		private _repository: SkusService,
		private _dialog: MatDialog,
		router: Router,
		private _activeRoute: ActivatedRoute,
		private ngbcalendar: NgbCalendar,
		public formatter: NgbDateParserFormatter,
		private _errorHandlerService: ErrorHandlerService) { }


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

		this.getSkuDetails();


	}
	private getSkuDetails = () => {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `skus/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.sku = result as Sku;
				this.populateForm();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private populateForm() {
		this.skuForm.controls['skuId'].setValue(this.sku.skuId);

		const endDate = new Date(this.sku.activeEndDate);
		this.skuForm.controls['activeEndDate'].setValue(endDate);

		const startDate = new Date(this.sku.activeStartDate);
		this.skuForm.controls['activeStartDate'].setValue(startDate);

		this.skuForm.controls['addlProductId'].setValue(this.sku.addlProductId);
		this.skuForm.controls['availableFlag'].setValue(this.sku.availableFlag);
		this.skuForm.controls['containerShape'].setValue(this.sku.containerShape);
		this.skuForm.controls['containerSize'].setValue(this.sku.containerSize);
		this.skuForm.controls['cost'].setValue(this.sku.cost);
		this.skuForm.controls['currencyCode'].setValue(this.sku.currencyCode);
		this.skuForm.controls['defaultProductId'].setValue(this.sku.defaultProductId);
		this.skuForm.controls['depth'].setValue(this.sku.depth);
		this.skuForm.controls['description'].setValue(this.sku.description);
		this.skuForm.controls['dimensionUnitOfMeasure'].setValue(this.sku.dimensionUnitOfMeasure);
		this.skuForm.controls['discountableFlag'].setValue(this.sku.discountableFlag);
		this.skuForm.controls['displayTemplate'].setValue(this.sku.displayTemplate);
		this.skuForm.controls['externalId'].setValue(this.sku.externalId);
		this.skuForm.controls['fulfillmentType'].setValue(this.sku.fulfillmentType);
		this.skuForm.controls['girth'].setValue(this.sku.girth);
		this.skuForm.controls['height'].setValue(this.sku.height);
		this.skuForm.controls['inventoryType'].setValue(this.sku.inventoryType);
		this.skuForm.controls['isMachineSortable'].setValue(this.sku.isMachineSortable);
		this.skuForm.controls['longDescription'].setValue(this.sku.longDescription);
		this.skuForm.controls['name'].setValue(this.sku.name);
		this.skuForm.controls['quantityAvailable'].setValue(this.sku.quantityAvailable);
		this.skuForm.controls['retailPrice'].setValue(this.sku.retailPrice);
		this.skuForm.controls['salePrice'].setValue(this.sku.salePrice);
		this.skuForm.controls['taxCode'].setValue(this.sku.taxCode);
		this.skuForm.controls['taxableFlag'].setValue(this.sku.taxableFlag);
		this.skuForm.controls['upc'].setValue(this.sku.upc);
		this.skuForm.controls['urlKey'].setValue(this.sku.urlKey);
		this.skuForm.controls['weight'].setValue(this.sku.weight);
		this.skuForm.controls['weightUnitOfMeasure'].setValue(this.sku.weightUnitOfMeasure);
		this.skuForm.controls['width'].setValue(this.sku.width);

	}

	public updateSku = (skuFormValue) => {
		if (this.skuForm.valid) {
			this.executeSkuUpdate(skuFormValue);
		}
	}

	private executeSkuUpdate = (skuFormValue) => {
		const sku: Sku = {
			skuId: skuFormValue.skuId,
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
		this._repository.update(apiUrl, sku)
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
		return this.skuForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

	setStartDate(value: string): void {
		this.f.activeStartDate.setValue(this.validateInput(this.f.activeStartDate.value, value));
	}

	setEndDate(value: string): void {
		this.f.activeEndDate.setValue(this.validateInput(this.f.activeEndDate.value, value));
	}
	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.ngbcalendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}
	/*	
		addEvent(type: string, event: MatDatetimePickerInputEvent<Date>) {
			//this.events.push(`${type}: ${event.value}`);
			if (type === 'change') {
				let date = new Date(event.value);
				////console.log(date);
	
				//let temp = new NgbDate(test.getFullYear(),test.getMonth(),test.getDay());
	
				//let temp = NgbDate.from(test);
	
				var ngbDateStruct = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() };
	
				//this.tempDate = new Date(Date.UTC(test.getFullYear(), test.getMonth() - 1, test.getDay(),test.getHours(), test.getMinutes()));
				//this.tempDate = new Date(Date.UTC(test.getFullYear(), test.getMonth() - 1, test.getDay(),test.getHours(), test.getMinutes()));
				//this.tempDate.year = test.getFullYear();
				//this.tempDate.month = test.getMonth();
				//this.tempDate.day = test.getDay();
	
				let temp = new NgbDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
				////console.log(temp);
	
				this.onDateSelection(temp);
			}
		}
		
		onDateSelection(date: NgbDate): void {
			if (!this.f.rrule_start.value && !this.f.rrule_end.value) {
				this.f.rrule_start.setValue(date);
			} else if (this.f.rrule_start.value && !this.f.rrule_end.value && date && date.after(this.f.rrule_start.value)) {
				this.f.rrule_end.setValue(date);
			} else {
				this.f.rrule_end.setValue(null);
				this.f.rrule_start.setValue(date);
			}
		}
	*/
}
