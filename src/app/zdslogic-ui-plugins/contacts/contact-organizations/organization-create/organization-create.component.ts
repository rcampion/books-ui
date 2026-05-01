import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { OrganizationsService } from '../../core/services/organizations.service';
import { Organization } from '../../core/interfaces/organization.model';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
    selector: 'app-organization-create',
    templateUrl: './organization-create.component.html',
    styleUrls: ['./organization-create.component.scss']
})
export class OrganizationCreateComponent implements OnInit {
    public organizationForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});
    private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

    // tslint:disable-next-line:max-line-length
    constructor(private _angularLogService: AngularLogService,private _location: Location, private _repository: OrganizationsService, private _dialog: MatDialog, private _errorHandlerService: ErrorHandlerService) { }

    ngOnInit(): void  {
        this.organizationForm = new UntypedFormGroup({
            organizationId: new FormControl(''),
            organizationName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            organizationDescription: new FormControl('', [Validators.required, Validators.maxLength(120)])

        });

        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };
    }

    public hasError(controlName: string, errorName: string): any {
        return this.organizationForm.controls[controlName].hasError(errorName);
    }

    public onCancel(): void {
        this._location.back();
    }

    public createOrganization = (organizationFormValue) => {
        if (this.organizationForm.valid) {
            this.executeOrganizationCreation(organizationFormValue);
        }
    }

    private executeOrganizationCreation = (organizationFormValue) => {
        const organization: Organization = {
            organizationId: '',
            organizationName: organizationFormValue.organizationName,
            organizationDescription: organizationFormValue.organizationDescription,

        };

        const apiUrl = 'organization';
        this._repository.create(apiUrl, organization)
            .subscribe((result) => {
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
