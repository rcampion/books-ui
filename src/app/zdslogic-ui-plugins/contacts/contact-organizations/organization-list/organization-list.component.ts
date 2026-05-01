import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Organization } from '../../core/interfaces/organization.model';
import { OrganizationsDataSource } from '../../core/services/organizations.datasource';
import { OrganizationsService } from '../../core/services/organizations.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Router } from '@angular/router';
import { OrganizationDeleteDialogComponent } from './../organization-delete/organization-delete-dialog.component';

import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-organization-list',
	templateUrl: './organization-list.component.html',
	styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['organizationName', 'organizationDescription', 'details', 'update', 'delete', 'send'];
	dataSource: OrganizationsDataSource;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentOrganization: Organization;

	organizationsLength = 0;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	deleteOrganizationDialogRef: MatDialogRef<OrganizationDeleteDialogComponent>;

	// tslint:disable-next-line:max-line-length
	constructor(private _angularLogService: AngularLogService, private _repository: OrganizationsService, private _errorHandlerService: ErrorHandlerService, private _router: Router, private _dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }
	ngOnInit(): void  {

		this.dataSource = new OrganizationsDataSource(this._repository);

		this.dataSource.loadOrganizations('', '', 'asc', 0, 6);

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
		
							this.loadOrganizationsPage();
						})
					)
					.subscribe();
		*/

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadOrganizationsPage())
			)
			.subscribe(

				data => {
					//console.log(data);
				}

			);

	}

	searchValueChanged() {

		this.paginator.pageIndex = 0;

		this.loadOrganizationsPage();

	}

	searchFormSubmitted(type: string = 'All') {

		this.paginator.pageIndex = 0;

		this.loadOrganizationsPage();

	}
	/*
		public getAllOrganizations = () => {
			this._repository.getData('organization')
				.subscribe((result) => {
					const data = result as PaginationPage<Organization>;
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
		const url = `contacts/organizations/create`;
		this._router.navigate([url]);
	}

	public redirectToDetails = (id: string) => {
		const url = `contacts/organizations/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `contacts/organizations/update/${id}`;
		this._router.navigate([url]);
	}

	public redirectToDelete = (id: string) => {
		this.dialogConfig.data = {
			id: id
		};
		const dialogRef = this._dialog.open(OrganizationDeleteDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadOrganizationsPage();
			});
	}

    public redirectToEMail = (id: string) => {
        const url = `contacts/organizations/email/${id}`;
        this._router.navigate([url]);
    }
	
	loadOrganizationsPage() {
		//this.input.nativeElement.value,
		this.dataSource.loadOrganizations(
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}
}
