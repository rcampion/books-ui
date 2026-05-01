import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from '../../core/services/contacts.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { EMail } from 'app/zdslogic-ui-base/core/interfaces/email.model';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export interface EMailType {
    value: number;
    viewValue: string;
}

export interface PriorityType {
	value: number;
	viewValue: string;
}

@Component({
    selector: 'app-contact-email-create-dialog',
    templateUrl: './contact-email-create-dialog.component.html',
    styleUrls: ['./contact-email-create-dialog.component.scss']
})
export class ContactEmailCreateDialogComponent implements OnInit {
    contactId: string;
    public email: EMail;
    public emailForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});

    emailTypes: EMailType[] = [
        { value: 0, viewValue: 'Personal' },
        { value: 1, viewValue: 'Business' }
    ];
	priorityTypes: PriorityType[] = [
		{ value: 0, viewValue: 'Primary' },
		{ value: 1, viewValue: 'Secondary' }
	];
    constructor(private _angularLogService: AngularLogService,
        private _location: Location,

        private _repository: ContactsService,

        private _activeRoute: ActivatedRoute,

        private _errorHandlerService: ErrorHandlerService,

        private _dialogRef: MatDialogRef<ContactEmailCreateDialogComponent>,

        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.contactId = data.contactId;
    }

    ngOnInit(): void  {

        this.emailForm = new UntypedFormGroup({
            emailId: new FormControl(''),
            contactId: new FormControl(''),
            email: new FormControl('', [Validators.required, Validators.email]),
            emailKind: new FormControl(''),
            priorityKind: new FormControl(''),

        });

    }

    public createEMail(emailFormValue): void {
        if (this.emailForm.valid) {
            this.executeEMailCreate(emailFormValue);
        }
    }

    private executeEMailCreate(emailFormValue): any {
        const email: EMail = {
            emailId: emailFormValue.emailId,
            contactId: this.contactId,
            email: emailFormValue.email,
            emailKind: emailFormValue.emailKind,
            priorityKind: emailFormValue.priorityKind,
        };

        const apiUrl = 'contacts/email/email';
        this._repository.create(apiUrl, email)
            .subscribe((result) => {
                this._dialog.closeAll();
            },
                ((error) => {
                    this._errorHandlerService.handleError(error);
                })
            );
    }

    public hasError(controlName: string, errorName: string): any {
        return this.emailForm.controls[controlName].hasError(errorName);
    }

    public onCancel(): void {
        this._dialog.closeAll();
    }
}


