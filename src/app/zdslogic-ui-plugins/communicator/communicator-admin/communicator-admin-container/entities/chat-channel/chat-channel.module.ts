import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../../../../zdslogic-ui-base/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// import needed PrimeNG modules here
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { RecaptchaModule } from 'ng-recaptcha';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { SharedModule } from '../../../../../../zdslogic-ui-base/shared';

import { ChatChannelListComponent } from './chat-channel-list/chat-channel-list.component';
//import { ChatChannelRoutingModule } from './chat-channel-routing/chat-channel-routing.module';
import { ChatChannelDetailsComponent } from './chat-channel-details/chat-channel-details.component';
import { ChatChannelDataComponent } from './chat-channel-details/chat-channel-data/chat-channel-data.component';
import { ChatChannelCreateComponent } from './chat-channel-create/chat-channel-create.component';

import { ChatChannelUpdateComponent } from './chat-channel-update/chat-channel-update.component';
import { ChatChannelDeleteDialogComponent } from './chat-channel-delete/chat-channel-delete-dialog.component';
import { ChatChannelMemberListComponent } from './chat-channel-details/chat-channel-member/chat-channel-member-list/chat-channel-member-list.component';
// tslint:disable-next-line:max-line-length
import { ChatChannelMemberSelectionDialogComponent } from './chat-channel-details/chat-channel-member/chat-channel-member-selection-dialog/chat-channel-member-selection-dialog.component';
// tslint:disable-next-line:max-line-length
import { ChatChannelMemberSelectionListComponent } from './chat-channel-details/chat-channel-member/chat-channel-member-selection-list/chat-channel-member-selection-list.component';
import { ChatChannelEMailComponent } from './chat-channel-email/chat-channel-email.component'

@NgModule({
	imports: [
		CommonModule,
		//ChatChannelRoutingModule,
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
		ChatChannelListComponent,
		ChatChannelDetailsComponent,
		ChatChannelDataComponent,
		ChatChannelCreateComponent,
		ChatChannelUpdateComponent,
		ChatChannelDeleteDialogComponent,
		ChatChannelMemberListComponent,
		ChatChannelMemberSelectionDialogComponent,
		ChatChannelMemberSelectionListComponent,
		ChatChannelEMailComponent
	]
})
export class ChatChannelModule {

	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}
}
