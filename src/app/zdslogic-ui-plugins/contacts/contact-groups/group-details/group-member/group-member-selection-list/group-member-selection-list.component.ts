import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from '../../../../core/interfaces/contact.model';
import { ContactsService } from '../../../../core/services/contacts.service';
import { PaginationPage } from '../../../../../../zdslogic-ui-base/core/interfaces/pagination';
import { ErrorHandlerService } from '../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GroupMemberSelectionDialogComponent } from './../group-member-selection-dialog/group-member-selection-dialog.component';
import { AngularLogService } from '../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
  selector: 'app-group-member-selection-list',
  templateUrl: './group-member-selection-list.component.html',
  styleUrls: ['./group-member-selection-list.component.scss']
})
export class GroupMemberSelectionListComponent implements OnInit, AfterViewInit {

    public displayedColumns = ['fullName', 'title', 'company', 'add'];
    public dataSource = new MatTableDataSource<Contact>();

    @ViewChild(MatSort, {static:false}) sort: MatSort;
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

    groupId: string;

    currentContact: Contact;

	public searchString: string = '';

    private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

    groupMemberSelectionDialogRef: MatDialogRef<GroupMemberSelectionDialogComponent>;

    // tslint:disable-next-line:max-line-length
    constructor(private _angularLogService: AngularLogService,
        private _dialogRef: GroupMemberSelectionDialogComponent,
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
            height: '600px',
            width: '1500px',
            disableClose: true,
            data: {}
        };
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

	searchValueChanged() {

		this.paginator.pageIndex = 0;

		this.doFilter(this.searchString);

	}

	searchFormSubmitted(type: string = 'All') {

		this.paginator.pageIndex = 0;

		this.doFilter(this.searchString);

	}
	
    public getFilteredContacts = () => {
        this.groupId = this._dialogRef.groupId;

        const url = `group/member/filtered/${this.groupId}`;

        this._repository.getData(url)
            .subscribe((result) => {
                const data = result as PaginationPage<Contact>;
                this.dataSource.data = data.content;
                this.changeDetectorRefs.detectChanges();
            });
    }
    public addMember = (id: string) => {
        const apiUrl  = 'group/member/' + this.groupId + '/' + id;

        this._repository.create(apiUrl, null)
            .subscribe((result) => {
                this.getFilteredContacts();
                //console.log('group member add completed');
            });
    }

    public doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

}
