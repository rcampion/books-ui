//import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation, ViewChildren, QueryList, Input, OnChanges, SimpleChanges, Output, EventEmitter, Inject, forwardRef } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';

import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { PaginationPropertySort } from 'app/zdslogic-ui-base/core/interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Product } from '../../core/interfaces/product.model';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],

})
export class ProductComponent implements OnInit, AfterViewInit, OnChanges {

	@Input() searchString: string;

	private productsSubject = new BehaviorSubject<Product[]>([]);

	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();

	productsList: Product[];

	public total = 0;

	loading = false;
	currentPage = 1;
	totalPages: Array<number> = [1];
	pageSize = 6;
	pageIndex: number;
	//@ViewChild(MatSort, { static: false }) sort: MatSort;
	//@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	sort: MatSort;

	sortProperty = '';

	constructor(
		private _productsService: ProductsService,
		private _cartService: CartService,
		private _errorHandlerService: ErrorHandlerService) { }

	ngAfterViewInit(): void {
		this.loadProductsPage();
	}

	ngOnInit(): void {

	}

	ngOnChanges(changes: SimpleChanges): void {

		for (const propName in changes) {

			/*
			const change = changes[propName];

			const curVal = JSON.stringify(change.currentValue);
			const prevVal = JSON.stringify(change.previousValue);
			const changeLog = `${propName}: currentValue = ${curVal}, previousValue = ${prevVal}`;
			*/

			if (propName === 'searchString') {
				this.pageIndex = 0;
				this.loadProductsPage();
			}
		}
	}

	searchFormSubmitted(type: string = 'All'): void {

		//this.paginator.pageIndex = 0;
		this.pageIndex = 0;

		this.loadProductsPage();

	}

	searchValueChanged(): void {

		//this.paginator.pageIndex = 0;
		this.pageIndex = 0;

		this.loadProductsPage();

	}

	addToCart(item: any): void {
		this._cartService.addToCart(item);
	}

	public itemIsInCart(item: Product): boolean {
		return this._cartService.isInCart(item);
	}

	setPageTo(pageNumber): void {
		this.currentPage = pageNumber;
		this.pageIndex = pageNumber - 1;
		this.pageSize = 6;
		this.loadProductsPage();
	}

	loadProductsPage(): void {

		const sort = new PaginationPropertySort();
		sort.property = this.sortProperty;
		sort.direction = 'asc';

		this.loadingSubject.next(true);

		this._productsService.findProductsWithSortAndFilter(this.searchString, sort,
			this.pageIndex, this.pageSize).pipe(
				catchError(error => of(this._errorHandlerService.handleError(error))),
				finalize(() =>
					this.loadingSubject.next(false))
			)
			.subscribe((response) => {
				this.productsSubject.next(response.content);
				this.productsList = response.content;
				this.total = response.totalElements;
				this.totalPages = Array.from(new Array(Math.ceil(this.total / this.pageSize)), (val, index) => index + 1);
				//this.cd.markForCheck();
				this.productsList.forEach((a: any) => {
					//					if (a.category === "women's clothing " || a.category === "men's clothing") {
					//						a.category = "fashion"
					//					}
					Object.assign(a, { qty: 1 });

				});
			},
				(error) => {
					// this._errorHandlerService.dialogConfig = { ...this.dialogConfig };
					this._errorHandlerService.handleError(error);
				}
			);
	}
}
