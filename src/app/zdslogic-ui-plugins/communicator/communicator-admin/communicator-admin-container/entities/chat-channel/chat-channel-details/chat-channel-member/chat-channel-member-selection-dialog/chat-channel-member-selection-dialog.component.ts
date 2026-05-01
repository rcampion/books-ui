import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ChatChannelService } from 'app/zdslogic-ui-base/app/core/services/chat-channel.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
  selector: 'app-chat-channel-member-selection-dialog',
  templateUrl: './chat-channel-member-selection-dialog.component.html',
  styleUrls: ['./chat-channel-member-selection-dialog.component.scss']
})
export class ChatChannelMemberSelectionDialogComponent implements OnInit {

    channelId: string;

    constructor(
		private _angularLogService: AngularLogService,
        private _repository: ChatChannelService,
        private _errorHandlerService: ErrorHandlerService,
        private _dialogRef: MatDialogRef<ChatChannelMemberSelectionDialogComponent>,
        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.channelId = data.channelId;
    }

  ngOnInit(): void  {
  }

}
