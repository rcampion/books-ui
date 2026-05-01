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

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { FuseNavigationModule } from 'app/zdslogic-ui-shell/@fuse/components/navigation';

import { QuillModule } from 'ngx-quill';

import { MaterialModule } from 'app/zdslogic-ui-base/material/material.module';

import { SharedModule } from 'app/zdslogic-ui-base/shared/shared.module';

//import { ProgressComponent } from 'app/zdslogic-ui-base/core/components/progress/progress.component';
import { EMailWindowRoutingModule } from './email-window-routing/email-window-routing.module';
import { EMailWindowContainerComponent } from './email-window-container/email-window-container.component';

import { InboxFileAttachmentListComponent } from './email-inbox/inbox-file-details/inbox-file-attachment-list/inbox-file-attachment-list.component';
import { InboxFilesListComponent } from './email-inbox/inbox-files-list/inbox-files-list.component';
import { InboxFileDetailsComponent } from './email-inbox/inbox-file-details/inbox-file-details.component';
import { InboxFileDataComponent } from './email-inbox/inbox-file-details/inbox-file-data/inbox-file-data.component';
import { InboxFileDeleteDialogComponent } from './email-inbox/inbox-file-delete/inbox-file-delete-dialog.component';

import { SentFileAttachmentListComponent } from './email-sent/sent-file-details/sent-file-attachment-list/sent-file-attachment-list.component';
import { SentFilesListComponent } from './email-sent/sent-files-list/sent-files-list.component';
import { SentFileDetailsComponent } from './email-sent/sent-file-details/sent-file-details.component';
import { SentFileDataComponent } from './email-sent/sent-file-details/sent-file-data/sent-file-data.component';
import { SentFileDeleteDialogComponent } from './email-sent/sent-file-delete/sent-file-delete-dialog.component';

import { JunkFileAttachmentListComponent } from './email-junk/junk-file-details/junk-file-attachment-list/junk-file-attachment-list.component';
import { JunkFilesListComponent } from './email-junk/junk-files-list/junk-files-list.component';
import { JunkFileDetailsComponent } from './email-junk/junk-file-details/junk-file-details.component';
import { JunkFileDataComponent } from './email-junk/junk-file-details/junk-file-data/junk-file-data.component';
import { JunkFileDeleteDialogComponent } from './email-junk/junk-file-delete/junk-file-delete-dialog.component';

import { BlacklistFileAttachmentListComponent } from './email-blacklist/blacklist-file-details/blacklist-file-attachment-list/blacklist-file-attachment-list.component';
import { BlacklistFilesListComponent } from './email-blacklist/blacklist-files-list/blacklist-files-list.component';
import { BlacklistFileDetailsComponent } from './email-blacklist/blacklist-file-details/blacklist-file-details.component';
import { BlacklistFileDataComponent } from './email-blacklist/blacklist-file-details/blacklist-file-data/blacklist-file-data.component';
import { BlacklistFileDeleteDialogComponent } from './email-blacklist/blacklist-file-delete/blacklist-file-delete-dialog.component';

import { FileUploadComponent } from './email-file-upload/file-upload.component';

//import { MarkdownPipe } from './markdown.pipe';

import { ComposeEMailComponent } from './email-compose/compose-email.component';
import { ReplyEMailComponent } from './email-reply/reply-email.component';
import { ForwardEMailComponent } from './email-forward/forward-email.component';

import { EMailInboxUserFilesService } from './/core/services/email-inbox-user-files.service';
import { EMailSentUserFilesService } from './/core/services/email-sent-user-files.service';
import { EMailJunkUserFilesService } from './/core/services/email-junk-user-files.service';

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
		QuillModule
	],
	// tslint:disable-next-line:max-line-length
	/**
		* Components / Directives/ Pipes
		*/
	declarations: [
		EMailWindowContainerComponent,

		InboxFileAttachmentListComponent,
		InboxFilesListComponent,
		InboxFileDetailsComponent,
		InboxFileDataComponent,
		InboxFileDeleteDialogComponent,

		SentFileAttachmentListComponent,
		SentFilesListComponent,
		SentFileDetailsComponent,
		SentFileDataComponent,
		SentFileDeleteDialogComponent,

		JunkFileAttachmentListComponent,
		JunkFilesListComponent,
		JunkFileDetailsComponent,
		JunkFileDataComponent,
		JunkFileDeleteDialogComponent,

		BlacklistFileAttachmentListComponent,
		BlacklistFilesListComponent,
		BlacklistFileDetailsComponent,
		BlacklistFileDataComponent,
		BlacklistFileDeleteDialogComponent,

		ComposeEMailComponent,
		ReplyEMailComponent,
		ForwardEMailComponent,
		FileUploadComponent,
		//MarkdownPipe,
		//ProgressComponent

	],
	providers: [
		EMailInboxUserFilesService,
		EMailSentUserFilesService,
		EMailJunkUserFilesService
	]
})
export class EMailWindowModule {

	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}
}
