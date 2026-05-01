import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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

import { CommunicatorAdminContainerComponent } from './communicator-admin-container/communicator-admin-container.component';
import { CommunicatorAdminRoutingModule } from './communicator-admin-routing/communicator-admin-routing.module';

import { ChatChannelModule } from './communicator-admin-container/entities/chat-channel/chat-channel.module';

@NgModule({
	imports: [
		CommonModule,
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
		ChatChannelModule,
		CommunicatorAdminRoutingModule,
	],
	// tslint:disable-next-line:max-line-length
	declarations: [

		CommunicatorAdminContainerComponent,
/*
		ChatChannelCreateComponent,
		ChatChannelDataComponent,
		ChatChannelListComponent,
		ChatChannelDetailsComponent,
		ChatChannelDeleteDialogComponent,
		ChatChannelUpdateComponent,
*/
	]
})
export class CommunicatorAdminModule {


	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}

}
