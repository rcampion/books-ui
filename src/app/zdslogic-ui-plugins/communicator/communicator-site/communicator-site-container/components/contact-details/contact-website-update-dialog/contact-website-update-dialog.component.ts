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
    selector: 'app-contact-website-update-dialog',
    templateUrl: './contact-website-update-dialog.component.html',
    styleUrls: ['./contact-website-update-dialog.component.scss']
})
export class ContactWebsiteUpdateDialogComponent implements OnInit {
    websiteTypes: WebsiteType[] = [
        { value: 0, viewValue: 'Personal' },
        { value: 1, viewValue: 'Business' }
    ];

    websiteId: string;
    public website: Website;
    public websiteForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});

    constructor(private _angularLogService: AngularLogService,

        private _location: Location,

        private _repository: ContactsService,

        private _activeRoute: ActivatedRoute,

        private _errorHandlerService: ErrorHandlerService,

        private _dialogRef: MatDialogRef<ContactWebsiteUpdateDialogComponent>,

        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.websiteId = data.websiteId;
    }

    ngOnInit(): void  {

        this.websiteForm = new UntypedFormGroup({
            websiteId: new FormControl(''),
            contactId: new FormControl(''),
            website: new FormControl('', [Validators.required]),
            websiteKind: new FormControl(''),

        });

        this.getWebsiteDetails();

    }

    private getWebsiteDetails(): any {

        const apiUrl = `contacts/website/website/${this.websiteId}`;

        this._repository.getData(apiUrl)
            .subscribe((result) => {
                this.website = result as Website;
                this.populateForm();
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                });
    }

    private populateForm(): void {
        this.websiteForm.controls['websiteId'].setValue(this.website.websiteId);
        this.websiteForm.controls['contactId'].setValue(this.website.contactId);
        this.websiteForm.controls['website'].setValue(this.website.website);
        this.websiteForm.controls['websiteKind'].setValue(this.website.websiteKind);
    }

    public updateWebsite(websiteFormValue): void {
        if (this.websiteForm.valid) {
            this.executeWebsiteUpdate(websiteFormValue);
        }
    }

    private executeWebsiteUpdate(websiteFormValue): any {
        const website: Website = {
            websiteId: websiteFormValue.websiteId,
            contactId: websiteFormValue.contactId,
            website: websiteFormValue.website,
            websiteKind: websiteFormValue.websiteKind,
        };

        const apiUrl = 'contacts/website/website';
        this._repository.update(apiUrl, website)
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


