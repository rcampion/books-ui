import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { AddressService } from '../../../../../core/services/address.service';
import { Address } from '../../../../../core/models/address.model';
import { SuccessDialogComponent } from '../../../../../../../zdslogic-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../../../../../zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-base/core/services/angular-log.service';

@Component({
    selector: 'app-address-update',
    templateUrl: './address-update.component.html',
    styleUrls: ['./address-update.component.scss']
})
export class AddressUpdateComponent implements OnInit {
    public address: Address;
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
        private _router: Router,
        private _activeRoute: ActivatedRoute,
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

        this.getAddressDetails();


    }
    private getAddressDetails(): any {
        const id: string = this._activeRoute.snapshot.params['id'];
        const apiUrl = `addresss/${id}`;

        this._repository.getData(apiUrl)
            .subscribe((res) => {
                this.address = res as Address;
                this.populateForm();
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                });
    }

    private populateForm(): void {
			this.addressForm.controls['addressId'].setValue(this.address.addressId);
			this.addressForm.controls['streetNumber'].setValue(this.address.streetNumber);
			this.addressForm.controls['streetName'].setValue(this.address.streetName);
			this.addressForm.controls['city'].setValue(this.address.city);
			this.addressForm.controls['countryId'].setValue(this.address.countryId);
    }

    public updateAddress(addressFormValue): void {
        if (this.addressForm.valid) {
            this.executeAddressUpdate(addressFormValue);
        }
    }

    private executeAddressUpdate(addressFormValue): void {
        const address: Address = {
			addressId: addressFormValue.addressId,
			streetNumber: addressFormValue.streetNumber,
			streetName: addressFormValue.streetName,
			city: addressFormValue.city,
			countryId: addressFormValue.countryId,
         };

        const apiUrl = 'books/address';
        this._repository.update(apiUrl, address)
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

    public hasError(controlName: string, errorName: string): any {
        return this.addressForm.controls[controlName].hasError(errorName);
    }

    public onCancel(): void {
        this._location.back();
    }

}
