import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { PaginationPage } from 'app/zdslogic-ui-base/core/interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

import { EMailJunkFileAttachment } from '../../../core/models/email-junk-file-attachment.model';
import { EMailJunkFile } from '../../../core/models/email-junk-file.model';
import { EMailJunkUserFilesService } from '../../../core/services/email-junk-user-files.service';

@Component({
	selector: 'app-junk-email-attachment-list',
	templateUrl: './junk-file-attachment-list.component.html',
	styleUrls: ['./junk-file-attachment-list.component.scss']
})
export class JunkFileAttachmentListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['attachment', 'download'];

	public dataSource = new MatTableDataSource<EMailJunkFileAttachment>();

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

	public file: EMailJunkFileAttachment;

	currentContact: EMailJunkFile;

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: EMailJunkUserFilesService,
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
		const apiUrl = `my-junk-emails/attachment/${id}`;
		this._repository.getData(apiUrl)
			.subscribe((result) => {
				const data = result as PaginationPage<EMailJunkFileAttachment>;
				this.dataSource.data = data.content;
				this.changeDetectorRefs.detectChanges();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	public redirectToDownload(id: string): any {

		//const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `my-junk-emails/attachment/file/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.file = result as EMailJunkFileAttachment;

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


