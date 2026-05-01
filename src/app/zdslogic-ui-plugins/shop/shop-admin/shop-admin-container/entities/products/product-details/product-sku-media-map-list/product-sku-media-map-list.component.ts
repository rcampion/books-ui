import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';

import { PaginationPage } from 'app/zdslogic-ui-base/core/interfaces/pagination';

import { SkuMediaMap } from '../../../../../../core/interfaces/sku-media-map.model';
import { ProductSkuMediaMapsDataSource } from '../../../../../../core/services/product-sku-media-maps.datasource';
import { ProductSkuMediaMapsService } from '../../../../../../core/services/product-sku-media-maps.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { ProductSkuMediaMapDeleteDialogComponent } from './../product-sku-media-map-delete/product-sku-media-map-delete-dialog.component';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { ProductsService } from '../../../../../../core/services/products.service';

@Component({
	selector: 'app-product-sku-media-map-list',
	templateUrl: './product-sku-media-map-list.component.html',
	styleUrls: ['./product-sku-media-map-list.component.scss']
})
export class ProductSkuMediaMapListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['skuId', 'name', 'longDescription', 'details', 'update', 'delete'];

	dataSource: ProductSkuMediaMapsDataSource;

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentSku: SkuMediaMap;

	skusLength = 0;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	deleteSkuDialogRef: MatDialogRef<ProductSkuMediaMapDeleteDialogComponent>;
	productId: number;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: ProductSkuMediaMapsService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) { }

	ngOnInit(): void {

		this.dataSource = new ProductSkuMediaMapsDataSource(this._repository);

		this.productId = this._activeRoute.snapshot.params['id'];

		this.dataSource.loadSkus(this.productId, '', '', 'asc', 0, 6);

		//this.getAllSkus();

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
	}

	/*
		searchValueChanged() {
	
			this.paginator.pageIndex = 0;
	
			this.loadSkusPage();
	
		}	
	
		searchFormSubmitted(type: string = 'All') {
	
			this.paginator.pageIndex = 0;
	
			this.loadSkusPage();
	
		}
	*/

	/*
		public getAllSkus = () => {
			this.productId = this._activeRoute.snapshot.params['id'];
			const apiUrl = `product/sku/${id}`;
			this._repository.getData(apiUrl)
				.subscribe((result) => {
					const data = result as PaginationPage<SkuMediaMap>;
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
		const url = `products/sku/create`;
		this._router.navigate([url]);
	}

	public redirectToDetails = (id: string) => {
		const url = `products/sku/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `products/sku/update/${id}`;
		this._router.navigate([url]);
	}

	public redirectToDelete = (id: string) => {
		this.dialogConfig.data = {
			id: id
		};
		const dialogRef = this._dialog.open(ProductSkuMediaMapDeleteDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadProductSkusPage();
			});
	}

	loadProductSkusPage() {
		//this.input.nativeElement.value,
		this.dataSource.loadSkus(
			this.productId,
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}

}
