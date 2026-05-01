import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
//import { ContactsService } from '../core/services/contacts.service';
import { ApiService } from 'app/zdslogic-ui-base/core';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';

//import { EMail } from 'app/zdslogic-ui-base/core/interfaces/email.model';
//import { Contact } from '../core/interfaces/contact.model';
import { EMailContactSend } from '../core/models/email-contact-send.model';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
	selector: 'app-compose-email',
	templateUrl: './compose-email.component.html',
	styleUrls: ['./compose-email.component.scss']
})
export class ComposeEMailComponent implements OnInit {

	public editor = ClassicEditor;

	fileControl: FormControl;
	multiple: boolean = false;
	accept: string;
	color: ThemePalette = 'primary';
	public files;
	maxSize = 16;

	emailId: string;
	//public email: EMail;
	//public contact: Contact;
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
	copyFields: { cc: boolean; bcc: boolean } = {
		cc : false,
		bcc: false
	};

	quillModules: any = {
		toolbar: [
				['bold', 'italic', 'underline'],
				[{align: []}, {list: 'ordered'}, {list: 'bullet'}],
				['clean']
		]
	};

	constructor(private _angularLogService: AngularLogService,

		private _router: Router,
		private _location: Location,
		private _apiService: ApiService,
		public _usersService: UsersService,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService,
		private _dialog: MatDialog,
		public matDialogRef: MatDialogRef<ComposeEMailComponent>,
	) {
		this.fileControl = new FormControl(this.files, [
			Validators.required,
			MaxSizeValidator(this.maxSize * 1024)
		]);

	}

	ngOnInit(): void  {
		this.user = this._usersService.getCurrentUser();
		this.fileControl.valueChanges.subscribe((files: any) => {
			if (!Array.isArray(files)) {
				this.files = [files];
			} else {
				this.files = files;
			}
		});

		this.emailId = this._activeRoute.snapshot.params['id'];

		this.emailForm = new UntypedFormGroup({
			userId: new FormControl(''),

			emailId: new FormControl(''),
			emailSubjectTxt: new FormControl('', [
				Validators.required
			]),
			emailList: new FormControl('', [
				Validators.required
			]),
			// cc     : new FormControl('', [
			// 	Validators.required
			// ]),
			// bcc    : new FormControl('', [
			// 	Validators.required
			// ]),
			emailFirstName: new FormControl(''),
			emailFromAddress: new FormControl('', [
				Validators.required
			]),
			emailMsgTxt: new FormControl('', []),
			emailFile: new FormControl(''),

		});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

		//this.getEMailDetails();
		this.populateForm();
	}

	private populateForm(): void {
		this.emailForm.controls['userId'].setValue(this.user.id);
		this.emailForm.controls['emailList'].setValue('');
		this.emailForm.controls['emailFirstName'].setValue('');
		this.emailForm.controls['emailFromAddress'].setValue(this.user.email);
	}

	public sendEMail(emailFormValue): void {
		if (this.emailForm.valid) {
			this.executeSendEMail(emailFormValue);
		}
	}

	private executeSendEMail(emailFormValue): void{
		const emailContactSend: EMailContactSend = {
			userId: emailFormValue.userId,
			emailId: emailFormValue.emailId,
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

		let apiUrl = 'contact/email/send';

		if (this.files !== undefined) {
			filedata = this.files[0];
			formData.append('file', filedata);
			apiUrl = 'contact/email/send/with/file';
		}

		//this._apiService.sendNoToken(apiUrl, formData)
		this._apiService.send(apiUrl, formData)
			.subscribe((result) => {
				const dialogRef = this._dialog.open(SuccessDialogComponent, this.dialogConfig);

				// we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
				dialogRef.afterClosed()
					.subscribe((result) => {
						//var locationUrl = `/home`;
						//this._location.go(locationUrl);
						//window.location.href = locationUrl;
						this._location.back();
					});
			},
				((error) => {
					this._errorHandlerService.dialogConfig = { ...this.dialogConfig };
					this._errorHandlerService.handleError(error);
				})
			);
	}

	saveAndClose(): void
    {
        this.matDialogRef.close();
    }

	public onCancel(): void {
		this._location.back();
	}

	validateInput(c: FormControl): boolean | {validateInput: {valid: boolean}}{
		return (this.recaptcha) ? false : {
			validateInput: {
				valid: false
			}
		};
	}

	resolved(captchaResponse: string): void {
		//console.log(`Resolved captcha with response: ${captchaResponse}`);
		this.recaptcha = true;
	}
}
