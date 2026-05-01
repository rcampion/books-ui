import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { OrganizationsService } from '../../../../core/services/organizations.service';
import { ErrorHandlerService } from '../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
  selector: 'app-organization-member-selection-dialog',
  templateUrl: './organization-member-selection-dialog.component.html',
  styleUrls: ['./organization-member-selection-dialog.component.scss']
})
export class OrganizationMemberSelectionDialogComponent implements OnInit {
    organizationId: string;
    constructor(private _angularLogService: AngularLogService,
        private _repository: OrganizationsService,

        private _errorHandlerService: ErrorHandlerService,

        private _dialogRef: MatDialogRef<OrganizationMemberSelectionDialogComponent>,

        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.organizationId = data.organizationId;
    }

  ngOnInit(): void  {
  }

}
