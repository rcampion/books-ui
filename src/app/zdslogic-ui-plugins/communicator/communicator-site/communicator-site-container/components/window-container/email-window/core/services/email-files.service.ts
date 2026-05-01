import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { ApiService } from 'app/zdslogic-ui-base/core';
import { EMailContactSend } from '../../core/models/email-contact-send.model';

import { InboxFileDeleteDialogComponent } from '../../email-inbox/inbox-file-delete/inbox-file-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SentFileDeleteDialogComponent } from '../../email-sent/sent-file-delete/sent-file-delete-dialog.component';
import { JunkFileDeleteDialogComponent } from '../../email-junk/junk-file-delete/junk-file-delete-dialog.component';
import { BlacklistFileDeleteDialogComponent } from '../../email-blacklist/blacklist-file-delete/blacklist-file-delete-dialog.component';

@Injectable({
	providedIn: 'root'
})
export class EMailFilesService {
  private dialogConfig ={
    height: '200px',
    width: '400px',
    disableClose: true,
    data: {}
  };

  changeFiles = new BehaviorSubject<string>('');

  constructor(
    private _apiService: ApiService,
    private _dialog: MatDialog,
    private _errorHandlerService: ErrorHandler)
		{}

    sendEmail(emailContactSend: EMailContactSend, files: any): Observable<any>{
      const formData = new FormData();
      const jsonString = JSON.stringify(emailContactSend);
      formData.append('jsonString', jsonString);

      let apiUrl = 'contact/email/send';

      if (files !== undefined) {
        formData.append('file', files[0]);
        apiUrl = 'contact/email/send/with/file';
      }

      return this._apiService.send(apiUrl, formData);
    }

    moveInboxToDelete = (id: string): void => {
      this.dialogConfig.data = {
        id: id
      };

      const dialogRef = this._dialog.open(InboxFileDeleteDialogComponent, this.dialogConfig)
        .afterClosed().subscribe((result) => {
          this.changeFiles.next(id);
        });
    };

    moveSentToDelete = (id: string): void => {
      this.dialogConfig.data = {
        id: id
      };

      const dialogRef = this._dialog.open(SentFileDeleteDialogComponent, this.dialogConfig)
        .afterClosed().subscribe((result) => {
          this.changeFiles.next(id);
        });
    };

    moveJunkToDelete = (id: string): void => {
      this.dialogConfig.data = {
        id: id
      };

      const dialogRef = this._dialog.open(JunkFileDeleteDialogComponent, this.dialogConfig)
        .afterClosed().subscribe((result) => {
          this.changeFiles.next(id);
        });
    };

    moveBlacklistToDelete = (id: string): void => {
      this.dialogConfig.data = {
        id: id
      };

      const dialogRef = this._dialog.open(BlacklistFileDeleteDialogComponent, this.dialogConfig)
        .afterClosed().subscribe((result) => {
          this.changeFiles.next(id);
        });
    };

    moveInboxToJunk = (id: string): void => {
      const apiUrl = `my-inbox-emails/moveToJunk/${id}`;
      this._apiService.getData(apiUrl)
          .subscribe((result) => {
            this.changeFiles.next(id);
          },
          (error) => {
              this._errorHandlerService.handleError(error);
          });
    };

    moveSentToJunk = (id: string): void => {
      const apiUrl = `my-sent-emails/moveToJunk/${id}`;
      this._apiService.getData(apiUrl)
          .subscribe((result) => {
            this.changeFiles.next(id);
          },
          (error) => {
              this._errorHandlerService.handleError(error);
          });
    };

}
