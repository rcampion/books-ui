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

import { AddressStatusDataSource } from '../../../../../core/services/address-status.datasource';
import { AddressStatusDeleteDialogComponent } from './../address-status-delete/address-status-delete-dialog.component';

import { AddressStatusService } from '../../../../../core/services/address-status.service';
import { AddressStatus } from '../../../../../core/models/address-status.model';
import { SuccessDialogComponent } from '../../../../../../../zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-address-status-list',
	templateUrl: './address-status-list.component.html',
	styleUrls: ['./address-status-list.component.scss']
})
export class AddressStatusListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['statusId','addressStatus', 'details', 'update', 'delete'];
	dataSource: AddressStatusDataSource;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentAddressStatus: AddressStatus;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	deleteAddressStatusDialogRef: MatDialogRef<AddressStatusDeleteDialogComponent>;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: AddressStatusService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) { }

	ngOnInit(): void {

		this.dataSource = new AddressStatusDataSource(this._repository);

		this.dataSource.loadAddressStatuss('', '', 'asc', 0, 6);

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
							this.loadAddressStatussPage();
						})
					)
					.subscribe();
		*/

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadAddressStatussPage())
			)
			.subscribe(

				(data) => {
					console.log(data);
				}

			);

	}

	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.loadAddressStatussPage();

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.loadAddressStatussPage();

	}
	/*
		public getAllAddressStatuss = () => {
			this._repository.getData('address')
				.subscribe(res => {
					const data = res as PaginationPage<AddressStatus>;
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
		const url = 'address/address/create';
		this._router.navigate([url]);
	}

	public redirectToDetails(id: string): void {
		const url = `address/address/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `address/address/update/${id}`;
		this._router.navigate([url]);
	}

	public redirectToDelete(id: string): void{
		this.dialogConfig.data = {
			id: id
		};
		const dialogRef = this._dialog.open(AddressStatusDeleteDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadAddressStatussPage();
			});
	}

    public redirectToSend(id: string): void {
        const url = `addresss/address/email/${id}`;
        this._router.navigate([url]);
    }

	loadAddressStatussPage(): any {
		//this.input.nativeElement.value,
		this.dataSource.loadAddressStatuss(
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);
	}
}
