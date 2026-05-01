import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ChatChannelService } from 'app/zdslogic-ui-base/app/core/services/chat-channel.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
    selector: 'app-chat-channel-delete-dialog',
    templateUrl: './chat-channel-delete-dialog.component.html',
    styleUrls: ['./chat-channel-delete-dialog.component.scss']
})
export class ChatChannelDeleteDialogComponent implements OnInit {
    id: string;
    constructor(private _angularLogService: AngularLogService,
        private _repository: ChatChannelService,

        private _errorHandlerService: ErrorHandlerService,

        private _dialogRef: MatDialogRef<ChatChannelDeleteDialogComponent>,

        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.id = data.id;
    }

    ngOnInit(): void  {
    }

    public delete(): void {
        const apiUrl = `chat-channel/${this.id}`;
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
