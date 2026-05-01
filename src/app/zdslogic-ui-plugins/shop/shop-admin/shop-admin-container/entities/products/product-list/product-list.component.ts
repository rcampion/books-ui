import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';

import { ProductsService } from '../../../../../core/services/products.service';
import { Product } from '../../../../../core/interfaces/product.model';
import { ProductDeleteDialogComponent } from './../product-delete/product-delete-dialog.component';
import { ProductsDataSource } from '../../../../../core/services/products.datasource';

import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['productId', 'name', 'longDescription','details', 'update', 'delete'];
	dataSource: ProductsDataSource;
	
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentProduct: Product;

	productsLength = 0;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	deleteProductDialogRef: MatDialogRef<ProductDeleteDialogComponent>;

	// tslint:disable-next-line:max-line-length
	constructor(private _angularLogService: AngularLogService, 
	private _repository: ProductsService, 
	private _errorHandlerService: ErrorHandlerService, 
	private _router: Router, 
	private _dialog: MatDialog, 
	private changeDetectorRefs: ChangeDetectorRef) { }
	
	ngOnInit(): void  {

		this.dataSource = new ProductsDataSource(this._repository);

		this.dataSource.loadProducts('', '', 'asc', 0, 6);

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
		
							this.loadProductsPage();
						})
					)
					.subscribe();
		*/

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadProductsPage())
			)
			.subscribe(

				data => {
					//console.log(data);
				}

			);

	}

	searchValueChanged() {

		this.paginator.pageIndex = 0;

		this.loadProductsPage();

	}

	searchFormSubmitted(type: string = 'All') {

		this.paginator.pageIndex = 0;

		this.loadProductsPage();

	}
	/*
		public getAllProducts = () => {
			this._repository.getData('product')
				.subscribe((result) => {
					const data = result as PaginationPage<Product>;
					this.dataSource.data = data.content;
					this.changeDetectorRefs.detectChanges();
				},
					(error) => {
						this._errorHandlerService.handleError(error);
					});
		}
	*/
	public doFilter = (value: string) => {
		//        this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	public redirectToAdd(): void {
		const url = `shop-admin/product/create`;
		this._router.navigate([url]);
	}

	public redirectToDetails = (id: string) => {
		const url = `shop-admin/product/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `shop-admin/product/update/${id}`;
		this._router.navigate([url]);
	}

	public redirectToDelete = (id: string) => {
		this.dialogConfig.data = {
			id: id
		};
		const dialogRef = this._dialog.open(ProductDeleteDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadProductsPage();
			});
	}
	
	loadProductsPage() {
		//this.input.nativeElement.value,
		this.dataSource.loadProducts(
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}
}
