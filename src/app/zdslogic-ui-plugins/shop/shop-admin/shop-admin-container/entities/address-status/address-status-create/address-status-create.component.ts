import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { AddressStatusService } from '../../../../../core/services/address-status.service';
import { AddressStatus } from '../../../../../core/models/address-status.model';
import { SuccessDialogComponent } from '../../../../../../../zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-address-status-create',
	templateUrl: './address-status-create.component.html',
	styleUrls: ['./address-status-create.component.scss']
})
export class AddressStatusCreateComponent implements OnInit {

	public addressStatusForm: UntypedFormGroup = new UntypedFormGroup({
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
		private _repository: AddressStatusService,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {

		this.addressStatusForm = new UntypedFormGroup({
			statusId: new FormControl(''),
			addressStatus: new FormControl(''),
		});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}

	public hasError(controlName: string, errorName: string): any {
		return this.addressStatusForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

	public createAddressStatus(addressStatusFormValue): void {
		if (this.addressStatusForm.valid) {
			this.executeAddressStatusCreation(addressStatusFormValue);
		}
	}

	private executeAddressStatusCreation(addressStatusFormValue): any {
		const address: AddressStatus = {
			statusId: '',
			addressStatus: addressStatusFormValue.addressStatus,
	};

		const apiUrl = 'books/address/status';
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
