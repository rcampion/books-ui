import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

// import needed PrimeNG modules here
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { RecaptchaModule } from 'ng-recaptcha';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { FuseNavigationModule } from 'app/zdslogic-ui-shell/@fuse/components/navigation';

import { QuillModule } from 'ngx-quill';

import { MaterialModule } from 'app/zdslogic-ui-base/material/material.module';

import { SharedModule } from 'app/zdslogic-ui-base/shared/shared.module';

//import { ProgressComponent } from 'app/zdslogic-ui-base/core/components/progress/progress.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { ChatWindowContainerComponent } from './chat-window-container/chat-window-container.component';

import { ChatMessageModule } from './chat-message/chat-message.module';
import { ChatMessageDataComponent } from './chat-message/chat-message-details/chat-message-data/chat-message-data.component';
import { ChatMessageDetailsComponent } from './chat-message/chat-message-details/chat-message-details.component';
import { ChatMessageEMailComponent } from './chat-message/chat-message-email/chat-message-email.component';
import { ChatMessageListComponent } from './chat-message/chat-message-list/chat-message-list.component';

//import { EmojifyPipe } from './';
//import { LinkfyPipe } from './';
//import { SanitizePipe } from './';
//import { GroupMessageDisplayNamePipe } from './';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,

		MaterialModule,

		PdfViewerModule,
		FontAwesomeModule,

		ButtonModule,
		InputTextModule,
		PanelModule,
		NgxMatFileInputModule,
		RecaptchaModule,
		CKEditorModule,
		FuseNavigationModule,
		//EMailWindowRoutingModule,
		QuillModule,

		ChatMessageModule

	],
	// tslint:disable-next-line:max-line-length
	/**
		* Components / Directives/ Pipes
		*/
	declarations: [

		ChatWindowContainerComponent,

		ChatMessageDetailsComponent,
		ChatMessageDataComponent,
		ChatMessageEMailComponent,
		ChatMessageListComponent,

		//ChatMessageListComponent,
		//ChatMessageDetailsComponent,
		//ChatMessageDataComponent,
		//ChatMetaComponent,
		//ChatPreviewComponent,

		//EmojifyPipe,
		//LinkfyPipe,
		//SanitizePipe,
		//GroupMessageDisplayNamePipe,
	],
	providers: [
		//EMailInboxUserFilesService,
		//EMailSentUserFilesService,
		//EMailJunkUserFilesService
	]
})
export class ChatWindowModule {

	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}
}
