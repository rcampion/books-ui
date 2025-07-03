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

import { AddressDataSource } from '../../../../../core/services/address.datasource';
import { AddressDeleteDialogComponent } from './../address-delete/address-delete-dialog.component';

import { AddressService } from '../../../../../core/services/address.service';
import { Address } from '../../../../../core/models/address.model';
import { SuccessDialogComponent } from '../../../../../../../zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-address-list',
	templateUrl: './address-list.component.html',
	styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['addressId','streetNumber', 'streetName','city', 'countryId', 'details', 'update', 'delete'];
	dataSource: AddressDataSource;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentAddress: Address;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	deleteAddressDialogRef: MatDialogRef<AddressDeleteDialogComponent>;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: AddressService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) { }

	ngOnInit(): void {

		this.dataSource = new AddressDataSource(this._repository);

		this.dataSource.loadAddresss('', '', 'asc', 0, 6);

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
							this.loadAddresssPage();
						})
					)
					.subscribe();
		*/

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadAddresssPage())
			)
			.subscribe(

				(data) => {
					console.log(data);
				}

			);

	}

	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.loadAddresssPage();

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.loadAddresssPage();

	}
	/*
		public getAllAddresss = () => {
			this._repository.getData('address')
				.subscribe(res => {
					const data = res as PaginationPage<Address>;
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
		const url = 'books-admin/address/create';
		this._router.navigate([url]);
	}

	public redirectToDetails(id: string): void {
		const url = `books-admin/address/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `books-admin/address/update/${id}`;
		this._router.navigate([url]);
	}

	public redirectToDelete(id: string): void{
		this.dialogConfig.data = {
			id: id
		};
		const dialogRef = this._dialog.open(AddressDeleteDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadAddresssPage();
			});
	}

    public redirectToSend(id: string): void {
        const url = `books-admin/address/email/${id}`;
        this._router.navigate([url]);
    }

	loadAddresssPage(): any {
		//this.input.nativeElement.value,
		this.dataSource.loadAddresss(
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);
	}
}
