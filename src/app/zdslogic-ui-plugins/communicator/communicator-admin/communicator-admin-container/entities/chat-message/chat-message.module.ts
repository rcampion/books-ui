import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// import needed PrimeNG modules here
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { RecaptchaModule } from 'ng-recaptcha';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { MaterialModule } from '../../../../../../zdslogic-ui-base/material/material.module';

import { SharedModule } from '../../../../../../zdslogic-ui-base/shared';

import { ChatMessageListComponent } from './chat-message-list/chat-message-list.component';
//import { ChatMessageRoutingModule } from './chat-message-routing/chat-message-routing.module';
import { ChatMessageDetailsComponent } from './chat-message-details/chat-message-details.component';
import { ChatMessageDataComponent } from './chat-message-details/chat-message-data/chat-message-data.component';
import { ChatMessageCreateComponent } from './chat-message-create/chat-message-create.component';

import { ChatMessageUpdateComponent } from './chat-message-update/chat-message-update.component';
import { ChatMessageDeleteDialogComponent } from './chat-message-delete/chat-message-delete-dialog.component';
//import { ChatMessageMemberListComponent } from './chat-message-details/chat-message-member/chat-message-member-list/chat-message-member-list.component';
// tslint:disable-next-line:max-line-length
//import { ChatMessageMemberSelectionDialogComponent } from './chat-message-details/chat-message-member/chat-message-member-selection-dialog/chat-message-member-selection-dialog.component';
// tslint:disable-next-line:max-line-length
//import { ChatMessageMemberSelectionListComponent } from './chat-message-details/chat-message-member/chat-message-member-selection-list/chat-message-member-selection-list.component';
import { ChatMessageEMailComponent } from './chat-message-email/chat-message-email.component';

@NgModule({
	imports: [
		CommonModule,
		//ChatMessageRoutingModule,
		ReactiveFormsModule,
		SharedModule,

		MaterialModule,
		MatDialogModule,
		MatInputModule,
		MatFormFieldModule,

		FontAwesomeModule,
		ButtonModule,
		InputTextModule,
		PanelModule,
		NgxMatFileInputModule,
		RecaptchaModule,
		CKEditorModule,
	],
	// tslint:disable-next-line:max-line-length
	declarations: [
		ChatMessageListComponent,
		ChatMessageDetailsComponent,
		ChatMessageDataComponent,
		ChatMessageCreateComponent,
		ChatMessageUpdateComponent,
		ChatMessageDeleteDialogComponent,
//		ChatMessageMemberListComponent,
//		ChatMessageMemberSelectionDialogComponent,
//		ChatMessageMemberSelectionListComponent,
		ChatMessageEMailComponent
	]
})
export class ChatMessageModule {

	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}
}
