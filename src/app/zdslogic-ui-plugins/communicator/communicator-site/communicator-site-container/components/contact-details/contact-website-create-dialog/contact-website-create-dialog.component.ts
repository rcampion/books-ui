import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from '../../core/services/contacts.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Website } from '../../core/interfaces/website.model';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export interface WebsiteType {
    value: number;
    viewValue: string;
}

@Component({
    selector: 'app-contact-website-create-dialog',
    templateUrl: './contact-website-create-dialog.component.html',
    styleUrls: ['./contact-website-create-dialog.component.scss']
})
export class ContactWebsiteCreateDialogComponent implements OnInit {
    websiteTypes: WebsiteType[] = [
        { value: 0, viewValue: 'Personal' },
        { value: 1, viewValue: 'Business' }
    ];

    contactId: string;
    public website: Website;
    public websiteForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});

    constructor(private _angularLogService: AngularLogService,
        private _location: Location,

        private _repository: ContactsService,

        private _activeRoute: ActivatedRoute,

        private _errorHandlerService: ErrorHandlerService,

        private _dialogRef: MatDialogRef<ContactWebsiteCreateDialogComponent>,

        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.contactId = data.contactId;
    }

    ngOnInit(): void  {

        this.websiteForm = new UntypedFormGroup({

            contactId: new FormControl(''),
            website: new FormControl('', [Validators.required]),
            websiteKind: new FormControl(''),

        });

    }

    public createWebsite(websiteFormValue): void {
        if (this.websiteForm.valid) {
            this.executeWebsiteCreate(websiteFormValue);
        }
    }

    private executeWebsiteCreate(websiteFormValue): any {
        const website: Website = {
            websiteId: websiteFormValue.websiteId,
            contactId: this.contactId,
            website: websiteFormValue.website,
            websiteKind: websiteFormValue.websiteKind,
        };

        const apiUrl = 'contacts/website/website';
        this._repository.create(apiUrl, website)
            .subscribe((result) => {
                this._dialog.closeAll();
            },
                ((error) => {
                    this._errorHandlerService.handleError(error);
                })
            );
    }

    public hasError(controlName: string, errorName: string): any {
        return this.websiteForm.controls[controlName].hasError(errorName);
    }

    public onCancel(): void {
        this._dialog.closeAll();
    }
}



