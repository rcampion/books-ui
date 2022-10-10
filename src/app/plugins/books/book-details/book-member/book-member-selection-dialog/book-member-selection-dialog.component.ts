import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { BooksService } from '../../../core/services/books.service';
import { ErrorHandlerService } from '../../../../../base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../base/core/services/angular-log.service';

@Component({
  selector: 'app-book-member-selection-dialog',
  templateUrl: './book-member-selection-dialog.component.html',
  styleUrls: ['./book-member-selection-dialog.component.scss']
})
export class BookMemberSelectionDialogComponent implements OnInit {
    bookId: string;
    constructor(private logger: AngularLogService,
        private repository: BooksService,

        private errorHandler: ErrorHandlerService,

        private dialogRef: MatDialogRef<BookMemberSelectionDialogComponent>,

        private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.bookId = data.bookId;
    }

  ngOnInit() {
  }

}
