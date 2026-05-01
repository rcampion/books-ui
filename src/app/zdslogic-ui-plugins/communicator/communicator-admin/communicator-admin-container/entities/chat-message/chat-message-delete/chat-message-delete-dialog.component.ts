import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ChatMessageService } from 'app/zdslogic-ui-base/app/core/services/chat-message.service';
import { ChatMessage } from 'app/zdslogic-ui-base/app/core/models/chat-message.model';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-chat-message-delete-dialog',
	templateUrl: './chat-message-delete-dialog.component.html',
	styleUrls: ['./chat-message-delete-dialog.component.scss']
})
export class ChatMessageDeleteDialogComponent implements OnInit {
	id: number;
	constructor(private _angularLogService: AngularLogService,
		private _repository: ChatMessageService,
		private _errorHandlerService: ErrorHandlerService,
		private _dialogRef: MatDialogRef<ChatMessageDeleteDialogComponent>,
		private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

		this.id = data.id;
	}

	ngOnInit(): void {
	}

	public delete(): any {
		const apiUrl = `chat-message/${this.id}`;
		this._repository.delete(this.id, apiUrl)
			.subscribe((result) => {
				this.id = result as number;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
		this._dialogRef.close();

	}

}
