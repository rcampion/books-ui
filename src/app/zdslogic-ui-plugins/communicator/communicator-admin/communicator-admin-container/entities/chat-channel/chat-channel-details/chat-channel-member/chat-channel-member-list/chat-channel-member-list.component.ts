import { Component, Inject, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ChatChannelMember } from 'app/zdslogic-ui-base/app/core/interfaces/chat-channel-member.model';
import { ChatChannelMembersDataSource } from 'app/zdslogic-ui-base/app/core/services/chat-channel-members.datasource';
import { ChatChannelService } from 'app/zdslogic-ui-base/app/core/services/chat-channel.service';
import { Contact } from './../../../../../../../../../zdslogic-ui-plugins/contacts/core/interfaces/contact.model';
import { ChatChannelMemberSelectionDialogComponent } from './../chat-channel-member-selection-dialog/chat-channel-member-selection-dialog.component';
import { ContactDeleteDialogComponent } from './../../../../../../../../../zdslogic-ui-plugins/contacts/contact-delete/contact-delete-dialog.component';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

@Component({
	selector: 'app-chat-channel-member-list',
	templateUrl: './chat-channel-member-list.component.html',
	styleUrls: ['./chat-channel-member-list.component.scss']
})
export class ChatChannelMemberListComponent implements OnInit, AfterViewInit {

	channelId: number;
	public contact: Contact;

	//public displayedColumns = ['firstName', 'lastName', 'title', 'company', 'view', 'details', 'update', 'delete'];
	public displayedColumns = ['fullName', 'company', 'title', 'view', 'details', 'update', 'delete'];

	dataSource: ChatChannelMembersDataSource;

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentChatChannelMember: ChatChannelMember;

	private deleteDialogConfig;
	private selectDialogConfig;

	public searchString: string = '';

	sortProperty = '';
	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _activeRoute: ActivatedRoute,
		private _changeDetectorRefs: ChangeDetectorRef,
		private _chatChannelService: ChatChannelService,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService,
		@Inject(Router) private _router: Router,

	) {
		this.channelId = _activeRoute.snapshot.params['id'];
	}

	ngOnInit(): void {

		this.dataSource = new ChatChannelMembersDataSource(this._chatChannelService);

		this.dataSource.loadChatChannelMembers(this.channelId, '', '', 'asc', 0, 6);

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

							this.loadChatChannelMembersPage();
						})
					)
					.subscribe();
		*/
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadChatChannelMembersPage())
			)
			.subscribe(

				(data) => {
					//console.log(data);
				}

			);

	}

	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.loadChatChannelMembersPage();

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.loadChatChannelMembersPage();

	}

	public delete(element: ChatChannelMember): void {

		if (element.contactId) {
			let id = element.id;
			const apiUrl = `chat-channel/member/${id}`;
			this._chatChannelService.delete(apiUrl)
				.subscribe((result) => {
					id = result as string;
					this.loadChatChannelMembersPage();
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
					this.loadChatChannelMembersPage();
				});
		}
	}

	public redirectToAdd(): void {
		const id: string = this._activeRoute.snapshot.params['id'];
		this.selectDialogConfig.data = {
			channelId: id
		};
		const dialogRef = this._dialog.open(ChatChannelMemberSelectionDialogComponent, this.selectDialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadChatChannelMembersPage();
			});
	}

	public redirectToDetails(element: ChatChannelMember): void {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/details/${element.contactId}`;
		} else {
			url = `/contacts/contact/details/${element.id}`;
		}
		this._router.navigate([url]);
	}

	public redirectToUpdate(element: ChatChannelMember): void {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/update/${element.contactId}`;
		} else {
			url = `/contacts/contact/update/${element.id}`;
		}
		this._router.navigate([url]);
	}

	public redirectToProfile(element: ChatChannelMember): void {
		let id = '';
		if (element.contactId) {
			id = element.contactId;
		} else {
			id = element.id;
		}

		const apiUrl = `contacts/${id}`;

		this._chatChannelService.getData(apiUrl)
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

	loadChatChannelMembersPage(): any {
		//this.input.nativeElement.value,
		this.dataSource.loadChatChannelMembers(
			this.channelId,
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}
}
