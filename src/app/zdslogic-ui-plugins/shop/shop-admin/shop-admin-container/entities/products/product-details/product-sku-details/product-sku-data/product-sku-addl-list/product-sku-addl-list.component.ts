import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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

import { Sku } from '../../../../../../../../core/interfaces/sku.model';
import { ProductSkusDataSource } from '../../../../../../../../core/services/product-skus.datasource';
import { ProductSkusService } from '../../../../../../../../core/services/product-skus.service';
import { ProductSkuDeleteDialogComponent } from './../../../product-sku-delete/product-sku-delete-dialog.component';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-sku-addl-list',
	templateUrl: './product-sku-addl-list.component.html',
	styleUrls: ['./product-sku-addl-list.component.scss']
})
export class ProductSkuAddlListComponent implements OnInit, AfterViewInit {
	//@Input() public sku: Sku;
	public sku: Sku;
	public displayedColumns = ['skuId', 'name', 'longDescription', 'details', 'update', 'delete'];

	dataSource: ProductSkusDataSource;
	//public dataSource = new MatTableDataSource<Sku>();

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	skusLength = 0;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	deleteSkuDialogRef: MatDialogRef<ProductSkuDeleteDialogComponent>;
	productId: string;
    total: number = 0;
    dataLoaded: boolean = false;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: ProductSkusService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) { }

	ngOnInit(): void  {

		this.dataSource = new ProductSkusDataSource(this._repository);

		this.getSkuDetails();
		
		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}

	ngAfterViewInit(): void {


	}

	private getSkuDetails = () => {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `skus/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				//const data = result as PaginationPage<Sku>;

				this.sku = result as Sku;
				this.productId = this.sku.defaultProductId;
				if(this.productId){	
					this.dataSource.loadProductSkusByAddlProductId(this.productId, '', '', 'asc', 0, 6);
				}
	this.dataSource.skusSubject.subscribe((data) => {
	//console.log(data);
	//console.log(data.length);
	if(data.length > 0){

		this.total = data.length;
		this.dataLoaded = true;

		this.sort.sortChange.subscribe((event) => {
		this.paginator.pageIndex = 0;
		this.sortProperty = event.active;
		});

		merge(this.sort.sortChange, this.paginator.page)
		.pipe(
			tap(() => this.loadProductSkusPage())
		)
		.subscribe(data => {
		//console.log(data);
		}

		);
	}
	});
		

			},
				(error) => {
					this._errorHandlerService.handleError(error);
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
					const data = result as PaginationPage<Sku>;
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
		const url = `shop-admin/product/sku/create`;
		this._router.navigate([url]);
	}

	public redirectToDetails = (id: string) => {
		const url = `shop-admin/product/sku/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `shop-admin/product/sku/update/${id}`;
		this._router.navigate([url]);
	}

	public redirectToDelete = (id: string) => {
		this.dialogConfig.data = {
			id: id
		};
		const dialogRef = this._dialog.open(ProductSkuDeleteDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadProductSkusPage();
			});
	}

	loadProductSkusPage() {
		//this.input.nativeElement.value,
		this.dataSource.loadProductSkusByAddlProductId(
			this.productId,
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}

}
