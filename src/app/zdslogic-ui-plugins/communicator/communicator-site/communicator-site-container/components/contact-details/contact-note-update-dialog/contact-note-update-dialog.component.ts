import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from '../../core/services/contacts.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Note } from '../../core/interfaces/note.model';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export interface NoteType {
	value: number;
	viewValue: string;
}

@Component({
	selector: 'app-contact-note-update-dialog',
	templateUrl: './contact-note-update-dialog.component.html',
	styleUrls: ['./contact-note-update-dialog.component.scss']
})
export class ContactNoteUpdateDialogComponent implements OnInit {
	noteId: string;
	public note: Note;
	public noteForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});
	
    public editor = ClassicEditor; 
    public content;

	noteTypes: NoteType[] = [
		{ value: 0, viewValue: 'Personal' },
		{ value: 1, viewValue: 'Business' }

	];

	constructor(private _angularLogService: AngularLogService,
		private _location: Location,

		private _repository: ContactsService,

		private _activeRoute: ActivatedRoute,

		private _errorHandlerService: ErrorHandlerService,

		private _dialogRef: MatDialogRef<ContactNoteUpdateDialogComponent>,

		private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

		this.noteId = data.noteId;
	}

	ngOnInit(): void  {

		this.noteForm = new UntypedFormGroup({
			id: new FormControl(''),
			contactId: new FormControl(''),
			createdAt: new FormControl(''),
			updatedAt: new FormControl(''),
			description: new FormControl(''),
			text: new FormControl(''),

		});

		this.getNoteDetails();

	}
	private getNoteDetails(): any {

		const apiUrl = `contacts/note/note/${this.noteId}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.note = result as Note;
				this.populateForm();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private populateForm(): void {
		this.noteForm.controls['id'].setValue(this.note.id);
		this.noteForm.controls['contactId'].setValue(this.note.contactId);
		this.noteForm.controls['createdAt'].setValue(this.note.createdAt);
		this.noteForm.controls['updatedAt'].setValue(this.note.updatedAt);
		this.noteForm.controls['description'].setValue(this.note.description);
		this.noteForm.controls['text'].setValue(this.note.text);

		//this.content = this.note.text;
	}

	public updateNote(noteFormValue): void {
		if (this.noteForm.valid) {
			this.executeNoteUpdate(noteFormValue);
		}
	}

	private executeNoteUpdate(noteFormValue): any {
        const note: Note = {
            id: noteFormValue.id,
            contactId: noteFormValue.contactId,
            createdAt: noteFormValue.createdAt,
            updatedAt: noteFormValue.updatedAt,
            description: noteFormValue.description,
            text: noteFormValue.text,
        };

		//note.text = this.content;

		const apiUrl = 'contacts/note/note';
		this._repository.update(apiUrl, note)
			.subscribe((result) => {
				this._dialog.closeAll();
			},
				((error) => {
					this._errorHandlerService.handleError(error);
				})
			);
	}

	public hasError(controlName: string, errorName: string): any {
		return this.noteForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._dialog.closeAll();
	}

	selected(event) {
		const target = event.source.selected._element.nativeElement;
		const selectedData = {
			value: event.value,
			text: target.innerText.trim()
		};
		//console.log(selectedData);
	}
}

