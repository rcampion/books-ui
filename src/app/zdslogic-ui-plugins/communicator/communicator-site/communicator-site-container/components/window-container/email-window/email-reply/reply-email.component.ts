import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ThemePalette } from '@angular/material/core';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { EMailContactSend } from '../core/models/email-contact-send.model';
import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { ApiService } from 'app/zdslogic-ui-base/core';
import { EMailInboxUserFilesService } from '../core/services/email-inbox-user-files.service';
import { EMailInboxFile } from '../core/models/email-inbox-file.model';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

@Component({
	selector: 'app-reply-email',
	templateUrl: './reply-email.component.html',
	styleUrls: ['./reply-email.component.scss']
})
export class ReplyEMailComponent implements OnInit {

	public file: EMailInboxFile ;

	public editor = ClassicEditor;

	fileControl: FormControl;
	multiple: boolean = false;
	accept: string;
	color: ThemePalette = 'primary';
	public files;
	maxSize = 16;

	emailId: string;
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
    originalMsg: string;

	constructor(private _angularLogService: AngularLogService,

		private _router: Router,
		private _location: Location,
		private _apiService: ApiService,
		public _usersService: UsersService,
		private _repository: EMailInboxUserFilesService,
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

		this.getFileDetails();

	}

	private getFileDetails(): void {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `email-inbox/my-inbox-emails/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.file = result as EMailInboxFile;
				//this.changeDetectorRefs.detectChanges();
				//this._dataSharingService.isPdfReady.next(this.file);
				this.populateForm();

			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private populateForm(): void {
		this.emailForm.controls['userId'].setValue(this.user.id);
		const subjectText = 'Re: ' + this.file.subject;
		this.emailForm.controls['emailSubjectTxt'].setValue(subjectText);
		this.emailForm.controls['emailList'].setValue(this.file.replyText);
		this.emailForm.controls['emailFirstName'].setValue('');
		this.emailForm.controls['emailFromAddress'].setValue(this.user.email);
		this.originalMsg = this.file.message;
	}

	public sendEMail(emailFormValue): void{
		if (this.emailForm.valid) {
			this.executeSendEMail(emailFormValue);
		}
	}

	private executeSendEMail(emailFormValue): void {

		const dateString = this.file.dateSent;
		const newDate = new Date(dateString);
		let msgText = emailFormValue.emailMsgTxt;

		msgText = msgText
			+ '<br>------------<br>On ' + newDate + ', '
			+ this.file.fromText + '. wrote:<br>' + this.originalMsg + '<br>';

		const emailContactSend: EMailContactSend = {
			userId: emailFormValue.userId,
			emailId: emailFormValue.emailId,
			emailSubjectTxt: emailFormValue.emailSubjectTxt,
			emailList: emailFormValue.emailList,
			emailFirstName: emailFormValue.emailFirstName,
			emailFromAddress: emailFormValue.emailFromAddress,
			emailMsgTxt: msgText ,

		};

		const formData = new FormData();
		const jsonString = JSON.stringify(emailContactSend);
		formData.append('jsonString', jsonString);
		let filedata;

		let apiUrl = 'contacts/email/send';

		if (this.files !== undefined) {
			filedata = this.files[0];
			formData.append('file', filedata);
			apiUrl = 'contacts/email/send/with/file';
		}

		this._apiService.send(apiUrl, formData)
			.subscribe((result) => {
				const dialogRef = this._dialog.open(SuccessDialogComponent, this.dialogConfig);

				// we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
				dialogRef.afterClosed()
					.subscribe((result) => {
						const url = '/my-emails';
						//this._location.go(locationUrl);
						this._router.navigate([url]);
						//window.location.href = locationUrl;
						//this._location.back();
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

	validateInput(c: FormControl): any {
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
