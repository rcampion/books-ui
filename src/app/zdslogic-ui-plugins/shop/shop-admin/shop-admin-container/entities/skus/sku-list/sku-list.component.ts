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
import { Router } from '@angular/router';

import { Sku } from '../../../../../core/interfaces/sku.model';
import { SkusDataSource } from '../../../../../core/services/skus.datasource';
import { SkusService } from '../../../../../core/services/skus.service';
import { SkuDeleteDialogComponent } from './../sku-delete/sku-delete-dialog.component';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-sku-list',
	templateUrl: './sku-list.component.html',
	styleUrls: ['./sku-list.component.scss']
})
export class SkuListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['skuId', 'name', 'longDescription', 'details', 'update', 'delete'];
	dataSource: SkusDataSource;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentSku: Sku;

	skusLength = 0;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	deleteSkuDialogRef: MatDialogRef<SkuDeleteDialogComponent>;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: SkusService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) { }

	ngOnInit(): void  {

		this.dataSource = new SkusDataSource(this._repository);

		this.dataSource.loadSkus('', '', 'asc', 0, 6);

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
		
							this.loadSkusPage();
						})
					)
					.subscribe();
		*/

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadSkusPage())
			)
			.subscribe(

				data => {
					//console.log(data);
				}

			);

	}

	searchValueChanged() {

		this.paginator.pageIndex = 0;

		this.loadSkusPage();

	}

	searchFormSubmitted(type: string = 'All') {

		this.paginator.pageIndex = 0;

		this.loadSkusPage();

	}
	/*
		public getAllSkus = () => {
			this._repository.getData('sku')
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
		const url = `shop-admin/sku/create`;
		this._router.navigate([url]);
	}

	public redirectToDetails = (id: string) => {
		const url = `shop-admin/sku/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `shop-admin/sku/update/${id}`;
		this._router.navigate([url]);
	}

	public redirectToDelete = (id: string) => {
		this.dialogConfig.data = {
			id: id
		};
		const dialogRef = this._dialog.open(SkuDeleteDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadSkusPage();
			});
	}

	public redirectToSend(id: string): void {
		const url = `skus/sku/email/${id}`;
		this._router.navigate([url]);
	}

	loadSkusPage() {
		//this.input.nativeElement.value,
		this.dataSource.loadSkus(
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}
}
