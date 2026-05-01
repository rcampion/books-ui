import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    selector: 'app-contact-note-create-dialog',
    templateUrl: './contact-note-create-dialog.component.html',
    styleUrls: ['./contact-note-create-dialog.component.scss']
})
export class ContactNoteCreateDialogComponent implements OnInit {
    contactId: string;
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
        private _dialogRef: MatDialogRef<ContactNoteCreateDialogComponent>,
        private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

        this.contactId = data.contactId;
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

    }

    public createNote(noteFormValue): void {
        if (this.noteForm.valid) {
            this.executeNoteCreate(noteFormValue);
        }
    }

    private executeNoteCreate(noteFormValue): any {
        const note: Note = {
            id: noteFormValue.noteId,
            contactId: this.contactId,
            createdAt: noteFormValue.createdAt,
            updatedAt: noteFormValue.updatedAt,
            description: noteFormValue.description,
            text: noteFormValue.text,
        };

        const apiUrl = 'contacts/note/note';
        this._repository.create(apiUrl, note)
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
}


