import { Component, Inject, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { GroupMember } from '../../../../core/interfaces/group-member.model';
import { GroupMembersDataSource } from '../../../../core/services/group-members.datasource';
import { GroupsService } from '../../../../core/services/groups.service';
import { User } from '../../../../../../zdslogic-ui-base/core/models/user.model';
import { UsersService } from '../../../../../../zdslogic-ui-base/core/services/users.service';
import { ContactsService } from '../../../../core/services/contacts.service';
import { ErrorHandlerService } from '../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';
import { Contact } from '../../../../core/interfaces/contact.model';
import { GroupMemberSelectionDialogComponent } from './../group-member-selection-dialog/group-member-selection-dialog.component';
import { ContactDeleteDialogComponent } from '../../../../contact-delete/contact-delete-dialog.component';
import { AngularLogService } from '../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-group-member-list',
	templateUrl: './group-member-list.component.html',
	styleUrls: ['./group-member-list.component.scss']
})
export class GroupMemberListComponent implements OnInit, AfterViewInit {

	groupId: number;
	public contact: Contact;

	//public displayedColumns = ['firstName', 'lastName', 'fullName', 'title', 'company', 'view', 'details', 'update', 'delete'];
	public displayedColumns = ['fullName', 'company', 'title', 'view', 'details', 'update', 'delete'];

	dataSource: GroupMembersDataSource;

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentContact: Contact;
	currentUser: User = new User();
	isUser: boolean;
	currentGroupMember: GroupMember;

	private deleteDialogConfig;
	private selectDialogConfig;

	public searchString: string = '';

	sortProperty = '';
	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _usersService: UsersService,
		private _contactsService: ContactsService,
		private groupRepository: GroupsService,
		private _errorHandlerService: ErrorHandlerService,
		@Inject(Router) private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _dialog: MatDialog,
		private _changeDetectorRefs: ChangeDetectorRef) {
		this.groupId = _activeRoute.snapshot.params['id'];
	}

	ngOnInit(): void  {

		this.dataSource = new GroupMembersDataSource(this.groupRepository);

		this.dataSource.loadGroupMembers(this.groupId, '', '', 'asc', 0, 6);

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

							this.loadGroupMembersPage();
						})
					)
					.subscribe();
		*/
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadGroupMembersPage())
			)
			.subscribe(

				(data) => {
					//console.log(data);
				}

			);

	}

	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.loadGroupMembersPage();

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.loadGroupMembersPage();

	}

	public delete(element: GroupMember): void {

		if (element.contactId) {
			let id = element.id;
			const apiUrl = `group/member/${id}`;
			this.groupRepository.delete(apiUrl)
				.subscribe((result) => {
					id = result as string;
					this.loadGroupMembersPage();
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
					this.loadGroupMembersPage();
				});
		}
	}

	public redirectToAdd(): void {
		const id: string = this._activeRoute.snapshot.params['id'];
		this.selectDialogConfig.data = {
			groupId: id
		};
		const dialogRef = this._dialog.open(GroupMemberSelectionDialogComponent, this.selectDialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadGroupMembersPage();
			});
	}

	public redirectToDetails(element: GroupMember): void {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/details/${element.contactId}`;
		} else {
			url = `/contacts/contact/details/${element.id}`;
		}
		this._router.navigate([url]);
	}

	public redirectToUpdate(element: GroupMember): void {

		let id = '';
		if (element.contactId) {
			id = element.contactId;
		} else {
			id = element.id;
		}

		const apiUrl = `contacts/${id}`;
		this._contactsService.getData(apiUrl)
			.subscribe((result) => {
				this.currentContact = result as Contact;

				this.currentUser = this._usersService.getCurrentUser();

				this.isUser = (this.currentUser.userName === this.currentContact.userName);
				if(!this.isUser){
					this.isUser = (this.currentUser.id === this.currentContact.ownerId);
				}

				if (this._usersService.isUserAuthorized(['ROLE_ADMIN'])) {
					this.isUser = true;
				}

				if (this.isUser) {
					const url = `/contacts/contact/update/${id}`;
					this._router.navigate([url]);
				}
			});
	}

	public redirectToProfile(element: GroupMember): void {
		let id = '';
		if (element.contactId) {
			id = element.contactId;
		} else {
			id = element.id;
		}

		const apiUrl = `contacts/${id}`;

		this.groupRepository.getData(apiUrl)
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

	loadGroupMembersPage(): any {
		//this.input.nativeElement.value,
		this.dataSource.loadGroupMembers(
			this.groupId,
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}
}
