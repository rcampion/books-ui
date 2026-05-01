import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { ChatMessageService } from 'app/zdslogic-ui-base/app/core/services/chat-message.service';
import { ChatMessage } from 'app/zdslogic-ui-base/app/core/models/chat-message.model';
import { ChatMessageDataSource } from 'app/zdslogic-ui-base/app/core/services/chat-message.datasource';
import { ChatMessageDeleteDialogComponent } from './../chat-message-delete/chat-message-delete-dialog.component';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-chat-message-list',
	templateUrl: './chat-message-list.component.html',
	styleUrls: ['./chat-message-list.component.scss']
})
export class ChatMessageListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['channelName', 'description', 'details', 'update', 'delete', 'send'];
	dataSource: ChatMessageDataSource;

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentChatMessage: ChatMessage;

	chatChannelsLength = 0;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	deleteChatMessageDialogRef: MatDialogRef<ChatMessageDeleteDialogComponent>;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: ChatMessageService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) {

	}

	ngOnInit(): void {

		this.dataSource = new ChatMessageDataSource(this._repository);

		this.dataSource.loadChatMessages('', '', 'asc', 0, 6);

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

							this.loadChatMessagePage();
						})
					)
					.subscribe();
		*/

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadChatMessagesPage())
			)
			.subscribe(

				(data) => {
					//console.log(data);
				}

			);

	}

	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.loadChatMessagesPage();

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.loadChatMessagesPage();

	}
	/*
		public getAllChatMessages = () => {
			this._repository.getData('chat-message')
				.subscribe((result) => {
					const data = result as PaginationPage<ChatMessage>;
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
		const url = `communicator-admin/channel/create`;
		this._router.navigate([url]);
	}

	public redirectToDetails = (id: string) => {
		const url = `communicator-admin/channel/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `communicator-admin/channel/update/${id}`;
		this._router.navigate([url]);
	}

	public redirectToDelete = (id: string) => {
		this.dialogConfig.data = {
			id: id
		};
		const dialogRef = this._dialog.open(ChatMessageDeleteDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadChatMessagesPage();
			});
	}

	public redirectToEMail = (id: string) => {
		const url = `contacts/chat-channels/email/${id}`;
		this._router.navigate([url]);
	}

	public loadChatMessagesPage(): void {
		//this.input.nativeElement.value,
		this.dataSource.loadChatMessages(
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}
}
