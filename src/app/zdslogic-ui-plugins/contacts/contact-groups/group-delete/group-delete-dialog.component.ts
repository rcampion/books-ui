import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { GroupsService } from '../..//core/services/groups.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
    selector: 'app-group-delete-dialog',
    templateUrl: './group-delete-dialog.component.html',
    styleUrls: ['./group-delete-dialog.component.scss']
})
export class GroupDeleteDialogComponent implements OnInit {
    id: string;
    constructor(private _angularLogService: AngularLogService,
        private _repository: GroupsService,

        private _errorHandlerService: ErrorHandlerService,

        private _dialogRef: MatDialogRef<GroupDeleteDialogComponent>,

        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.id = data.id;
    }

    ngOnInit(): void  {
    }
    public delete() {
        const apiUrl = `group/${this.id}`;
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
