import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from '../../core/services/contacts.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Address } from '../../core/interfaces/address.model';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export interface AddressType {
    value: number;
    viewValue: string;
}
@Component({
    selector: 'app-contact-address-create-dialog',
    templateUrl: './contact-address-create-dialog.component.html',
    styleUrls: ['./contact-address-create-dialog.component.scss']
})
export class ContactAddressCreateDialogComponent implements OnInit {
    contactId: string;
    public address: Address;
    public addressForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});

    addressTypes: AddressType[] = [
        { value: 0, viewValue: 'Personal' },
        { value: 1, viewValue: 'Business' },
        { value: 2, viewValue: 'Shipping' }

    ];

    constructor(private _angularLogService: AngularLogService,
        private _location: Location,

        private _repository: ContactsService,

        private _activeRoute: ActivatedRoute,

        private _errorHandlerService: ErrorHandlerService,

        private _dialogRef: MatDialogRef<ContactAddressCreateDialogComponent>,

        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.contactId = data.contactId;
    }

    ngOnInit(): void  {

        this.addressForm = new UntypedFormGroup({
            addressId: new FormControl(''),
            contactId: new FormControl(''),
            addressLine1: new FormControl(''),
            addressLine2: new FormControl(''),
            addressCity: new FormControl(''),
            addressState: new FormControl(''),
            addressCountry: new FormControl(''),
            addressZip: new FormControl(''),
            addressKind: new FormControl(''),

        });

    }

    public createAddress(addressFormValue): void {
        if (this.addressForm.valid) {
            this.executeAddressCreate(addressFormValue);
        }
    }

    private executeAddressCreate(addressFormValue): any {
        const address: Address = {
            addressId: addressFormValue.addressId,
            contactId: this.contactId,
            addressLine1: addressFormValue.addressLine1,
            addressLine2: addressFormValue.addressLine2,
            addressCity: addressFormValue.addressCity,
            addressState: addressFormValue.addressState,
            addressCountry: addressFormValue.addressCountry,
            addressZip: addressFormValue.addressZip,
            addressKind: addressFormValue.addressKind,
        };

        const apiUrl = 'contacts/address/address';
        this._repository.create(apiUrl, address)
            .subscribe((result) => {
                this._dialog.closeAll();
            },
                ((error) => {
                    this._errorHandlerService.handleError(error);
                })
            );
    }

    public hasError(controlName: string, errorName: string): any {
        return this.addressForm.controls[controlName].hasError(errorName);
    }

    public onCancel(): void {
        this._dialog.closeAll();
    }
}


