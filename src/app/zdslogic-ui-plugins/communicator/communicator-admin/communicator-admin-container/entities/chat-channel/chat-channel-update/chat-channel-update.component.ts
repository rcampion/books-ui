import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { ChatChannel } from 'app/zdslogic-ui-base/app/core/models/chat-channel.model';
import { ChatChannelService } from 'app/zdslogic-ui-base/app/core/services/chat-channel.service';

import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export interface ChatChannelType {
	value: number;
	viewValue: string;
}

@Component({
	selector: 'app-chat-channel-update',
	templateUrl: './chat-channel-update.component.html',
	styleUrls: ['./chat-channel-update.component.scss']
})
export class ChatChannelUpdateComponent implements OnInit {

	chatChannelTypes: ChatChannelType[] = [
		{ value: 0, viewValue: 'Channel' },
		{ value: 1, viewValue: 'Group' },
		{ value: 2, viewValue: 'Person' },
		{ value: 3, viewValue: 'Team' }
	];

	public chatChannel: ChatChannel;
	public chatChannelForm: UntypedFormGroup = new UntypedFormGroup({
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
		private _repository: ChatChannelService,
		private _dialog: MatDialog,
		router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {
		this.chatChannelForm = new UntypedFormGroup({

			channelId: new FormControl(''),
			ownerId: new FormControl(''),
			contactId: new FormControl(''),
			organizationId: new FormControl(''),
			channelType: new FormControl(''),
			channelName: new FormControl(''),
			description: new FormControl(''),
			createdAt: new FormControl(''),
			updatedAt: new FormControl(''),
			imageURL: new FormControl(''),
			link: new FormControl(''),
			useRouter: new FormControl(''),

		});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

		this.getChatChannelDetails();

	}

	private getChatChannelDetails(): any {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `chat-channel/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.chatChannel = result as ChatChannel;
				this.populateForm();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private populateForm(): void {

		this.chatChannelForm.controls['channelId'].setValue(this.chatChannel.channelId);
		this.chatChannelForm.controls['ownerId'].setValue(this.chatChannel.ownerId);
		this.chatChannelForm.controls['contactId'].setValue(this.chatChannel.contactId);
		this.chatChannelForm.controls['organizationId'].setValue(this.chatChannel.organizationId);
		this.chatChannelForm.controls['channelType'].setValue(this.chatChannel.channelType);
		this.chatChannelForm.controls['channelName'].setValue(this.chatChannel.channelName);
		this.chatChannelForm.controls['description'].setValue(this.chatChannel.description);
		this.chatChannelForm.controls['createdAt'].setValue(this.chatChannel.createdAt);
		this.chatChannelForm.controls['updatedAt'].setValue(this.chatChannel.updatedAt);
		this.chatChannelForm.controls['imageURL'].setValue(this.chatChannel.imageURL);
		this.chatChannelForm.controls['link'].setValue(this.chatChannel.link);
		this.chatChannelForm.controls['useRouter'].setValue(this.chatChannel.useRouter);

	}

	public updateChatChannel(chatChannelFormValue): void {
		if (this.chatChannelForm.valid) {
			this.executeChatChannelUpdate(chatChannelFormValue);
		}
	}

	private executeChatChannelUpdate(chatChannelFormValue): any {
		const chatChannel: ChatChannel = {

			channelId: chatChannelFormValue.channelId,
			ownerId: chatChannelFormValue.ownerId,
			contactId: chatChannelFormValue.contactId,
			organizationId: chatChannelFormValue.organizationId,
			channelType: chatChannelFormValue.channelType,
			channelName: chatChannelFormValue.channelName,
			description: chatChannelFormValue.description,
			createdAt: chatChannelFormValue.createdAt,
			updatedAt: chatChannelFormValue.updatedAt,
			imageURL: chatChannelFormValue.imageURL,
			link: chatChannelFormValue.link,
			useRouter: chatChannelFormValue.useRouter

		};

		const apiUrl = 'chat-channel';
		this._repository.update(apiUrl, chatChannel)
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
		return this.chatChannelForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

}
