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

import { ChatChannel } from 'app/zdslogic-ui-base/app/core/models/chat-channel.model';
import { ChatChannelDataSource } from 'app/zdslogic-ui-base/app/core/services/chat-channel.datasource';
import { ChatChannelService } from 'app/zdslogic-ui-base/app/core/services/chat-channel.service';
import { ChatChannelDeleteDialogComponent } from './../chat-channel-delete/chat-channel-delete-dialog.component';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-chat-channel-list',
	templateUrl: './chat-channel-list.component.html',
	styleUrls: ['./chat-channel-list.component.scss']
})
export class ChatChannelListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['channelName', 'description', 'details', 'update', 'delete', 'send'];
	dataSource: ChatChannelDataSource;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentChatChannel: ChatChannel;

	chatChannelsLength = 0;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	deleteChatChannelDialogRef: MatDialogRef<ChatChannelDeleteDialogComponent>;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: ChatChannelService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) {

		}

	ngOnInit(): void  {

		this.dataSource = new ChatChannelDataSource(this._repository);

		this.dataSource.loadChatChannels('', '', 'asc', 0, 6);

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

							this.loadChatChannelPage();
						})
					)
					.subscribe();
		*/

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadChatChannelsPage())
			)
			.subscribe(

				(data) => {
					//console.log(data);
				}

			);

	}

	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.loadChatChannelsPage();

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.loadChatChannelsPage();

	}
	/*
		public getAllChatChannels = () => {
			this._repository.getData('chat-channel')
				.subscribe((result) => {
					const data = result as PaginationPage<ChatChannel>;
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
		const url = 'communicator-admin/channel/create';
		this._router.navigate([url]);
	}

	public redirectToDetails(id: string): void {
		const url = `communicator-admin/channel/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `communicator-admin/channel/update/${id}`;
		this._router.navigate([url]);
	}

	public redirectToDelete(id: string): void {
		this.dialogConfig.data = {
			id: id
		};
		const dialogRef = this._dialog.open(ChatChannelDeleteDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadChatChannelsPage();
			});
	}

    public redirectToEMail(id: string): void {
        const url = `contacts/chat-channels/email/${id}`;
        this._router.navigate([url]);
    }

	public loadChatChannelsPage(): any {
		//this.input.nativeElement.value,
		this.dataSource.loadChatChannels(
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}
}
