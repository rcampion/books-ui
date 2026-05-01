import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'app/zdslogic-ui-base/core/services/api.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { AppMessage } from 'app/zdslogic-ui-base/core/models/appmessage.model';

@Component({
	selector: 'app-video-jitsi-call-dialog',
	templateUrl: './video-jitsi-call-dialog.component.html',
	styleUrls: ['./video-jitsi-call-dialog.component.scss']
})
export class VideoJitsiCallDialogComponent implements OnInit {

	constructor(

		private logger: AngularLogService,
		private router: Router,
		private errorHandler: ErrorHandlerService,
		private dialogRef: MatDialogRef<VideoJitsiCallDialogComponent>,
		private dialog: MatDialog,

		@Inject(MAT_DIALOG_DATA) public data: any) { }


	ngOnInit(): void {
	}

	onConfirm(): void {
		// Close the dialog, return true
		this.dialogRef.close(true);
	}

	onDismiss(): void {
		// Close the dialog, return false
		this.dialogRef.close(false);
	}

}

export interface DialogData {
	contactId?: string;
	peerId?: string;
	joinCall: boolean;
}
