import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { ContactsService } from '..//core/services/contacts.service';
//import { ContactsPostService } from 'app/zdslogic-ui-base/core/services/contacts-post.service';

import { ContactForCreation } from '../core/interfaces/contactForCreation.model';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-contact-create',
	templateUrl: './contact-create.component.html',
	styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent implements OnInit {
	public contactForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});
	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	// tslint:disable-next-line:max-line-length
	constructor(private _angularLogService: AngularLogService,
		private _location: Location,
		//private postService: ContactsPostService,
		private _repository: ContactsService,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void  {
		this.contactForm = new UntypedFormGroup({
			fullName: new FormControl('', [Validators.required, Validators.maxLength(120)]),
			firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
			lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
			gender: new FormControl(''),
			birthdate: new FormControl(''),
			title: new FormControl('', [Validators.required, Validators.maxLength(120)]),
			company: new FormControl('', [Validators.required, Validators.maxLength(120)]),
			imageURL: new FormControl(''),
			linkedin: new FormControl(''),
			facebook: new FormControl(''),
			skype: new FormControl(''),
			twitter: new FormControl(''),
			notes: new FormControl(''),
			presenceStatus: new FormControl(''),
			presenceImageUrl: new FormControl(''),
			email: new FormControl(''),
			bio: new FormControl(''),
		});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}

	public hasError(controlName: string, errorName: string): any {
		return this.contactForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

	public createContact(contactFormValue): void {
		if (this.contactForm.valid) {
			this.executeContactCreation(contactFormValue);
		}
	}

	private executeContactCreation(contactFormValue): any {
		const contact: ContactForCreation = {
			fullName: contactFormValue.fullName,
			firstName: contactFormValue.firstName,
			lastName: contactFormValue.lastName,
			gender: contactFormValue.gender,
			birthdate: contactFormValue.birthdate,
			title: contactFormValue.title,
			company: contactFormValue.company,
			imageURL: contactFormValue.imageURL,
			linkedin: contactFormValue.linkedin,
			facebook: contactFormValue.facebook,
			skype: contactFormValue.skype,
			twitter: contactFormValue.twitter,
			notes: contactFormValue.notes,
			presenceStatus: contactFormValue.presenceStatus,
			presenceImageUrl: contactFormValue.presenceImageUrl,
			email: contactFormValue.email,
			bio: contactFormValue.bio

		};

		const apiUrl = 'contacts';
		const id = 0;
		this._repository.create(apiUrl, contact)
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

		//this.postService.save({ ...contact, id: '1' });

	}

}
