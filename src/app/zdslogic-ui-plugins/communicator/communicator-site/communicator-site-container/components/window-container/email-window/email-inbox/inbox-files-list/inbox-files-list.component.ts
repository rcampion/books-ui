import { Component, Inject, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef, TemplateRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap, takeUntil, catchError, finalize, filter } from 'rxjs/operators';
import { merge, of, Subject } from 'rxjs';
import { fromEvent } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { EMailInboxUserFilesService } from '../../core/services/email-inbox-user-files.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { InboxFileDeleteDialogComponent } from './../inbox-file-delete/inbox-file-delete-dialog.component';
import { File } from 'app/zdslogic-ui-base/core/models/file.model';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { AppService } from 'app/zdslogic-ui-base/core/services/app.service';
import { MessageService } from 'app/zdslogic-ui-base/core/services/message.service';
import { MessageDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/message-dialog/message-dialog.component';
import { PaginationPropertySort } from 'app/zdslogic-ui-base/core/interfaces/pagination';
import { EMailInboxFile } from 'app/zdslogic-ui-plugins/emails/core/models/email-inbox-file.model';
import { EMailFilesService } from 'app/zdslogic-ui-plugins/emails/core/services/email-files.service';

@Component({
	selector: 'app-inbox-files-list',
	templateUrl: './inbox-files-list.component.html',
	styleUrls: ['./inbox-files-list.component.scss']
})
export class InboxFilesListComponent implements OnInit, OnDestroy {

	public displayedColumns = ['fromText', 'subject', 'dateSent', 'details', 'delete', 'junk'];
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

	category: string = 'Inbox';
	currentUser: User = new User();

	public file: File;
	mails: EMailInboxFile[];
	usersLength = 0;

	public searchString: string = '';

	sortProperty = 'dateSent';
	sortDirection = 'desc';
	filter: string = '';
	pageIndex=0;
	pageSize=25;
	total=0;

	selectedMail: number;

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	isUserLoggedIn: boolean;
    id: string;

	private _unsubscribeAll: Subject<any> = new Subject<any>();

	// tslint:disable-next-line:max-line-length
	constructor(private _angularLogService: AngularLogService,
		private _activeRoute: ActivatedRoute,
		private _appService: AppService,
		private _dataSharingService: DataSharingService,
		private _eMailFilesService: EMailFilesService,
		private _eMailInboxUserFilesService: EMailInboxUserFilesService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		) {

		// Subscribe here, this will automatically update
		// "isUserLoggedIn" whenever a change to the subject is made.
		this._dataSharingService.isUserLoggedIn.subscribe((value) => {
			this.isUserLoggedIn = value;
		});

	}

	ngOnInit(): void  {
		this._activeRoute.firstChild?.paramMap.pipe(
			filter(params => params.has('id'))
		).subscribe((params) => {
			this.selectedMail = parseInt(params.get('id'), 10);
		});

		this._dataSharingService.isUserLoggedIn.subscribe((value) => {
			this.isUserLoggedIn = value;
		});

		const isLoggedIn = this._appService.checkCredentials();

		this.loadFilesPage();

		this._eMailFilesService.changeFiles?.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((result) => {
				if(result){
					this.loadFilesPage();
				}
			});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.loadFilesPage();

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.loadFilesPage();

	}

	onPaginatorChange($event: PageEvent): void{
		this.pageIndex = this.paginator.pageIndex;
		this.pageSize = this.paginator.pageSize;
		this.loadFilesPage();
	}

	public redirectToAdd = (): void => {
		const url = '/my-emails/create';
		this._router.navigate([url]);
	};

	public onMailSelected(mail: EMailInboxFile): void {
		const url = `/my-emails/inbox/${mail.id}`;
		this._router.navigate([url]);
	};

	public redirectToDetails = (id: string): void => {
		const url = `/my-emails/inbox/${id}`;
		this._router.navigate([url]);
	};

	public redirectToUpdate = (id: string): void => {
		const url = `/my-emails/update/${id}`;
		this._router.navigate([url]);
	};

	loadFilesPage(): void {
		const sort = new PaginationPropertySort();
		sort.property = this.sortProperty;
		sort.direction = this.sortDirection;

		this._eMailInboxUserFilesService.findFilesWithSortAndFilter(this.filter, sort,
			this.pageIndex, this.pageSize)
			.pipe(
					takeUntil(this._unsubscribeAll),
					catchError(() => of([]))
			).subscribe((response) => {
				this.mails = response.content;
				this.total = response.totalElements;
			},
				(error) => {
						this._errorHandlerService.handleError(error);
				}
			);
	}


	public redirectToDownload = (id: string): void => {

		//const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `files/${id}`;

		this._eMailInboxUserFilesService.getData(apiUrl)
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((result) => {
				this.file = result as File;

				const url = `/user-files/details/${id}`;
				// this._router.navigate([url]);

				this._eMailInboxUserFilesService.getFile(id).subscribe((data?: any) => {

					//this.blob = new Blob([data], { type: 'application/pdf' });

					const fileName = this.file.shortFileName;

					const downloadURL = window.URL.createObjectURL(data);
					const link = document.createElement('a');
					link.href = downloadURL;

					link.download = fileName;
					link.click();

				});
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});

	};
}

