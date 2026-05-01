import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
//import { ContactsService } from '../core/services/contacts.service';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { EMail } from 'app/zdslogic-ui-base/core/interfaces/email.model';
//import { Contact } from '../core/interface/contact.model';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { EMailSend } from 'app/zdslogic-ui-base/core/interfaces/email-send.model';
import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { ThemePalette } from '@angular/material/core';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ApiService } from 'app/zdslogic-ui-base/core';

@Component({
	selector: 'app-contact-email',
	templateUrl: './contact-email.component.html',
	styleUrls: ['./contact-email.component.scss']
})
export class ContactEMailComponent implements OnInit {

	public editor = ClassicEditor;

	fileControl: UntypedFormControl;
	multiple: boolean = false;
	accept: string;
	color: ThemePalette = 'primary';
	public files;
	maxSize = 16;

	emailId: string;
	public email: EMail;
	//public contact: Contact;
	public user: User;
	public emailForm: UntypedFormGroup;
	private dialogConfig;
	public recaptcha = false;

	constructor(private logger: AngularLogService,

		private router: Router,
		private location: Location,
		private apiService: ApiService,
		public usersService: UsersService,
		private activeRoute: ActivatedRoute,
		private errorService: ErrorHandlerService,
		private dialog: MatDialog,

	) {
		this.fileControl = new UntypedFormControl(this.files, [
			Validators.required,
			MaxSizeValidator(this.maxSize * 1024)
		]);

	}

	ngOnInit(): void {

		this.fileControl.valueChanges.subscribe((files: any) => {
			if (!Array.isArray(files)) {
				this.files = [files];
			} else {
				this.files = files;
			}
		});

		this.emailId = this.activeRoute.snapshot.params['id'];

		this.emailForm = new UntypedFormGroup({
			emailId: new UntypedFormControl(''),
			emailSubjectTxt: new UntypedFormControl('', [
				Validators.required
			]),
			emailList: new UntypedFormControl('', [
				Validators.required
			]),
			emailFirstName: new UntypedFormControl(''),
			emailFromAddress: new UntypedFormControl('', [
				Validators.required
			]),
			emailMsgTxt: new UntypedFormControl('', [
				Validators.required
			]),
			emailFile: new UntypedFormControl(''),

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
		this.emailForm.controls['emailList'].setValue('paul.fredette@veteransofhope.net');
		this.emailForm.controls['emailFirstName'].setValue('');
		this.emailForm.controls['emailFromAddress'].setValue('');
	}

	public sendEMail(emailFormValue): void {
		if (this.emailForm.valid) {
			this.executeSendEMail(emailFormValue);
		}
	}

	private executeSendEMail(emailFormValue): void {
		const emailContactSend: EMailSend = {
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

		let apiUrl = 'dashboard/email/send';
		if (this.files !== undefined) {
			filedata = this.files[0];
			formData.append('file', filedata);
			apiUrl = 'dashboard/email/send/with/file';
		}

		this.apiService.sendNoToken(apiUrl, formData)
			.subscribe((res) => {
				const dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

				// we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
				dialogRef.afterClosed()
					.subscribe((result) => {
						const locationUrl = '/home';
						this.location.go(locationUrl);
						window.location.href = locationUrl;
					});
			},
				((error) => {
					this.errorService.dialogConfig = { ...this.dialogConfig };
					this.errorService.handleError(error);
				})
			);
	}

	public onCancel(): void {
		this.location.back();
	}

	validateInput(c: UntypedFormControl): any {
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
