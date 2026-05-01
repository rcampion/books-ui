import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ContactsService } from './../../../../../../../zdslogic-ui-plugins/contacts/core/services/contacts.service';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { EMail } from 'app/zdslogic-ui-base/core/interfaces/email.model';
import { Contact } from './../../../../../../../zdslogic-ui-plugins/contacts/core/interfaces/contact.model';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { EMailContactSend } from './../../../../../../../zdslogic-ui-plugins/contacts/core/models/emailContactSend.model';
import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { ThemePalette } from '@angular/material/core';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
	selector: 'app-chat-message-email',
	templateUrl: './chat-message-email.component.html',
	styleUrls: ['./chat-message-email.component.scss']
})
export class ChatMessageEMailComponent implements OnInit {

	//@ViewChild('selectfile') el: ElementRef;   //in html we make variable of selectfile
	//progress = { loaded: 0, total: 0 };

	//emailFile;

	public editor = ClassicEditor;

	fileControl: FormControl;
	multiple: boolean = false;
	accept: string;
	color: ThemePalette = 'primary';
	public files;
	maxSize = 16;

	emailId: string;
	public email: EMail;
	public contact: Contact;
	public user: User = new User();
	public emailForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});
	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	public recaptcha = false;

	constructor(private _angularLogService: AngularLogService,

		private _router: Router,

		private _location: Location,

		private _contactsService: ContactsService,

		public _usersService: UsersService,

		private _activeRoute: ActivatedRoute,

		private _errorHandlerService: ErrorHandlerService,

		private _dialog: MatDialog,

	) {
		this.fileControl = new FormControl(this.files, [
			Validators.required,
			MaxSizeValidator(this.maxSize * 1024)
		]);

	}

	ngOnInit(): void  {

		this.fileControl.valueChanges.subscribe((files: any) => {
			if (!Array.isArray(files)) {
				this.files = [files];
			} else {
				this.files = files;
			}
		});

		this.emailId = this._activeRoute.snapshot.params['id'];

		this.emailForm = new UntypedFormGroup({
			emailId: new FormControl(''),
			emailSubjectTxt: new FormControl('', [
				Validators.required
			]),
			emailList: new FormControl(''),

			emailFirstName: new FormControl(''),

			emailFromAddress: new FormControl('', [
				Validators.required
			]),
			emailMsgTxt: new FormControl('', [
				Validators.required
			]),
			emailFile: new FormControl(''),

		});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

		// this.getEMailDetails();
	}

	private getEMailDetails(): void {

		let apiUrl = `contacts/email/email/${this.emailId}`;

		this._contactsService.getData(apiUrl)
			.subscribe((result) => {
				this.email = result as EMail;

				apiUrl = `contacts/${this.email.contactId}`;

				this._contactsService.getData(apiUrl)
					.subscribe((result) => {
						this.contact = result as Contact;
						this.user = this._usersService.getCurrentUser();
						this.populateForm();
					},
						(error) => {
							//this._errorHandlerService.handleError(error);
						});
			},
				(error) => {
					//this._errorHandlerService.handleError(error);
				});

	}

	private populateForm(): void {
		// this.emailForm.controls['emailSubjectTxt'].setValue(this.email.emailId);
		this.emailForm.controls['emailList'].setValue(this.email.email);
		this.emailForm.controls['emailFirstName'].setValue(this.user.firstName);
		// this.emailForm.controls['emailFromAddress'].setValue(this.email.emailKind);
		// this.emailForm.controls['emailMsgTxt'].setValue(this.email.emailKind);

	}

	public sendEMail(emailFormValue): void {
		if (this.emailForm.valid) {
			this.executeSendEMail(emailFormValue);
		}
	}

	private executeSendEMail(emailFormValue): void {

		const id: string = this._activeRoute.snapshot.params['id'];

		const emailContactSend: EMailContactSend = {
			emailId: id,
			emailSubjectTxt: emailFormValue.emailSubjectTxt,
			emailList: emailFormValue.emailList,
			emailFirstName: emailFormValue.emailFirstName,
			emailFromAddress: emailFormValue.emailFromAddress,
			emailMsgTxt: emailFormValue.emailMsgTxt,
		};

		const formData = new FormData();
		const jsonString = JSON.stringify(emailContactSend);
		formData.append('jsonString', jsonString);
		let filedata;

		let apiUrl = 'contacts/chat-message/email/send';

		if (this.files !== undefined) {
			filedata = this.files[0];
			formData.append('file', filedata);
			apiUrl = 'contacts/chat-message/email/send/with/file';
		}

		this._contactsService.send(apiUrl, formData)
			.subscribe((result) => {
				const dialogRef = this._dialog.open(SuccessDialogComponent, this.dialogConfig);

				// we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
				dialogRef.afterClosed()
					.subscribe((result) => {
						this._location.back();
					});
			},
				((error) => {
					this._errorHandlerService.dialogConfig = { ...this.dialogConfig };
					this._errorHandlerService.handleError(error);
				})
			);
	}

	public onCancel(): void {
		this._location.back();
	}

}
