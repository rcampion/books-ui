import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { GroupsService } from '../../../../core/services/groups.service';
import { ErrorHandlerService } from '../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
  selector: 'app-group-member-selection-dialog',
  templateUrl: './group-member-selection-dialog.component.html',
  styleUrls: ['./group-member-selection-dialog.component.scss']
})
export class GroupMemberSelectionDialogComponent implements OnInit {
    groupId: string;
    constructor(private _angularLogService: AngularLogService,
        private _repository: GroupsService,

        private _errorHandlerService: ErrorHandlerService,

        private _dialogRef: MatDialogRef<GroupMemberSelectionDialogComponent>,

        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.groupId = data.groupId;
    }

  ngOnInit(): void  {
  }

}
