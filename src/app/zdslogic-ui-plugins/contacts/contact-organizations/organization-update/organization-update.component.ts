import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Organization } from '../../core/interfaces/organization.model';
import { Router, ActivatedRoute } from '@angular/router';
import { OrganizationsService } from '../../core/services/organizations.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
    selector: 'app-organization-update',
    templateUrl: './organization-update.component.html',
    styleUrls: ['./organization-update.component.css']
})
export class OrganizationUpdateComponent implements OnInit {
    public organization: Organization;
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
    constructor(private _angularLogService: AngularLogService,private _location: Location, private _repository: OrganizationsService, private _dialog: MatDialog,
        _router: Router,
        private _activeRoute: ActivatedRoute, private _errorHandlerService: ErrorHandlerService) { }


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

        this.getOrganizationDetails();


    }
    private getOrganizationDetails = () => {
        const id: string = this._activeRoute.snapshot.params['id'];
        const apiUrl = `organization/${id}`;

        this._repository.getData(apiUrl)
            .subscribe((result) => {
                this.organization = result as Organization;
                this.populateForm();
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                });
    }

    private populateForm() {
        this.organizationForm.controls['organizationId'].setValue(this.organization.organizationId);
        this.organizationForm.controls['organizationName'].setValue(this.organization.organizationName);
        this.organizationForm.controls['organizationDescription'].setValue(this.organization.organizationDescription);
    }

    public updateOrganization = (organizationFormValue) => {
        if (this.organizationForm.valid) {
            this.executeOrganizationUpdate(organizationFormValue);
        }
    }

    private executeOrganizationUpdate = (organizationFormValue) => {
        const organization: Organization = {
            organizationId: organizationFormValue.organizationId,
            organizationName: organizationFormValue.organizationName,
            organizationDescription: organizationFormValue.organizationDescription,
         };

        const apiUrl = 'organization';
        this._repository.update(apiUrl, organization)
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

    public hasError(controlName: string, errorName: string): any {
        return this.organizationForm.controls[controlName].hasError(errorName);
    }

    public onCancel(): void {
        this._location.back();
    }

}
