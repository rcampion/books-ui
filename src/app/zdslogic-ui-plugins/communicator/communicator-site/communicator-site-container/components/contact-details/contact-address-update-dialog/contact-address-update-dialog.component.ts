import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
	selector: 'app-contact-address-update-dialog',
	templateUrl: './contact-address-update-dialog.component.html',
	styleUrls: ['./contact-address-update-dialog.component.scss']
})
export class ContactAddressUpdateDialogComponent implements OnInit {
	addressId: string;
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

		private _dialogRef: MatDialogRef<ContactAddressUpdateDialogComponent>,

		private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

		this.addressId = data.addressId;
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

		this.getAddressDetails();

	}

	private getAddressDetails(): any {

		const apiUrl = `contacts/address/address/${this.addressId}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.address = result as Address;
				this.populateForm();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private populateForm(): void {
		this.addressForm.controls['addressId'].setValue(this.address.addressId);
		this.addressForm.controls['contactId'].setValue(this.address.contactId);
		this.addressForm.controls['addressLine1'].setValue(this.address.addressLine1);
		this.addressForm.controls['addressLine2'].setValue(this.address.addressLine2);
		this.addressForm.controls['addressCity'].setValue(this.address.addressCity);
		this.addressForm.controls['addressState'].setValue(this.address.addressState);
		this.addressForm.controls['addressCountry'].setValue(this.address.addressCountry);
		this.addressForm.controls['addressZip'].setValue(this.address.addressZip);
		this.addressForm.controls['addressKind'].setValue(this.address.addressKind);

	}

	public updateAddress(addressFormValue): any {
		if (this.addressForm.valid) {
			this.executeAddressUpdate(addressFormValue);
		}
	}

	private executeAddressUpdate(addressFormValue): any {
		const address: Address = {
			addressId: addressFormValue.addressId,
			contactId: addressFormValue.contactId,
            addressLine1: addressFormValue.addressLine1,
            addressLine2: addressFormValue.addressLine2,
            addressCity: addressFormValue.addressCity,
            addressState: addressFormValue.addressState,
            addressCountry: addressFormValue.addressCountry,
            addressZip: addressFormValue.addressZip,
            addressKind: addressFormValue.addressKind,
		};

		const apiUrl = 'contacts/address/address';
		this._repository.update(apiUrl, address)
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

	selected(event): any {
		const target = event.source.selected._element.nativeElement;
		const selectedData = {
			value: event.value,
			text: target.innerText.trim()
		};
		//console.log(selectedData);
	}
}

