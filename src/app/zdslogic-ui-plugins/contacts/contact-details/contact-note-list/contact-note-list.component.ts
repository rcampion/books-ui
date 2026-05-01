import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Note } from '../../core/interfaces/note.model';
import { Contact } from '../../core/interfaces/contact.model';
import { ContactsService } from '../../core/services/contacts.service';
import { PaginationPage } from 'app/zdslogic-ui-base/core/interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContactNoteCreateDialogComponent } from './../contact-note-create-dialog/contact-note-create-dialog.component';
import { ContactNoteDetailsDialogComponent } from './../contact-note-details-dialog/contact-note-details-dialog.component';
import { ContactNoteUpdateDialogComponent } from './../contact-note-update-dialog/contact-note-update-dialog.component';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export interface NoteType {
	value: number;
	viewValue: string;
}

@Component({
	selector: 'app-contact-note-list',
	templateUrl: './contact-note-list.component.html',
	styleUrls: ['./contact-note-list.component.scss']
})
export class ContactNoteListComponent implements OnInit, AfterViewInit {
	noteTypes: NoteType[] = [
		{ value: 0, viewValue: 'Personal' },
		{ value: 1, viewValue: 'Business' }

	];

	public displayedColumns = ['createdAt', 'updatedAt', 'description', 'details', 'update', 'delete'];

	public dataSource = new MatTableDataSource<Note>();

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

	currentContact: Contact;

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	updateContactNoteDialogRef: MatDialogRef<ContactNoteUpdateDialogComponent>;

	// tslint:disable-next-line:max-line-length
	constructor(private _angularLogService: AngularLogService,
		private _repository: ContactsService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) { }

	ngOnInit(): void {
		this.getAllNotees();

		this.dialogConfig = {
			height: '800px',
			width: '1100px',
			disableClose: true,
			data: {}
		};

	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public getAllNotees(): any {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `contacts/note/${id}`;
		this._repository.getData(apiUrl)
			.subscribe((result) => {
				const data = result as PaginationPage<Note>;
				this.dataSource.data = data.content;
				this.changeDetectorRefs.detectChanges();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	public delete(id: string): any {
		const apiUrl = `contacts/note/${id}`;
		this._repository.delete(apiUrl)
			.subscribe((result) => {
				id = result as string;
				this.getAllNotees();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	public redirectToAdd(): void {
		const id: string = this._activeRoute.snapshot.params['id'];
		this.dialogConfig.data = {
			contactId: id
		};
		const dialogRef = this._dialog.open(ContactNoteCreateDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.getAllNotees();
			});
	}

	public redirectToUpdate(id: string): void {
		this.dialogConfig.data = {
			noteId: id
		};
		const dialogRef = this._dialog.open(ContactNoteUpdateDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.getAllNotees();
			});
	}

	public redirectToDetails(id: string): void {
		this.dialogConfig.data = {
			noteId: id
		};
		const dialogRef = this._dialog.open(ContactNoteDetailsDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.getAllNotees();
			});
	}
}


