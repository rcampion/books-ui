import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { EMailBlacklistFileAttachment } from '../../../core/models/email-blacklist-file-attachment.model';
import { EMailBlacklistFile } from '../../../core/models/email-blacklist-file.model';
import { EMailBlacklistFilesService } from '../../../core/services/email-blacklist-files.service';
import { PaginationPage } from 'app/zdslogic-ui-base/core/interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-blacklist-email-attachment-list',
	templateUrl: './blacklist-file-attachment-list.component.html',
	styleUrls: ['./blacklist-file-attachment-list.component.scss']
})
export class BlacklistFileAttachmentListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['attachment', 'download'];

	public dataSource = new MatTableDataSource<EMailBlacklistFileAttachment>();

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

	public file: EMailBlacklistFileAttachment;

	currentContact: EMailBlacklistFile;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: EMailBlacklistFilesService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) { }

	ngOnInit(): void {
		this.getAllAttachments();
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public getAllAttachments(): any {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `my-blacklist-emails/attachment/${id}`;
		this._repository.getData(apiUrl)
			.subscribe((result) => {
				const data = result as PaginationPage<EMailBlacklistFileAttachment>;
				this.dataSource.data = data.content;
				this.changeDetectorRefs.detectChanges();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	public redirectToDownload(id: string): any {

		//const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `my-blacklist-emails/attachment/file/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.file = result as EMailBlacklistFileAttachment;

				//const url = `/user-files/details/${id}`;
				// this._router.navigate([url]);

				this._repository.getFile(this.file.id).subscribe((data?: any) => {

					const fileName = this.file.attachment;
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

	}
}


