import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
//import { GroupsService } from 'app/zdslogic-ui-base/core/services/groups.service';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-connections-selection-dialog',
	templateUrl: './connections-selection-dialog.component.html',
	styleUrls: ['./connections-selection-dialog.component.scss']
})
export class ConnectionsSelectionDialogComponent implements OnInit {
	userId: string;
	constructor(
		private _angularLogService: AngularLogService,
		private _errorHandlerService: ErrorHandlerService,
		private _dialogRef: MatDialogRef<ConnectionsSelectionDialogComponent>,
		private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

		this.userId = data.userId;
	}

	ngOnInit(): void {
	}

}
