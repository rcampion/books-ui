import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../base/core/models/user.model';
import { UsersSpringService } from '../../../../../base/core/services/users-spring.service';
import { PaginationPage } from '../../../../../base/core/interface/pagination';
import { ErrorHandlerService } from '../../../../../base/core/services/error-handler.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BookMemberSelectionDialogComponent } from './../book-member-selection-dialog/book-member-selection-dialog.component';
import { AngularLogService } from '../../../../../base/core/services/angular-log.service';

@Component({
  selector: 'app-book-member-selection-list',
  templateUrl: './book-member-selection-list.component.html',
  styleUrls: ['./book-member-selection-list.component.scss']
})
export class BookMemberSelectionListComponent implements OnInit, AfterViewInit {

    public displayedColumns = ['firstName', 'lastName', 'title', 'company', 'add'];
    public dataSource = new MatTableDataSource<User>();

    @ViewChild(MatSort, {static:false}) sort: MatSort;
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

    bookId: string;

    currentUser: User;

	public searchString: string = '';

    private dialogConfig;

    bookMemberSelectionDialogRef: MatDialogRef<BookMemberSelectionDialogComponent>;

    // tslint:disable-next-line:max-line-length
    constructor(private logger: AngularLogService,
        private dialogRef: BookMemberSelectionDialogComponent,
        private repository: UsersSpringService,
        private errorService: ErrorHandlerService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private dialog: MatDialog,
        private changeDetectorRefs: ChangeDetectorRef) {

       // this.bookMemberSelectionDialogRef = dialogRef;
     }
    ngOnInit() {
        this.getFilteredUsers();

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
	
    public getFilteredUsers = () => {
        this.bookId = this.dialogRef.bookId;

        const url = `book/member/filtered/${this.bookId}`;

        this.repository.getData(url)
            .subscribe(res => {
                const data = res as PaginationPage<User>;
                this.dataSource.data = data.content;
                this.changeDetectorRefs.detectChanges();
            });
    }
    public addMember = (id: string) => {
        const apiUrl  = 'book/member/' + this.bookId + '/' + id;

        this.repository.create(apiUrl, null)
            .subscribe(res => {
                this.getFilteredUsers();
                console.log('book member add completed');
            });
    }

    public doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

}
