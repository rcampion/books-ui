//import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation, ViewChildren, QueryList, Input, OnChanges, SimpleChanges, Output, EventEmitter, Inject, forwardRef } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';

import { CartService } from '../../core/services/cart.service';
import { BooksService } from '../../core/services/books.service';
import { PaginationPropertySort } from 'app/zdslogic-base/core/interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';
import { Book } from '../../core/models/book.model';

@Component({
	selector: 'app-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss'],

})
export class BookComponent implements OnInit, AfterViewInit, OnChanges {

	@Input() searchString: string;

	public booksList: Book[];
	public total = 0;
	public loading = false;
	public currentPage = 1;
	public totalPages: Array<number> = [1];
	public pageSize = 6;
	public pageIndex: number;
	public sort: MatSort;
	public sortProperty = '';

	private booksSubject = new BehaviorSubject<Book[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);

	constructor(
		private _booksService: BooksService,
		private _cartService: CartService,
		private _errorHandlerService: ErrorHandlerService) { }

	ngAfterViewInit(): void {
		this.loadBooksPage();
	}

	ngOnInit(): void {

	}

	ngOnChanges(changes: SimpleChanges): void {

		for (const propName in changes) {
			if (propName === 'searchString') {
				this.pageIndex = 0;
				this.loadBooksPage();
			}
		}
	}

	searchFormSubmitted(type: string = 'All'): void {

		this.pageIndex = 0;

		this.loadBooksPage();

	}

	searchValueChanged(): void {

		this.pageIndex = 0;

		this.loadBooksPage();

	}

	addToCart(item: any): void {
		this._cartService.addToCart(item);
	}

	public itemIsInCart(item: Book): boolean {
		return this._cartService.isInCart(item);
	}

	setPageTo(pageNumber): void {
		this.currentPage = pageNumber;
		this.pageIndex = pageNumber - 1;
		this.pageSize = 6;
		this.loadBooksPage();
	}

	loadBooksPage(): void {

		const sort = new PaginationPropertySort();
		sort.property = this.sortProperty;
		sort.direction = 'asc';

		this.loadingSubject.next(true);

		this._booksService.findBooksWithSortAndFilter(this.searchString, sort,
			this.pageIndex, this.pageSize).pipe(
				catchError(error => of(this._errorHandlerService.handleError(error))),
				finalize(() =>
					this.loadingSubject.next(false))
			)
			.subscribe((response) => {
				this.booksSubject.next(response.content);
				this.booksList = response.content;
				this.total = response.totalElements;
				this.totalPages = Array.from(new Array(Math.ceil(this.total / this.pageSize)), (val, index) => index + 1);
				//this.cd.markForCheck();
				this.booksList.forEach((a: any) => {

					Object.assign(a, { qty: 1 });

				});
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				}
			);
	}
}
