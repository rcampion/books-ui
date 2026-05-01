import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Address } from '../../core/interfaces/address.model';
import { Contact } from '../../core/interfaces/contact.model';
import { ContactsService } from '../../core/services/contacts.service';
import { PaginationPage } from 'app/zdslogic-ui-base/core/interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { ContactAddressCreateDialogComponent } from './../contact-address-create-dialog/contact-address-create-dialog.component';
import { ContactAddressDetailsDialogComponent } from './../contact-address-details-dialog/contact-address-details-dialog.component';
import { ContactAddressUpdateDialogComponent } from './../contact-address-update-dialog/contact-address-update-dialog.component';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export interface AddressType {
	value: number;
	viewValue: string;
}

@Component({
	selector: 'app-contact-address-list',
	templateUrl: './contact-address-list.component.html',
	styleUrls: ['./contact-address-list.component.scss']
})
export class ContactAddressListComponent implements OnInit, AfterViewInit {
	addressTypes: AddressType[] = [
		{ value: 0, viewValue: 'Personal' },
		{ value: 1, viewValue: 'Business' },
		{ value: 2, viewValue: 'Shipping' }
	];

	public displayedColumns = ['addressLine1', 'addressLine2', 'addressCity', 'addressState', 'addressZip', 'addressKind', 'details', 'update', 'delete'];

	public dataSource = new MatTableDataSource<Address>();

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

	currentContact: Contact;

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	updateContactAddressDialogRef: MatDialogRef<ContactAddressUpdateDialogComponent>;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: ContactsService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) {

	}

	ngOnInit(): void {
		this.getAllAddresses();

		this.dialogConfig = {
			height: '800px',
			width: '800px',
			disableClose: true,
			data: {}
		};

	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public getAllAddresses(): any {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `contacts/address/${id}`;
		this._repository.getData(apiUrl)
			.subscribe((result) => {
				const data = result as PaginationPage<Address>;
				this.dataSource.data = data.content;
				this.changeDetectorRefs.detectChanges();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	public delete(id: string): any {
		const apiUrl = `contacts/address/${id}`;
		this._repository.delete(apiUrl)
			.subscribe((result) => {
				id = result as string;
				this.getAllAddresses();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	public send(id: string): void {
		const url = `/address/${id}`;
		this._router.navigate([url]);
	}

	public redirectToAdd(): any {
		const id: string = this._activeRoute.snapshot.params['id'];
		this.dialogConfig.data = {
			contactId: id
		};
		const dialogRef = this._dialog.open(ContactAddressCreateDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.getAllAddresses();
			});
	}

	public redirectToUpdate(id: string): any {
		this.dialogConfig.data = {
			addressId: id
		};
		const dialogRef = this._dialog.open(ContactAddressUpdateDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.getAllAddresses();
			});
	}

	public redirectToDetails(id: string): any {
		this.dialogConfig.data = {
			addressId: id
		};
		const dialogRef = this._dialog.open(ContactAddressDetailsDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.getAllAddresses();
			});
	}
}


