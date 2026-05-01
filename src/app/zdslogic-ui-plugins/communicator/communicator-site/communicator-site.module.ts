import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'app/zdslogic-ui-base/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
	NgxMatDatetimePickerModule,
	NgxMatNativeDateModule,
	NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';

import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from 'app/zdslogic-ui-base/shared';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// import needed PrimeNG modules here
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { RecaptchaModule } from 'ng-recaptcha';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FuseNavigationModule } from 'app/zdslogic-ui-shell/@fuse/components/navigation';
import { QuillModule } from 'ngx-quill';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { EmojifyPipe } from 'app/zdslogic-ui-base/core/pipes/emojify.pipe';
import { LinkfyPipe } from 'app/zdslogic-ui-base/core/pipes/linkfy.pipe';
import { SanitizePipe } from 'app/zdslogic-ui-base/core/pipes/sanitize.pipe';
import { GroupMessageDisplayNamePipe } from 'app/zdslogic-ui-base/core/pipes/group-message-display-name.pipe';

import { CommunicatorSiteRoutingModule } from './communicator-site-routing/communicator-site-routing.module';
import { CommunicatorSiteContainerComponent } from './communicator-site-container/communicator-site-container.component';

import { WindowContainerComponent } from './communicator-site-container/components/window-container/window-container.component';
//import { ChatMessageModule } from './communicator-site-container/components/window-container/chat-window/chat-message/chat-message.module';
import { ChatWindowModule } from './communicator-site-container/components/window-container/chat-window/chat-window.module';
import { EMailWindowModule } from './communicator-site-container/components/window-container/email-window/email-window.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		FuseNavigationModule,

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

		PdfViewerModule,

		QuillModule,
		PortalModule,

		CommunicatorSiteRoutingModule,

		//ChatMessageModule.
		ChatWindowModule,
		EMailWindowModule
	],

	// tslint:disable-next-line:max-line-length
	/**
	 * Components / Directives/ Pipes
	 */
	declarations: [

		CommunicatorSiteContainerComponent,
		WindowContainerComponent

	]
})
export class CommunicatorSiteModule {


	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}

}

