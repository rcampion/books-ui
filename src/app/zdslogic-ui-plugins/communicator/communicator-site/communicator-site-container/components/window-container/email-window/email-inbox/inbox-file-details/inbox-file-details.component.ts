import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EMailInboxFile } from '../../core/models/email-inbox-file.model';
import { EMailInboxUserFilesService } from '../../core/services/email-inbox-user-files.service';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatButton } from '@angular/material/button';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject, map, mergeMap, of, takeUntil } from 'rxjs';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { FormControl, Validators } from '@angular/forms';
import { MaxSizeValidator } from '@angular-material-components/file-input';
import { ApiService } from 'app/zdslogic-ui-base/core';
import { EMailContactSend } from 'app/zdslogic-ui-plugins/emails/core/models/emailContactSend.model';
import { EMailFilesService } from 'app/zdslogic-ui-plugins/emails/core/services/email-files.service';
import { EMailInboxFileAttachment } from 'app/zdslogic-ui-plugins/emails/core/models/email-inbox-file-attachment.model';

@Component({
	selector: 'app-inbox-file-details',
	templateUrl: './inbox-file-details.component.html',
	styleUrls: ['./inbox-file-details.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class InboxFileDetailsComponent implements OnInit, OnDestroy {

	@ViewChild('infoDetailsPanelOrigin') private _infoDetailsPanelOrigin: MatButton;
  @ViewChild('infoDetailsPanel') private _infoDetailsPanel: TemplateRef<any>;
	fileControl: FormControl;
	public files;
	maxSize = 16;
	message: string;
	emailId: string;
	replyType: string;
	replyFormActive: boolean = false;
	private _overlayRef: OverlayRef;
	user: User = new User();

	public mail: EMailInboxFile ;
	public showAccounts;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	constructor(
		private _repository: EMailInboxUserFilesService,
		private emailFilesService: EMailFilesService,
		private _activeRoute: ActivatedRoute,
		private _elementRef: ElementRef,
		private _errorHandlerService: ErrorHandlerService,
		private _usersService: UsersService,
		private _overlay: Overlay,
		private _viewContainerRef: ViewContainerRef) {

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

		this.getFileDetails();
	}

	ngOnDestroy(): void
	{
			// Unsubscribe from all subscriptions
			this._unsubscribeAll.next(null);
			this._unsubscribeAll.complete();
	}

	private getFileDetails = (): void => {
		this.emailId = this._activeRoute.snapshot.params['id'];
		const apiUrl = `email-inbox/my-inbox-emails/${this.emailId}`;

		this._repository.getData(apiUrl)
			.pipe(
				takeUntil(this._unsubscribeAll),
				mergeMap((result) => {
					const mails = result as EMailInboxFile;

					if(mails?.fromId){
						const url = `users/${mails?.fromId}`;
						return this._usersService.getData(url)
						.pipe(map((result) => {
							mails.fromUser = result as User;
							return mails;
						}));
					}else{
						return of(mails);
					}
				})
			).subscribe((result) => {
				this.mail = result as EMailInboxFile;
			},
			(error) => {
				this._errorHandlerService.handleError(error);
			});
	};

	public redirectToDownload = (id: string): void => {

		//const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `email-inbox/my-inbox-emails/attachment/file/${id}`;

		this._repository.getData(apiUrl)
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((result) => {
					const file = result as EMailInboxFileAttachment;

					this._repository.getFile(file.id).subscribe((data?: any) => {

					const fileName = file.attachment;

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

	};

	openInfoDetailsPanel(): void
    {
			// Create the overlay
        this._overlayRef = this._overlay.create({
            backdropClass   : '',
            hasBackdrop     : true,
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                                  .flexibleConnectedTo(this._infoDetailsPanelOrigin._elementRef.nativeElement.getBoundingClientRect())
                                  .withFlexibleDimensions(true)
                                  .withViewportMargin(16)
                                  .withLockedPosition(true)
                                  .withPositions([
                                      {
                                          originX : 'start',
                                          originY : 'bottom',
                                          overlayX: 'start',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'start',
                                          originY : 'top',
                                          overlayX: 'start',
                                          overlayY: 'bottom'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'bottom',
                                          overlayX: 'end',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'top',
                                          overlayX: 'end',
                                          overlayY: 'bottom'
                                      }
                                  ])

        });

        // Create a portal from the template
        const templatePortal = new TemplatePortal(this._infoDetailsPanel, this._viewContainerRef);

        // Attach the portal to the overlay
        this._overlayRef.attach(templatePortal);

        // Subscribe to the backdrop click
        this._overlayRef.backdropClick().subscribe(() => {

            // If overlay exists and attached...
            if ( this._overlayRef && this._overlayRef.hasAttached() )
            {
                // Detach it
                this._overlayRef.detach();
            }

            // If template portal exists and attached...
            if ( templatePortal && templatePortal.isAttached )
            {
                // Detach it
                templatePortal.detach();
            }
        });
  }

	reply(): void
	{
			this.replyFormActive = true;
			this.replyType = 'reply';
			setTimeout(() => {
					this._elementRef.nativeElement.scrollTop = this._elementRef.nativeElement.scrollHeight;
			});
	}

	forward(): void
	{
			this.replyFormActive = true;
			this.replyType = 'forward';
			setTimeout(() => {
					this._elementRef.nativeElement.scrollTop = this._elementRef.nativeElement.scrollHeight;
			});
	}

	discard(): void
	{
			this.replyFormActive = false;
	}

	send(): void
	{
		if(!this.message) {return;}

		// const regex = /(.*) <(.*)>/;
		// const matches = regex.exec(this.mail.replyText);
		// const emailList = matches[1];
		// const emailFirstName = matches[2];

		const dateString = this.mail.dateSent;
		const newDate = new Date(dateString);
		let subject= this.mail.subject;
		let msgText = this.message;

		if(this.replyType === 'reply'){
			const msgText = this.message
			+ '<br>------------<br>On ' + newDate + ', '
			+ this.mail.fromText + '. wrote:<br>' + this.mail.message + '<br>';

			subject = 'Re: ' + subject;
		}else if(this.replyType === 'forward'){
			msgText = this.message
				+ '<br>----Forwarded Message----<br>';
			msgText = msgText
				+ '<strong>From: </strong>' + this.mail.fromText;
			msgText = msgText
				+ '<br><strong>To: </strong>' + this.mail.toText;

			const dateString = this.mail.dateSent;
			const newDate = new Date(dateString);

			msgText = msgText
				+ '<br><strong>Sent: </strong>' + newDate;
			msgText = msgText
				+ '<br><strong>Subject: </strong>' + this.mail.subject;
			msgText = msgText
				+ '<br><br><strong>Message: </strong><br><br>'
				+ this.message;

			subject = 'Fw: ' + subject;
		}

		const emailContactSend: EMailContactSend = {
			userId: this.user.id.toString(),
			emailId: this.emailId,
			emailSubjectTxt:  subject,
			emailList: this.mail.replyText,
			emailFirstName: '',
			emailFromAddress: this.mail.toText,
			emailMsgTxt: msgText,
		};

		this.emailFilesService.sendEmail(emailContactSend, this.files)
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((result) => {
				this.replyFormActive = false;
			});
	}

	moveToDelete(): void{
		this.emailFilesService.moveInboxToDelete(this.emailId);
	}

	moveToJunk(): void{
		this.emailFilesService.moveInboxToJunk(this.emailId);
	}

}
