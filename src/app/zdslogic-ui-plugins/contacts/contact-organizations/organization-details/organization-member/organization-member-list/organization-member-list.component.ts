import { Component, Inject, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationMember } from '../../../../core/interfaces/organization-member.model';
import { OrganizationMembersDataSource } from '../../../../core/services/organization-members.datasource';
import { OrganizationsService } from '../../../../core/services/organizations.service';
import { ErrorHandlerService } from '../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';
import { Contact } from '../../../../core/interfaces/contact.model';
import { OrganizationMemberSelectionDialogComponent } from './../organization-member-selection-dialog/organization-member-selection-dialog.component';
import { ContactDeleteDialogComponent } from './../../../../../contacts/contact-delete/contact-delete-dialog.component';

import { AngularLogService } from '../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-organization-member-list',
	templateUrl: './organization-member-list.component.html',
	styleUrls: ['./organization-member-list.component.scss']
})
export class OrganizationMemberListComponent implements OnInit, AfterViewInit {

	organizationId: number;
	public contact: Contact;

	//public displayedColumns = ['firstName', 'lastName', 'title', 'company', 'view', 'details', 'update', 'delete'];
	public displayedColumns = ['fullName', 'company', 'title', 'view', 'details', 'update', 'delete'];

	dataSource: OrganizationMembersDataSource;

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentOrganizationMember: OrganizationMember;

	private deleteDialogConfig;
	private selectDialogConfig;

	public searchString: string = '';

	sortProperty = '';
	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _activeRoute: ActivatedRoute,
		private _changeDetectorRefs: ChangeDetectorRef,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService,
		private _organizationsService: OrganizationsService,
		@Inject(Router) private _router: Router,

	) {
		this.organizationId = _activeRoute.snapshot.params['id'];
	}

	ngOnInit(): void {

		this.dataSource = new OrganizationMembersDataSource(this._organizationsService);

		this.dataSource.loadOrganizationMembers(this.organizationId, '', '', 'asc', 0, 6);

		this.deleteDialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

		this.selectDialogConfig = {
			height: '800px',
			width: '800px',
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

							this.loadOrganizationMembersPage();
						})
					)
					.subscribe();
		*/
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadOrganizationMembersPage())
			)
			.subscribe(

				(data) => {
					//console.log(data);
				}

			);

	}
	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.loadOrganizationMembersPage();

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.loadOrganizationMembersPage();

	}

	public delete(element: OrganizationMember): void {

		if (element.contactId) {
			let id = element.id;
			const apiUrl = `organization/member/${id}`;
			this._organizationsService.delete(apiUrl)
				.subscribe((result) => {
					id = result as string;
					this.loadOrganizationMembersPage();
				},
					(error) => {
						this._errorHandlerService.handleError(error);
					});
		} else {
			const id = element.id;
			this.deleteDialogConfig.data = {
				id: id
			};
			const dialogRef = this._dialog.open(ContactDeleteDialogComponent, this.deleteDialogConfig)
				.afterClosed().subscribe((result) => {
					this.loadOrganizationMembersPage();
				});
		}
	}

	public redirectToAdd(): void {
		const id: string = this._activeRoute.snapshot.params['id'];
		this.selectDialogConfig.data = {
			organizationId: id
		};
		const dialogRef = this._dialog.open(OrganizationMemberSelectionDialogComponent, this.selectDialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadOrganizationMembersPage();
			});
	}

	public redirectToDetails(element: OrganizationMember): void {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/details/${element.contactId}`;
		} else {
			url = `/contacts/contact/details/${element.id}`;
		}
		this._router.navigate([url]);
	}

	public redirectToUpdate(element: OrganizationMember): void {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/update/${element.contactId}`;
		} else {
			url = `/contacts/contact/update/${element.id}`;
		}
		this._router.navigate([url]);
	}

	public redirectToProfile(element: OrganizationMember): void {
		let id = '';
		if (element.contactId) {
			id = element.contactId;
		} else {
			id = element.id;
		}

		const apiUrl = `contacts/${id}`;

		this._organizationsService.getData(apiUrl)
			.subscribe((result) => {
				this.contact = result as Contact;
				const id = this.contact.userName;
				const url = `/profiles/${id}`;
				this._router.navigate([url]);
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	public doFilter(value: string): void {
		//       this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	loadOrganizationMembersPage(): any {
		//this.input.nativeElement.value,
		this.dataSource.loadOrganizationMembers(
			this.organizationId,
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}
}
