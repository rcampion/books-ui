import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { AddressStatusService } from '../../../../../core/services/address-status.service';
import { AddressStatus } from '../../../../../core/models/address-status.model';
import { SuccessDialogComponent } from '../../../../../../../zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
    selector: 'app-address-status-update',
    templateUrl: './address-status-update.component.html',
    styleUrls: ['./address-status-update.component.scss']
})
export class AddressStatusUpdateComponent implements OnInit {
    public addressStatus: AddressStatus;
	public addressStatusForm: UntypedFormGroup = new UntypedFormGroup({
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
		private _repository: AddressStatusService,
		private _dialog: MatDialog,
        private _router: Router,
        private _activeRoute: ActivatedRoute,
        private _errorHandlerService: ErrorHandlerService) { }


    ngOnInit(): void {

		this.addressStatusForm = new UntypedFormGroup({
			statusId: new FormControl(''),
			addressStatus: new FormControl(''),
		});

        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };

        this.getAddressStatusDetails();


    }
    private getAddressStatusDetails(): any {
        const id: string = this._activeRoute.snapshot.params['id'];
        const apiUrl = `addresss/${id}`;

        this._repository.getData(apiUrl)
            .subscribe((res) => {
                this.addressStatus = res as AddressStatus;
                this.populateForm();
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                });
    }

    private populateForm(): void {
			this.addressStatusForm.controls['statusId'].setValue(this.addressStatus.statusId);
			this.addressStatusForm.controls['addressStatus'].setValue(this.addressStatus.addressStatus);
    }

    public updateAddressStatus(addressStatusFormValue): void {
        if (this.addressStatusForm.valid) {
            this.executeAddressStatusUpdate(addressStatusFormValue);
        }
    }

    private executeAddressStatusUpdate(addressStatusFormValue): void {
        const address: AddressStatus = {
			statusId: addressStatusFormValue.statusId,
			addressStatus: addressStatusFormValue.addressStatus,
         };

        const apiUrl = 'books/address/status';
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
        return this.addressStatusForm.controls[controlName].hasError(errorName);
    }

    public onCancel(): void {
        this._location.back();
    }

}
