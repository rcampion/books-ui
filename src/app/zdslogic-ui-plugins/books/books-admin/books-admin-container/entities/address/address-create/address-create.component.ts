import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { AddressService } from '../../../../../core/services/address.service';
import { Address } from '../../../../../core/models/address.model';
import { SuccessDialogComponent } from '../../../../../../../zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-address-create',
	templateUrl: './address-create.component.html',
	styleUrls: ['./address-create.component.scss']
})
export class AddressCreateComponent implements OnInit {

	public addressForm: UntypedFormGroup = new UntypedFormGroup({
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
		private _repository: AddressService,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {

		this.addressForm = new UntypedFormGroup({
			addressId: new FormControl(''),
			streetNumber: new FormControl(''),
			streetName: new FormControl(''),
			city: new FormControl(''),
			countryId: new FormControl(''),
		});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}
	/*
		public hasError(controlName: string, errorName: string): any {
			return this.addressForm.controls[controlName].hasError(errorName);
		}
	*/
	public hasError(controlName: string, errorName: string): any {
		return this.addressForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

	public createAddress(addressFormValue): void {
		if (this.addressForm.valid) {
			this.executeAddressCreation(addressFormValue);
		}
	}

	private executeAddressCreation(addressFormValue): any {
		const address: Address = {
			addressId: '',
			streetNumber: addressFormValue.streetNumber,
			streetName: addressFormValue.streetName,
			city: addressFormValue.city,
			countryId: addressFormValue.countryId,
		};

		const apiUrl = 'books/address';
		this._repository.create(apiUrl, address)
			.subscribe((res) => {
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
