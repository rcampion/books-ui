import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from '../../core/services/contacts.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Phone } from '../../core/interfaces/phone.model';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export interface PhoneType {
    value: number;
    viewValue: string;
}

@Component({
    selector: 'app-contact-phone-create-dialog',
    templateUrl: './contact-phone-create-dialog.component.html',
    styleUrls: ['./contact-phone-create-dialog.component.scss']
})
export class ContactPhoneCreateDialogComponent implements OnInit {
    phoneTypes: PhoneType[] = [
        { value: 0, viewValue: 'Home' },
        { value: 1, viewValue: 'Office' },
        { value: 2, viewValue: 'Mobile' },
        { value: 3, viewValue: 'Fax' }
    ];

    contactId: string;
    public phone: Phone;
    public phoneForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});

    constructor(private _angularLogService: AngularLogService,
        private _location: Location,

        private _repository: ContactsService,

        private _activeRoute: ActivatedRoute,

        private _errorHandlerService: ErrorHandlerService,

        private _dialogRef: MatDialogRef<ContactPhoneCreateDialogComponent>,

        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.contactId = data.contactId;
    }

    ngOnInit(): void  {

        this.phoneForm = new UntypedFormGroup({

            contactId: new FormControl(''),
            phone: new FormControl('', [Validators.required]),
            phoneKind: new FormControl(''),

        });

    }

    public createPhone(phoneFormValue): void{
        if (this.phoneForm.valid) {
            this.executePhoneCreate(phoneFormValue);
        }
    }

    private executePhoneCreate(phoneFormValue): any {
        const phone: Phone = {
            phoneId: phoneFormValue.phoneId,
            contactId: this.contactId,
            phone: phoneFormValue.phone,
            phoneKind: phoneFormValue.phoneKind,
        };

        const apiUrl = 'contacts/phone/phone';
        this._repository.create(apiUrl, phone)
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



