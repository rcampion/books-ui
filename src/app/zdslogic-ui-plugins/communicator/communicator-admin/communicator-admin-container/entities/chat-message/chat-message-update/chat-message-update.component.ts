import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';

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
	selector: 'app-chat-message-update',
	templateUrl: './chat-message-update.component.html',
	styleUrls: ['./chat-message-update.component.scss']
})
export class ChatMessageUpdateComponent implements OnInit {

	chatMessageTypes: ChatMessageType[] = [
		{ value: 0, viewValue: 'Message' },
		{ value: 1, viewValue: 'Group' },
		{ value: 2, viewValue: 'Person' },
		{ value: 3, viewValue: 'Team' }
	];

	public chatMessage: ChatMessage;
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
		private _dialog: MatDialog,
		private _repository: ChatMessageService,
		router: Router,
		private _activeRoute: ActivatedRoute,
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

		this.getChatMessageDetails();

	}
	private getChatMessageDetails(): any {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `chat-message/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.chatMessage = result as ChatMessage;
				this.populateForm();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private populateForm(): void {
		this.chatMessageForm.controls['id'].setValue(this.chatMessage.id);
		this.chatMessageForm.controls['channelId'].setValue(this.chatMessage.channelId);
		this.chatMessageForm.controls['userId'].setValue(this.chatMessage.userId);
		this.chatMessageForm.controls['icon'].setValue(this.chatMessage.icon);
		this.chatMessageForm.controls['image'].setValue(this.chatMessage.image);
		this.chatMessageForm.controls['title'].setValue(this.chatMessage.title);
		this.chatMessageForm.controls['description'].setValue(this.chatMessage.description);
		this.chatMessageForm.controls['link'].setValue(this.chatMessage.link);
		this.chatMessageForm.controls['useRouter'].setValue(this.chatMessage.useRouter);
		this.chatMessageForm.controls['readFlag'].setValue(this.chatMessage.readFlag);
		this.chatMessageForm.controls['type'].setValue(this.chatMessage.type);

		this.chatMessageForm.controls['fromId'].setValue(this.chatMessage.fromId);
		this.chatMessageForm.controls['toId'].setValue(this.chatMessage.toId);
		this.chatMessageForm.controls['fromText'].setValue(this.chatMessage.fromText);
		this.chatMessageForm.controls['replyText'].setValue(this.chatMessage.replyText);
		this.chatMessageForm.controls['toText'].setValue(this.chatMessage.toText);
		this.chatMessageForm.controls['subject'].setValue(this.chatMessage.subject);
		this.chatMessageForm.controls['message'].setValue(this.chatMessage.message);
		this.chatMessageForm.controls['dateSent'].setValue(this.chatMessage.dateSent);
		this.chatMessageForm.controls['dateSeen'].setValue(this.chatMessage.dateSeen);
	}

	public updateChatMessage(chatMessageFormValue): void {
		if (this.chatMessageForm.valid) {
			this.executeChatMessageUpdate(chatMessageFormValue);
		}
	}

	private executeChatMessageUpdate(chatMessageFormValue): any {
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
		this._repository.update(chatMessageFormValue.id, apiUrl, chatMessage)
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

	public hasError(controlName: string, errorName: string): any {
		return this.chatMessageForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

}
