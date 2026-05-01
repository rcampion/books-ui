import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { BehaviorSubject, merge } from 'rxjs';
import { fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { Contact } from '../core/interfaces/contact.model';
import { ContactsDataSource } from '..//core/services/contacts.datasource';
import { ContactsService } from '..//core/services/contacts.service';
//import { ContactsPostService } from 'app/zdslogic-ui-base/core/services/contacts-post.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Router } from '@angular/router';
import { ContactDeleteDialogComponent } from './../contact-delete/contact-delete-dialog.component';
import { defaultItemsCountPerPage } from 'app/zdslogic-ui-base/common/constants';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { ProfileEntity } from 'app/zdslogic-ui-base/core/models/profile-entity.model';
import { ProfileEntityService } from 'app/zdslogic-ui-base/core//services/profile-entity.service';

@Component({
	selector: 'app-contact-list',
	templateUrl: './contact-list.component.html',
	styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, AfterViewInit, OnDestroy {

	//public displayedColumns = ['firstName', 'lastName', 'fullName', 'company', 'title', 'view', 'details', 'update', 'delete'];
	public displayedColumns = ['fullName', 'company', 'title', 'view', 'details', 'update', 'delete'];

	dataSource: ContactsDataSource;

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', { static: false }) input: ElementRef;

	currentContact: Contact;
	currentUser: User = new User();
	isUser: boolean;
	currentProfile: ProfileEntity;

	contacts: Contact[];

	contactsLength = 0;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	deleteContactDialogRef: MatDialogRef<ContactDeleteDialogComponent>;

	pageNumber: number;

	messages1: any;
	mysubid1 = 'my-subscription-id-001';
	messages2: any;
	mysubid2 = 'my-subscription-id-002';
	messages3: any;
	mysubid3 = 'my-subscription-id-003';

	private unsubscribeSubject: Subject<void> = new Subject<void>();

	// tslint:disable-next-line:max-line-length
	constructor(private _angularLogService: AngularLogService,
		private _usersService: UsersService,
		//private service: ContactsPostService,
		private _contactsService: ContactsService,
		private _profileEntityService: ProfileEntityService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) { }

	ngOnInit(): void {

		this.dataSource = new ContactsDataSource(this._contactsService, this._errorHandlerService);

		this.dataSource.loadContacts('', '', 'asc', 0, 6);

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
/*
		this.messages1 = this.service
			.onSave(this.mysubid1)
			.pipe(takeUntil(this.unsubscribeSubject))
			.subscribe(post => {

				this.dataSource.loadContacts('', '', 'asc', 0, 6);

			});

		this.messages2 = this.service
			.onUpdate(this.mysubid2)
			.pipe(takeUntil(this.unsubscribeSubject))
			.subscribe(post => {

				this.dataSource.loadContacts('', '', 'asc', 0, 6);

			});

		this.messages3 = this.service
			.onDelete(this.mysubid3)
			.pipe(takeUntil(this.unsubscribeSubject))
			.subscribe(post => {

				this.dataSource.loadContacts('', '', 'asc', 0, 6);

			});
*/
	}

	ngOnDestroy(): void {
		this.unsubscribeSubject.next();
		this.unsubscribeSubject.complete();
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

							this.loadContactsPage();
						})
					)
					.subscribe();
		*/
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadContactsPage())
			)
			.subscribe(

				(data) => {
					//console.log(data);
				}

			);
	}

	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.loadContactsPage();

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.loadContactsPage();

	}

	public redirectToAdd = (): void => {
		const url = '/contacts/contact/create';
		this._router.navigate([url]);
	};

	public redirectToProfile = (id: string): void => {

		const apiUrl = `contacts/${id}`;

		this._contactsService.getData(apiUrl)
			.subscribe((result) => {
				this.currentContact = result as Contact;
				//const lowercaseFirstName = this.currentContact.firstName.toLowerCase();
				//const lowercaseLastName = this.currentContact.lastName.toLowerCase();
				//const userName = lowercaseFirstName + '.' + lowercaseLastName;
				const userName = this.currentContact.userName;
				const apiUrl = `profile/${userName}`;

				this._profileEntityService.getData(apiUrl)
					.subscribe((result) => {
						this.currentProfile = result as ProfileEntity;
						const url = '/profiles/' + this.currentProfile.userName;
						this._router.navigate([url]);
					},
						(error) => {
							this._errorHandlerService.handleError(error);
						});
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	};

	public redirectToDetails = (id: string): void => {
		const url = `/contacts/contact/details/${id}`;
		this._router.navigate([url]);
	};

	public redirectToUpdate = (id: string): void => {
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
	};

	public redirectToDelete = (id: string): void => {
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
					this.dialogConfig.data = {
						id
					};
					const dialogRef = this._dialog.open(ContactDeleteDialogComponent, this.dialogConfig)
						.afterClosed().subscribe((result) => {
							this.loadContactsPage();
						});
				}
			});
	};

	loadContactsPage(): void {
		// this.input.nativeElement.value,
		this.dataSource.loadContacts(
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}

}
