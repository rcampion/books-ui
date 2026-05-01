import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { ChatMessageService } from 'app/zdslogic-ui-base/app/core/services/chat-message.service';
import { ChatMessage } from 'app/zdslogic-ui-base/app/core/models/chat-message.model';

import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export interface ChatMessageType {
    value: number;
    viewValue: string;
}

@Component({
	selector: 'app-chat-message-create',
	templateUrl: './chat-message-create.component.html',
	styleUrls: ['./chat-message-create.component.scss']
})
export class ChatMessageCreateComponent implements OnInit {

    chatMessageTypes: ChatMessageType[] = [
        { value: 0, viewValue: 'Message' },
        { value: 1, viewValue: 'Group' },
        { value: 1, viewValue: 'Organization' },
        { value: 2, viewValue: 'Person' },
        { value: 3, viewValue: 'Team' }
    ];

	public chatMessageForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});
	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	// tslint:disable-next-line:max-line-length
	constructor(
		private _angularLogService: AngularLogService,
		private _location: Location,
		private _repository: ChatMessageService,
		private _dialog: MatDialog,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {
		this.chatMessageForm = new UntypedFormGroup({

			id: new FormControl(''),
			channelId: new FormControl(''),
			userId: new FormControl(''),
			icon: new FormControl(''),
			image: new FormControl(''),
			title: new FormControl(''),
			description: new FormControl(''),
			link: new FormControl(''),
			useRouter: new FormControl(''),
			readFlag: new FormControl(''),
			type: new FormControl(''),
			fromId: new FormControl(''),
			toId: new FormControl(''),
			fromText: new FormControl(''),
			replyText: new FormControl(''),
			toText: new FormControl(''),
			subject: new FormControl(''),
			message: new FormControl(''),
			dateSent: new FormControl(''),
			dateSeen: new FormControl(''),

		});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}

	public hasError(controlName: string, errorName: string): any {
		return this.chatMessageForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

	public createChatMessage(chatMessageFormValue): any {
		if (this.chatMessageForm.valid) {
			this.executeChatMessageCreation(chatMessageFormValue);
		}
	};

	private executeChatMessageCreation(chatMessageFormValue): any {
		const chatMessage: ChatMessage = {
			/*
						channelId: chatMessageFormValue.channelId,
						ownerId: chatMessageFormValue.ownerId,
						channelType: chatMessageFormValue.channelType,
						channelName: chatMessageFormValue.channelName,
						description: chatMessageFormValue.description,
						createdAt: chatMessageFormValue.createdAt,
						updatedAt: chatMessageFormValue.updatedAt,
						imageURL: chatMessageFormValue.imageURL,
						link: chatMessageFormValue.link,
						useRouter: chatMessageFormValue.useRouter
			*/
			id: chatMessageFormValue.id,
			channelId: chatMessageFormValue.channelId,
			userId: chatMessageFormValue.userId,
			icon: chatMessageFormValue.icon,
			image: chatMessageFormValue.image,
			title: chatMessageFormValue.title,
			description: chatMessageFormValue.description,
			link: chatMessageFormValue.link,
			useRouter: chatMessageFormValue.useRouter,
			readFlag: chatMessageFormValue.readFlag,
			type: chatMessageFormValue.type,
			fromId: chatMessageFormValue.fromId,
			toId: chatMessageFormValue.toId,
			fromText: chatMessageFormValue.fromText,
			replyText: chatMessageFormValue.replyText,
			toText: chatMessageFormValue.toText,
			subject: chatMessageFormValue.subject,
			message: chatMessageFormValue.message,
			dateSent: chatMessageFormValue.dateSent,
			dateSeen: chatMessageFormValue.dateSeen
		};

		const apiUrl = 'chat-message';
		this._repository.create(apiUrl, chatMessage)
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
	};

}
