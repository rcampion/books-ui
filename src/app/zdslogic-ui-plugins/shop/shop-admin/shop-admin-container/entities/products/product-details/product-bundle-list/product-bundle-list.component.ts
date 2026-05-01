import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { PaginationPage } from '../../../../../../core/interfaces/pagination';
import { ProductBundle } from '../../../../../../core/interfaces/product-bundle.model';
import { ProductBundlesDataSource } from '../../../../../../core//services/product-bundles.datasource';
import { ProductBundlesService } from '../../../../../../core/services/product-bundles.service';
import { ProductBundleDeleteDialogComponent } from './../product-bundle-delete/product-bundle-delete-dialog.component';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-bundle-list',
	templateUrl: './product-bundle-list.component.html',
	styleUrls: ['./product-bundle-list.component.scss']
})
export class ProductBundleListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['productId', 'autoBundle', 'bundlePriority', 'bundlePromotable', 'details', 'update', 'delete'];
	//public dataSource = new MatTableDataSource<ProductBundle>();
	dataSource: ProductBundlesDataSource;

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentProductBundle: ProductBundle;

	productBundlesLength = 0;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	productId: number;

	deleteProductBundleDialogRef: MatDialogRef<ProductBundleDeleteDialogComponent>;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: ProductBundlesService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef,
		private _activeRoute: ActivatedRoute) { }

	ngOnInit(): void {

		this.dataSource = new ProductBundlesDataSource(this._repository);

		this.productId = this._activeRoute.snapshot.params['id'];

		this.dataSource.loadProductBundles(this.productId, '', '', 'asc', 0, 6);

		//this.getAllBundles();

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

		//this.dataSource.sort = this.sort;
		//this.dataSource.paginator = this.paginator;
	}

	/*
		public getAllBundles = () => {
			const id: string = this._activeRoute.snapshot.params['id'];
			const apiUrl = `productBundle/${id}`;
			this._repository.getData(apiUrl)
				.subscribe((result) => {
					const data = result as PaginationPage<ProductBundle>;
					this.dataSource.data = data.content;
					this.changeDetectorRefs.detectChanges();
				},
					(error) => {
						this._errorHandlerService.handleError(error);
					});
		}

		public doFilter = (value: string) => {
			//        this.dataSource.filter = value.trim().toLocaleLowerCase();
		}
	*/
	public redirectToAdd(): void {
		const url = 'product-bundle/product-bundle/create';
		this._router.navigate([url]);
	}

	public redirectToDetails(id: string): void {
		const url = `products/product-bundle/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `products/product-bundle/product-bundle/update/${id}`;
		this._router.navigate([url]);
	}

	public delete(id: string): any {
		const apiUrl = `contacts/email/${id}`;
		this._repository.delete(apiUrl)
			.subscribe((result) => {
				id = result as string;
				this.loadProductBundlesPage();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	loadProductBundlesPage(): any {
		//this.input.nativeElement.value,
		this.dataSource.loadProductBundles(
			this.productId,
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}

}
