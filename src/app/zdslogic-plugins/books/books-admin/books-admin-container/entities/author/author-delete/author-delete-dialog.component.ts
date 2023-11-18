import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthorService } from '../../../../../core/services/author.service';
import { ErrorHandlerService } from '../../../../../../../zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-base/core/services/angular-log.service';

@Component({
    selector: 'app-author-delete-dialog',
    templateUrl: './author-delete-dialog.component.html',
    styleUrls: ['./author-delete-dialog.component.scss']
})
export class AuthorDeleteDialogComponent implements OnInit {
    id: string;
    constructor(
		private _angularLogService: AngularLogService,
        private _repository: AuthorService,
        private _errorHandlerService: ErrorHandlerService,
        private _dialogRef: MatDialogRef<AuthorDeleteDialogComponent>,
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
