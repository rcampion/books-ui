import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { Contact } from '../../core/interfaces/contact.model';
import { ContactsService } from '../../core/services/contacts.service';
import { PaginationPage } from '../../core/interfaces/pagination';
import { Router } from '@angular/router';
import { ConnectionsSelectionDialogComponent } from './../connections-selection-dialog/connections-selection-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

@Component({
  selector: 'app-connections-selection-list',
  templateUrl: './connections-selection-list.component.html',
  styleUrls: ['./connections-selection-list.component.scss']
})
export class ConnectionsSelectionListComponent implements OnInit, AfterViewInit {

    public displayedColumns = ['fullName', 'company', 'add'];
    public dataSource = new MatTableDataSource<Contact>();

    @ViewChild(MatSort, {static:false}) sort: MatSort;
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

    userId: string;

    currentContact: Contact;

	public searchString: string = '';

    private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

    userContactsSelectionDialogRef: MatDialogRef<ConnectionsSelectionDialogComponent>;

    // tslint:disable-next-line:max-line-length
    constructor(private _angularLogService: AngularLogService,
        private _dialogRef: ConnectionsSelectionDialogComponent,
        private _repository: ContactsService,
        private _errorHandlerService: ErrorHandlerService,
        private _router: Router,
        private _activeRoute: ActivatedRoute,
        private _dialog: MatDialog,
        private changeDetectorRefs: ChangeDetectorRef) {

       // this.groupMemberSelectionDialogRef = dialogRef;
     }

    ngOnInit(): void  {
        this.getFilteredContacts();

        this.dialogConfig = {
            height: '400px',
            width: '1000px',
            disableClose: true,
            data: {}
        };
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.doFilter(this.searchString);

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.doFilter(this.searchString);

	}

    public getFilteredContacts(): any {
        this.userId = this._dialogRef.userId;

        const url = `user/contacts/filtered/${this.userId}`;

        this._repository.getData(url)
            .subscribe((result) => {
                const data = result as PaginationPage<Contact>;
                this.dataSource.data = data.content;
                this.changeDetectorRefs.detectChanges();
            });
    }

    public addUserContact(id: string): any {
        const apiUrl  = 'user/contacts/' + this.userId + '/' + id;

        this._repository.create(apiUrl, null)
            .subscribe((result) => {
                this.getFilteredContacts();
            });
    }

    public doFilter(value: string): any {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

}
