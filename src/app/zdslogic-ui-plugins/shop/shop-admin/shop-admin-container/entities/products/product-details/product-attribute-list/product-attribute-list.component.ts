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
import { ProductAttribute } from '../../../../../../core/interfaces/product-attribute.model';
import { ProductAttributesDataSource } from '../../../../../../core//services/product-attributes.datasource';
import { ProductAttributesService } from '../../../../../../core/services/product-attributes.service';
import { ProductAttributeDeleteDialogComponent } from './../product-attribute-delete/product-attribute-delete-dialog.component';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-attribute-list',
	templateUrl: './product-attribute-list.component.html',
	styleUrls: ['./product-attribute-list.component.scss']
})
export class ProductAttributeListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['productAttributeId', 'name', 'productId', 'details', 'update', 'delete'];
	//public dataSource = new MatTableDataSource<ProductAttribute>();

	dataSource: ProductAttributesDataSource;

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentProductAttribute: ProductAttribute;

	productAttributesLength = 0;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	productId: number;

	deleteProductAttributeDialogRef: MatDialogRef<ProductAttributeDeleteDialogComponent>;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: ProductAttributesService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef,
		private _activeRoute: ActivatedRoute) { }

	ngOnInit(): void {

		this.dataSource = new ProductAttributesDataSource(this._repository);

		this.productId = this._activeRoute.snapshot.params['id'];

		this.dataSource.loadProductAttributes(this.productId, '', '', 'asc', 0, 6);

		//this.getAllAttributes();

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
		public getAllAttributes = () => {
			const id: string = this._activeRoute.snapshot.params['id'];
			const apiUrl = `productAttribute/${id}`;
			this._repository.getData(apiUrl)
				.subscribe((result) => {
					const data = result as PaginationPage<ProductAttribute>;
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
		const url = `product-attribute/product-attribute/create`;
		this._router.navigate([url]);
	}

	public redirectToDetails = (id: string) => {
		const url = `product-attribute/product-attribute/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `product-attribute/product-attribute/update/${id}`;
		this._router.navigate([url]);
	}

	public redirectToDelete = (id: string) => {
		this.dialogConfig.data = {
			id: id
		};
		const dialogRef = this._dialog.open(ProductAttributeDeleteDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadProductAttributesPage
			});
	}

	public redirectToSend(id: string): void {
		const url = `productAttribute/productAttribute/email/${id}`;
		this._router.navigate([url]);
	}

	loadProductAttributesPage() {
		//this.input.nativeElement.value,
		this.dataSource.loadProductAttributes(
			this.productId,
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}

}
