import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'app/zdslogic-ui-base/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from 'app/zdslogic-ui-base/shared/shared.module';
import { CollaborationRoutingModule } from './collaboration-routing/collaboration-routing.module';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// import needed PrimeNG modules here
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { CallComponent } from './collaboration-phone/call/call.component';
import { ChatComponent } from './collaboration-chat/chat.component';
import { ContactEMailComponent } from './collaboration-email/contact-email.component';
import { ContactComponent } from './collaboration-contact/contact.component';
import { CollaborationContainerComponent } from './collaboration-container/collaboration-container.component';
import { ExpertComponent } from './collaboration-phone/expert/expert.component';
import { SettingsComponent } from './collaboration-phone/settings/settings.component';
import { TabsComponent } from './collaboration-phone/tabs/tabs.component';

import { RecaptchaModule } from 'ng-recaptcha';
import { UtilsModule } from 'app/zdslogic-ui-base/utils/utils.module';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { GroupChatService } from 'app/zdslogic-ui-base/core/services/group-chat.service';
import { ElizaChatService } from 'app/zdslogic-ui-base/core/services/eliza-chat.service';

import { SocketClientTwoService } from 'app/zdslogic-ui-base/core/services/socket-client-two.service';
import { SocketClientElizaService } from 'app/zdslogic-ui-base/core/services/socket-client-eliza.service';

import { VideoJitsiStartComponent } from './collaboration-video-start/video-jitsi-start.component';
import { VideoJitsiEnterComponent } from './collaboration-video-enter/video-jitsi-enter.component';
import { VideoJitsiPublicComponent } from './collaboration-video-public/video-jitsi-public.component';
import { VideoJitsiCallDialogComponent } from './dialog/video-jitsi-call-dialog.component';
import { FuseNavigationModule } from 'app/zdslogic-ui-shell/@fuse/components/navigation';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
		CollaborationRoutingModule,
		MaterialModule,
		//MatDialogModule,
		//MatInputModule,
		//MatFormFieldModule,

		ButtonModule,
		InputTextModule,
		PanelModule,

		RecaptchaModule,
		CKEditorModule,
		UtilsModule,
		FontAwesomeModule,
		NgxMatFileInputModule,
		FuseNavigationModule
	],
	exports: [
		MaterialModule,
		CommonModule,
	],
	/**
	 * Components / Directives/ Pipes
	 */
	declarations: [
		ChatComponent,
		ContactComponent,
		CollaborationContainerComponent,
		ContactEMailComponent,
		CallComponent,
		ExpertComponent,
		SettingsComponent,
		TabsComponent,

		VideoJitsiStartComponent,
		VideoJitsiEnterComponent,
		VideoJitsiCallDialogComponent,
		VideoJitsiPublicComponent
	],	providers: [

		SocketClientTwoService,
		SocketClientElizaService,
		GroupChatService,
		ElizaChatService
	],
})
export class CollaborationModule {

	constructor(library: FaIconLibrary) {

		library.addIcons(faSearch);

	}

}
