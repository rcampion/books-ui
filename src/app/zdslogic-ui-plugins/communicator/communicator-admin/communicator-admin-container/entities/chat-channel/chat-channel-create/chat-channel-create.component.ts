import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ChatChannelService } from 'app/zdslogic-ui-base/app/core/services/chat-channel.service';
import { ChatChannel } from 'app/zdslogic-ui-base/app/core/models/chat-channel.model';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export interface ChatChannelType {
	value: number;
	viewValue: string;
}

@Component({
	selector: 'app-chat-channel-create',
	templateUrl: './chat-channel-create.component.html',
	styleUrls: ['./chat-channel-create.component.scss']
})
export class ChatChannelCreateComponent implements OnInit {

	chatChannelTypes: ChatChannelType[] = [
		{ value: 0, viewValue: 'Channel' },
		{ value: 1, viewValue: 'Group' },
		{ value: 1, viewValue: 'Organization' },
		{ value: 2, viewValue: 'Person' },
		{ value: 3, viewValue: 'Team' }
	];

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
		private _errorHandlerService: ErrorHandlerService) {

	}

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
	}

	public hasError(controlName: string, errorName: string): any {
		return this.chatChannelForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._location.back();
	}

	public createChatChannel(chatChannelFormValue): any {
		if (this.chatChannelForm.valid) {
			this.executeChatChannelCreation(chatChannelFormValue);
		}
	}

	private executeChatChannelCreation(chatChannelFormValue): any {
		const chatChannel: ChatChannel = {

			channelId: null,
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
		this._repository.create(apiUrl, chatChannel)
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

}
