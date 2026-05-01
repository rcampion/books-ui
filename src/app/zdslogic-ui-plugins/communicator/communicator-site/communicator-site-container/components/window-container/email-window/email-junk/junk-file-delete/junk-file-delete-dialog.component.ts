import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

//import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { EMailJunkUserFilesService } from '../../core/services/email-junk-user-files.service';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
    selector: 'app-junk-file-delete-dialog',
    templateUrl: './junk-file-delete-dialog.component.html',
    styleUrls: ['./junk-file-delete-dialog.component.css']
})
export class JunkFileDeleteDialogComponent implements OnInit {
    id: string;
    constructor(
		private _angularLogService: AngularLogService,
        private _repository: EMailJunkUserFilesService,
        private _errorHandlerService: ErrorHandlerService,

        private _dialogRef: MatDialogRef<JunkFileDeleteDialogComponent>,

        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.id = data.id;
    }

    ngOnInit(): void  {
    }

    public delete(): any {
        const apiUrl = `my-junk-emails/${this.id}`;
        this._repository.delete(apiUrl)
            .subscribe((result) => {
                this.id = result as string;
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                });
        this._dialogRef.close();

    }

}
