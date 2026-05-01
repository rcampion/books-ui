import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Website } from '../../core/interfaces/website.model';
import { Contact } from '../../core/interfaces/contact.model';
import { ContactsService } from '../../core/services/contacts.service';
import { PaginationPage } from 'app/zdslogic-ui-base/core/interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContactWebsiteCreateDialogComponent } from './../contact-website-create-dialog/contact-website-create-dialog.component';
import { ContactWebsiteUpdateDialogComponent } from './../contact-website-update-dialog/contact-website-update-dialog.component';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export interface WebsiteType {
    value: number;
    viewValue: string;
}

@Component({
  selector: 'app-contact-website-list',
  templateUrl: './contact-website-list.component.html',
  styleUrls: ['./contact-website-list.component.scss']
})
export class ContactWebsiteListComponent implements OnInit, AfterViewInit {
    websiteTypes: WebsiteType[] = [
        { value: 0, viewValue: 'Personal' },
        { value: 1, viewValue: 'Business' }
    ];
    public displayedColumns = ['website', 'websiteKind', 'update', 'delete'];
    public dataSource = new MatTableDataSource<Website>();

    @ViewChild(MatSort, {static:false}) sort: MatSort;
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

    currentContact: Contact;

    private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

    updateContactWebsiteDialogRef: MatDialogRef<ContactWebsiteUpdateDialogComponent>;

    // tslint:disable-next-line:max-line-length
    constructor(private _angularLogService: AngularLogService,
	private _repository: ContactsService, 
	private _errorHandlerService: ErrorHandlerService, 
	private _router: Router, 
	private _activeRoute: ActivatedRoute, 
	private _dialog: MatDialog, 
	private changeDetectorRefs: ChangeDetectorRef) { }
    ngOnInit(): void  {
        this.getAllWebsites();

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

    public getAllWebsites(): any {
        const id: string = this._activeRoute.snapshot.params['id'];
        const apiUrl = `contacts/website/${id}`;
        this._repository.getData(apiUrl)
            .subscribe((result) => {
                const data = result as PaginationPage<Website>;
                this.dataSource.data = data.content;
                this.changeDetectorRefs.detectChanges();
            });
    }

    public delete(id: string): any {
        const apiUrl = `contacts/website/${id}`;
        this._repository.delete(apiUrl)
            .subscribe((result) => {
                id = result as string;
                this.getAllWebsites();
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                });
    }

    public redirectToAdd(): void {
        const id: string = this._activeRoute.snapshot.params['id'];
         this.dialogConfig.data = {
            contactId: id
        };
        const dialogRef = this._dialog.open(ContactWebsiteCreateDialogComponent, this.dialogConfig)
            .afterClosed().subscribe((result) => {
                this.getAllWebsites();
            });
    }

    public redirectToUpdate(id: string): void{
        this.dialogConfig.data = {
            websiteId: id
        };
        const dialogRef = this._dialog.open(ContactWebsiteUpdateDialogComponent, this.dialogConfig)
            .afterClosed().subscribe((result) => {
                this.getAllWebsites();
            });
    }
}



