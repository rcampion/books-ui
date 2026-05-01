import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { AddressService } from '../../../../../core/services/address.service';
import { Address } from '../../../../../core/models/address.model';
import { SuccessDialogComponent } from '../../../../../../../zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
    selector: 'app-address-delete-dialog',
    templateUrl: './address-delete-dialog.component.html',
    styleUrls: ['./address-delete-dialog.component.scss']
})
export class AddressDeleteDialogComponent implements OnInit {
    id: string;
    constructor(
		private _angularLogService: AngularLogService,
        private _repository: AddressService,
        private _errorHandlerService: ErrorHandlerService,
        private _dialogRef: MatDialogRef<AddressDeleteDialogComponent>,
        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.id = data.id;
    }

    ngOnInit(): void {
    }

    public delete(): void {
        const apiUrl = `addresss/${this.id}`;
        this._repository.delete(apiUrl)
            .subscribe((res) => {
                this.id = res as string;
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                });
        this._dialogRef.close();

    }

}
