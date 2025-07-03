import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { BooksDataSource } from '../../../../../core/services/books.datasource';
import { BookDeleteDialogComponent } from './../book-delete/book-delete-dialog.component';
import { BooksService } from '../../../../../core/services/books.service';
import { Book } from '../../../../../core/models/book.model';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-book-list',
	templateUrl: './book-list.component.html',
	styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit {


	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	public displayedColumns = ['title', 'author', 'details', 'update', 'delete'];
	public dataSource: BooksDataSource;
	public currentBook: Book;
	public booksLength = 0;
	public searchString: string = '';
	public deleteBookDialogRef: MatDialogRef<BookDeleteDialogComponent>;
	public sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: BooksService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) { }

	ngOnInit(): void {

		this.dataSource = new BooksDataSource(this._repository);

		this.dataSource.loadBooks('', '', 'asc', 0, 6);

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}

	ngAfterViewInit(): void {

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
							this.loadBooksPage();
						})
					)
					.subscribe();
		*/

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadBooksPage())
			)
			.subscribe(

				(data) => {
					console.log(data);
				}

			);

	}

	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.loadBooksPage();

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.loadBooksPage();

	}
	/*
		public getAllBooks = () => {
			this._repository.getData('book')
				.subscribe(res => {
					const data = res as PaginationPage<Book>;
					this.dataSource.data = data.content;
					this.changeDetectorRefs.detectChanges();
				},
					(error) => {
						this._errorHandlerService.handleError(error);
					});
		}
	*/

	public doFilter(value: string): void {
		//        this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	public redirectToAdd(): void {
		const url = 'books-admin/book/create';
		this._router.navigate([url]);
	}

	public redirectToDetails(id: string): void {
		const url = `books-admin/book/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `books-admin/book/update/${id}`;
		this._router.navigate([url]);
	}

	public redirectToDelete(id: string): void {
		this.dialogConfig.data = {
			id: id
		};
		const dialogRef = this._dialog.open(BookDeleteDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadBooksPage();
			});
	}

	public redirectToSend(id: string): void {
		const url = `books-admin//book/email/${id}`;
		this._router.navigate([url]);
	}

	loadBooksPage(): any {
		//this.input.nativeElement.value,
		this.dataSource.loadBooks(
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);
	}
}
