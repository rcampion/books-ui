import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from '../..//core/services/contacts.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Phone } from '../../core/interfaces/phone.model';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export interface PhoneType {
    value: number;
    viewValue: string;
}

@Component({
    selector: 'app-contact-phone-update-dialog',
    templateUrl: './contact-phone-update-dialog.component.html',
    styleUrls: ['./contact-phone-update-dialog.component.scss']
})
export class ContactPhoneUpdateDialogComponent implements OnInit {
    phoneTypes: PhoneType[] = [
        { value: 0, viewValue: 'Home' },
        { value: 1, viewValue: 'Office' },
        { value: 2, viewValue: 'Mobile' },
        { value: 3, viewValue: 'Fax' }
    ];
    phoneId: string;
    public phone: Phone;
    public phoneForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});

    constructor(private _angularLogService: AngularLogService,

        private _location: Location,

        private _repository: ContactsService,

        private _activeRoute: ActivatedRoute,

        private _errorHandlerService: ErrorHandlerService,

        private _dialogRef: MatDialogRef<ContactPhoneUpdateDialogComponent>,

        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.phoneId = data.phoneId;
    }

    ngOnInit(): void  {

        this.phoneForm = new UntypedFormGroup({
            phoneId: new FormControl(''),
            contactId: new FormControl(''),
            phone: new FormControl('', [Validators.required]),
            phoneKind: new FormControl(''),

        });

        this.getPhoneDetails();


    }
    private getPhoneDetails(): any {

        const apiUrl = `contacts/phone/phone/${this.phoneId}`;

        this._repository.getData(apiUrl)
            .subscribe((result) => {
                this.phone = result as Phone;
                this.populateForm();
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                });
    }

    private populateForm(): void {
        this.phoneForm.controls['phoneId'].setValue(this.phone.phoneId);
        this.phoneForm.controls['contactId'].setValue(this.phone.contactId);
        this.phoneForm.controls['phone'].setValue(this.phone.phone);
        this.phoneForm.controls['phoneKind'].setValue(this.phone.phoneKind);
    }

    public updatePhone(phoneFormValue): void {
        if (this.phoneForm.valid) {
            this.executePhoneUpdate(phoneFormValue);
        }
    }

    private executePhoneUpdate(phoneFormValue): any {
        const phone: Phone = {
            phoneId: phoneFormValue.phoneId,
            contactId: phoneFormValue.contactId,
            phone: phoneFormValue.phone,
            phoneKind: phoneFormValue.phoneKind,
        };

        const apiUrl = 'contacts/phone/phone';
        this._repository.update(apiUrl, phone)
            .subscribe((result) => {
                this._dialog.closeAll();
            },
                ((error) => {
                    this._errorHandlerService.handleError(error);
                })
            );
    }

    public hasError(controlName: string, errorName: string): any {
        return this.phoneForm.controls[controlName].hasError(errorName);
    }

    public onCancel(): void {
        this._dialog.closeAll();
    }
}


