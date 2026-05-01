import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Phone } from '../../core/interfaces/phone.model';
import { Contact } from '../../core/interfaces/contact.model';
import { ContactsService } from '../../core/services/contacts.service';
import { PaginationPage } from 'app/zdslogic-ui-base/core/interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { ContactPhoneCreateDialogComponent } from './../contact-phone-create-dialog/contact-phone-create-dialog.component';
import { ContactPhoneUpdateDialogComponent } from './../contact-phone-update-dialog/contact-phone-update-dialog.component';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export interface PhoneType {
    value: number;
    viewValue: string;
}

@Component({
  selector: 'app-contact-phone-list',
  templateUrl: './contact-phone-list.component.html',
  styleUrls: ['./contact-phone-list.component.scss']
})
export class ContactPhoneListComponent implements OnInit, AfterViewInit {
    phoneTypes: PhoneType[] = [
        { value: 0, viewValue: 'Home' },
        { value: 1, viewValue: 'Office' },
        { value: 2, viewValue: 'Mobile' },
        { value: 3, viewValue: 'Fax' }
    ];
    public displayedColumns = ['phone', 'phoneKind', 'update', 'delete'];
    public dataSource = new MatTableDataSource<Phone>();

    @ViewChild(MatSort, {static:false}) sort: MatSort;
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

    currentContact: Contact;

    private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

    updateContactPhoneDialogRef: MatDialogRef<ContactPhoneUpdateDialogComponent>;

    // tslint:disable-next-line:max-line-length
    constructor(private _angularLogService: AngularLogService,private _repository: ContactsService, private _errorHandlerService: ErrorHandlerService, private _router: Router, private _activeRoute: ActivatedRoute, private _dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }
    ngOnInit(): void  {
        this.getAllPhones();

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

    public getAllPhones(): any {
        const id: string = this._activeRoute.snapshot.params['id'];
        const apiUrl = `contacts/phone/${id}`;
        this._repository.getData(apiUrl)
            .subscribe((result) => {
                const data = result as PaginationPage<Phone>;
                this.dataSource.data = data.content;
                this.changeDetectorRefs.detectChanges();
            });
    }

    public delete(id: string): any {
        const apiUrl = `contacts/phone/${id}`;
        this._repository.delete(apiUrl)
            .subscribe((result) => {
                id = result as string;
                this.getAllPhones();
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
        const dialogRef = this._dialog.open(ContactPhoneCreateDialogComponent, this.dialogConfig)
            .afterClosed().subscribe((result) => {
                this.getAllPhones();
            });
    }

    public redirectToUpdate(id: string): void {
        this.dialogConfig.data = {
            phoneId: id
        };
        const dialogRef = this._dialog.open(ContactPhoneUpdateDialogComponent, this.dialogConfig)
            .afterClosed().subscribe((result) => {
                this.getAllPhones();
            });
    }
}



