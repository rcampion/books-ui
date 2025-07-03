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

import { AuthorDataSource } from '../../../../../core/services/author.datasource';
import { AuthorDeleteDialogComponent } from './../author-delete/author-delete-dialog.component';

import { AuthorService } from '../../../../../core/services/author.service';
import { Author } from '../../../../../core/models/author.model';
import { SuccessDialogComponent } from '../../../../../../../zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-author-list',
	templateUrl: './author-list.component.html',
	styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['authorId','authorName', 'details', 'update', 'delete'];
	dataSource: AuthorDataSource;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentAuthor: Author;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	deleteAuthorDialogRef: MatDialogRef<AuthorDeleteDialogComponent>;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: AuthorService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) { }

	ngOnInit(): void {

		this.dataSource = new AuthorDataSource(this._repository);

		this.dataSource.loadAuthors('', '', 'asc', 0, 6);

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
							this.loadAuthorsPage();
						})
					)
					.subscribe();
		*/

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadAuthorsPage())
			)
			.subscribe(

				(data) => {
					console.log(data);
				}

			);

	}

	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.loadAuthorsPage();

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.loadAuthorsPage();

	}
	/*
		public getAllAuthors = () => {
			this._repository.getData('address')
				.subscribe(res => {
					const data = res as PaginationPage<Author>;
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
		const url = 'books-admin/author/create';
		this._router.navigate([url]);
	}

	public redirectToDetails(id: string): void {
		const url = `books-admin/author/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `books-admin/author/update/${id}`;
		this._router.navigate([url]);
	}

	public redirectToDelete(id: string): void{
		this.dialogConfig.data = {
			id: id
		};
		const dialogRef = this._dialog.open(AuthorDeleteDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadAuthorsPage();
			});
	}

    public redirectToSend(id: string): void {
        const url = `books-admin/author/email/${id}`;
        this._router.navigate([url]);
    }

	loadAuthorsPage(): any {
		//this.input.nativeElement.value,
		this.dataSource.loadAuthors(
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);
	}
}
