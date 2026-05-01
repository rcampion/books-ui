import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Contact } from '../core/interfaces/contact.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from '../core/services/contacts.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
//import { ContactsPostService } from 'app/zdslogic-ui-base/core/services/contacts-post.service';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
    selector: 'app-contact-update',
    templateUrl: './contact-update.component.html',
    styleUrls: ['./contact-update.component.scss'],
  	encapsulation: ViewEncapsulation.None,
})
export class ContactUpdateComponent implements OnInit {
    public contact: Contact;
    public contactForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});

    private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

    constructor(private _angularLogService: AngularLogService,private _location: Location,
        //private postService: ContactsPostService,
        private _repository: ContactsService,
        public _usersService: UsersService,
        private _dialog: MatDialog,
        private _activeRoute: ActivatedRoute,
        private _errorHandlerService: ErrorHandlerService) { }

    ngOnInit(): void  {

        this.contactForm = new UntypedFormGroup({
            id: new FormControl(''),
            userId: new FormControl(''),
			userName: new FormControl(''),
            ownerId: new FormControl(''),
			createdAt: new FormControl(''),
            updatedAt: new FormControl(''),
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
			presenceStatus : new FormControl(''),      
            presenceImageUrl : new FormControl(''),            
            email: new FormControl(''),
            bio : new FormControl(''),			
			enabled: new FormControl(''),
        });

        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };

        this.getContactDetails();

    }

    private getContactDetails = () => {
        const id: string = this._activeRoute.snapshot.params['id'];
        const apiUrl = `contacts/${id}`;

        this._repository.getData(apiUrl)
            .subscribe((result) => {
                this.contact = result as Contact;
                this.populateForm();
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                });
    }

    private populateForm() {
        this.contactForm.controls['id'].setValue(this.contact.id);
        this.contactForm.controls['userId'].setValue(this.contact.userId);
        this.contactForm.controls['userName'].setValue(this.contact.userName);
        this.contactForm.controls['ownerId'].setValue(this.contact.ownerId);
        this.contactForm.controls['createdAt'].setValue(this.contact.createdAt);
        this.contactForm.controls['updatedAt'].setValue(this.contact.updatedAt);        	
		this.contactForm.controls['fullName'].setValue(this.contact.fullName);
		this.contactForm.controls['firstName'].setValue(this.contact.firstName);
        this.contactForm.controls['lastName'].setValue(this.contact.lastName);
        this.contactForm.controls['gender'].setValue(this.contact.gender);
        this.contactForm.controls['birthdate'].setValue(this.contact.birthdate);        
        this.contactForm.controls['title'].setValue(this.contact.title);		
		this.contactForm.controls['company'].setValue(this.contact.company);
	    this.contactForm.controls['imageURL'].setValue(this.contact.imageURL);	
        this.contactForm.controls['linkedin'].setValue(this.contact.linkedin);
        this.contactForm.controls['facebook'].setValue(this.contact.facebook);
        this.contactForm.controls['skype'].setValue(this.contact.skype);
        this.contactForm.controls['twitter'].setValue(this.contact.twitter);
        this.contactForm.controls['notes'].setValue(this.contact.notes);
        this.contactForm.controls['presenceStatus'].setValue(this.contact.presenceStatus);		
        this.contactForm.controls['presenceImageUrl'].setValue(this.contact.presenceImageUrl);		
        this.contactForm.controls['email'].setValue(this.contact.email);
        this.contactForm.controls['bio'].setValue(this.contact.bio);		

		this.contactForm.controls['enabled'].setValue(this.contact.enabled);
    }

    public updateContact = (contactFormValue) => {
        if (this.contactForm.valid) {
            this.executeContactUpdate(contactFormValue);
        }
    }

    private executeContactUpdate = (contactFormValue) => {
        const contact: Contact = {
            id: contactFormValue.id,
            userId: contactFormValue.userId,
            userName: contactFormValue.userName,
            ownerId: contactFormValue.ownerId,
            createdAt: contactFormValue.createdAt,
            updatedAt: contactFormValue.updatedAt,
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
            presenceStatus:contactFormValue.presenceStatus,
            presenceImageUrl:contactFormValue.presenceImageUrl,
            email: contactFormValue.email,
            bio: contactFormValue.bio,
			enabled:contactFormValue.enabled
        };

        const apiUrl = 'contacts';
        this._repository.update(apiUrl, contact)
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

        //this.postService.update('update');
    }

    public hasError(controlName: string, errorName: string): any {
        return this.contactForm.controls[controlName].hasError(errorName);
    }

    public onCancel(): void {
        this._location.back();
    }

}
