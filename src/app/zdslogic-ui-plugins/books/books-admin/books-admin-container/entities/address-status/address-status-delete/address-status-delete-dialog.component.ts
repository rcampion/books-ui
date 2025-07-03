import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { AddressStatusService } from '../../../../../core/services/address-status.service';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
    selector: 'app-address-status-delete-dialog',
    templateUrl: './address-status-delete-dialog.component.html',
    styleUrls: ['./address-status-delete-dialog.component.scss']
})
export class AddressStatusDeleteDialogComponent implements OnInit {
    id: string;
    constructor(
		private _angularLogService: AngularLogService,
        private _repository: AddressStatusService,
        private _errorHandlerService: ErrorHandlerService,
        private _dialogRef: MatDialogRef<AddressStatusDeleteDialogComponent>,
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
