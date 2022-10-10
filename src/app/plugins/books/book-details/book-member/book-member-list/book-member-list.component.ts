import { Component, Inject, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookMember } from '../../../core/interface/book-member.model';
import { BookMembersDataSource } from '../../../core/services/book-members.datasource';
import { BooksService } from '../../../core/services/books.service';
import { ErrorHandlerService } from '../../../../../base/core/services/error-handler.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';
import { User } from '../../../../../base/core/models/user.model';
import { BookMemberSelectionDialogComponent } from './../book-member-selection-dialog/book-member-selection-dialog.component';
import { BookDeleteDialogComponent } from './../../../book-delete/book-delete-dialog.component';

import { AngularLogService } from '../../../../../base/core/services/angular-log.service';

@Component({
	selector: 'app-book-member-list',
	templateUrl: './book-member-list.component.html',
	styleUrls: ['./book-member-list.component.scss']
})
export class BookMemberListComponent implements OnInit, AfterViewInit {

	bookId: number;
	public user: User;	

	//public displayedColumns = ['firstName', 'lastName', 'title', 'company', 'view', 'details', 'update', 'delete'];
	public displayedColumns = ['fullName', 'company', 'title', 'view', 'details', 'update', 'delete'];

	dataSource: BookMembersDataSource;

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentBookMember: BookMember;

	private deleteDialogConfig;
	private selectDialogConfig;

	public searchString: string = '';

	sortProperty = '';
	// tslint:disable-next-line:max-line-length
	constructor(
		private logger: AngularLogService, 
		private repository: BooksService, 
		private errorHandler: ErrorHandlerService, 
		@Inject(Router) private router: Router, 
		private activeRoute: ActivatedRoute, 
		private dialog: MatDialog, 
		private changeDetectorRefs: ChangeDetectorRef) {
		this.bookId = activeRoute.snapshot.params['id'];
	}

	ngOnInit() {

		this.dataSource = new BookMembersDataSource(this.repository);

		this.dataSource.loadBookMembers(this.bookId, '', '', 'asc', 0, 6);

		this.deleteDialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

		this.selectDialogConfig = {
			height: '800px',
			width: '800px',
			disableClose: true,
			data: {}
		};
	}

	ngAfterViewInit() {

		this.sort.sortChange.subscribe((event) => {
			this.paginator.pageIndex = 0;
			this.sortProperty = event.active;
		});
		/*
				fromEvent(this.input.nativeElement, 'keyup')
					.pipe(
						debounceTime(150),
						distinctUntilChanged(),
						tap(() => {
							this.paginator.pageIndex = 0;
		
							this.loadBookMembersPage();
						})
					)
					.subscribe();
		*/
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadBookMembersPage())
			)
			.subscribe(

				data => {
					console.log(data);
				}

			);

	}
	searchValueChanged() {

		this.paginator.pageIndex = 0;

		this.loadBookMembersPage();

	}

	searchFormSubmitted(type: string = 'All') {

		this.paginator.pageIndex = 0;

		this.loadBookMembersPage();

	}
	
	public delete = (element: BookMember) => {

		if (element.userId) {
			let id = element.id;
			const apiUrl = `book/member/${id}`;
			this.repository.delete(apiUrl)
				.subscribe(res => {
					id = res as string;
					this.loadBookMembersPage();
				},
					(error) => {
						this.errorHandler.handleError(error);
					});
		} else {
			const id = element.id;
			this.deleteDialogConfig.data = {
				id: id
			};
			const dialogRef = this.dialog.open(BookDeleteDialogComponent, this.deleteDialogConfig)
				.afterClosed().subscribe(result => {
					this.loadBookMembersPage();
				});
		}
	}

	public redirectToAdd = () => {
		const id: string = this.activeRoute.snapshot.params['id'];
		this.selectDialogConfig.data = {
			bookId: id
		};
		const dialogRef = this.dialog.open(BookMemberSelectionDialogComponent, this.selectDialogConfig)
			.afterClosed().subscribe(result => {
				this.loadBookMembersPage();
			});
	}

	public redirectToDetails = (element: BookMember) => {
		let url = '';
		if (element.userId) {
			url = `/users/user/details/${element.userId}`;
		} else {
			url = `/users/user/details/${element.id}`;
		}
		this.router.navigate([url]);
	}

	public redirectToUpdate = (element: BookMember) => {
		let url = '';
		if (element.userId) {
			url = `/users/user/update/${element.userId}`;
		} else {
			url = `/users/user/update/${element.id}`;
		}
		this.router.navigate([url]);
	}
	
	public redirectToProfile = (element: BookMember) => {
		let id = '';
		if (element.userId) {
			id = element.userId;
		} else {
			id = element.id;
		}

		const apiUrl = `user/${id}`;

		this.repository.getData(apiUrl)
			.subscribe(res => {
				this.user = res as User;
				const id = this.user.userName;
				const url = `/profiles/${id}`;
				this.router.navigate([url]);
			},
				(error) => {
					this.errorHandler.handleError(error);
				});
	}
	
	public doFilter = (value: string) => {
		//       this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	loadBookMembersPage() {
		//this.input.nativeElement.value,
		this.dataSource.loadBookMembers(
			this.bookId,
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}
}
