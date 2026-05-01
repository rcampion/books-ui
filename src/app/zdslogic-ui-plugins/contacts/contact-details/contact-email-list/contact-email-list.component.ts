import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { EMail } from 'app/zdslogic-ui-base/core/interfaces/email.model';
import { Contact } from '../../core/interfaces/contact.model';
import { ContactsService } from '../../core/services/contacts.service';
import { PaginationPage } from 'app/zdslogic-ui-base/core/interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContactEmailCreateDialogComponent } from './../contact-email-create-dialog/contact-email-create-dialog.component';
import { ContactEmailUpdateDialogComponent } from './../contact-email-update-dialog/contact-email-update-dialog.component';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export interface EMailType {
    value: number;
    viewValue: string;
}

export interface PriorityType {
	value: number;
	viewValue: string;
}

@Component({
    selector: 'app-contact-email-list',
    templateUrl: './contact-email-list.component.html',
    styleUrls: ['./contact-email-list.component.scss']
})
export class ContactEmailListComponent implements OnInit, AfterViewInit {
    emailTypes: EMailType[] = [
        { value: 0, viewValue: 'Personal' },
        { value: 1, viewValue: 'Business' }
    ];

	priorityTypes: PriorityType[] = [
		{ value: 0, viewValue: 'Primary' },
		{ value: 1, viewValue: 'Secondary' }
	];

    public displayedColumns = ['email', 'emailKind', 'priorityKind', 'update', 'delete', 'send'];

    public dataSource = new MatTableDataSource<EMail>();

    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

    currentContact: Contact;

    private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

    updateContactEmailDialogRef: MatDialogRef<ContactEmailUpdateDialogComponent>;

    // tslint:disable-next-line:max-line-length
    constructor(
		private _angularLogService: AngularLogService,
		private _repository: ContactsService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) {

		}

    ngOnInit(): void  {
        this.getAllEMails();

        this.dialogConfig = {
            height: '400px',
            width: '800px',
            disableClose: true,
            data: {}
        };

    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    public getAllEMails(): any{
        const id: string = this._activeRoute.snapshot.params['id'];
        const apiUrl = `contacts/email/${id}`;
        this._repository.getData(apiUrl)
            .subscribe((result) => {
                const data = result as PaginationPage<EMail>;
                this.dataSource.data = data.content;
                this.changeDetectorRefs.detectChanges();
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                });
    }

    public delete(id: string): any {
        const apiUrl = `contacts/email/${id}`;
        this._repository.delete(apiUrl)
            .subscribe((result) => {
                id = result as string;
                this.getAllEMails();
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                });
    }

    public redirectToEMail(id: string): void {
        const url = `/contacts/contact/email/${id}`;
        this._router.navigate([url]);
    }

    public redirectToAdd(): any {
        const id: string = this._activeRoute.snapshot.params['id'];
        this.dialogConfig.data = {
            contactId: id
        };
        const dialogRef = this._dialog.open(ContactEmailCreateDialogComponent, this.dialogConfig)
            .afterClosed().subscribe((result) => {
                this.getAllEMails();
            });
    }

    public redirectToUpdate(id: string): any {
        this.dialogConfig.data = {
            emailId: id
        };
        const dialogRef = this._dialog.open(ContactEmailUpdateDialogComponent, this.dialogConfig)
            .afterClosed().subscribe((result) => {
                this.getAllEMails();
            });
    }
}


