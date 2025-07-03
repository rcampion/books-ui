import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseFullscreenModule } from 'app/zdslogic-ui-shell/@fuse/components/fullscreen';
import { FuseLoadingBarModule } from 'app/zdslogic-ui-shell/@fuse/components/loading-bar';
import { FuseNavigationModule } from 'app/zdslogic-ui-shell/@fuse/components/navigation';
import { LanguagesModule } from 'app/zdslogic-ui-shell/layout/common/languages/languages.module';
//import { MessagesModule } from 'app/zdslogic-ui-shell/layout/common/messages/messages.module';
import { NotificationsModule } from 'app/zdslogic-ui-shell/layout/common/notifications/notifications.module';
//import { QuickChatModule } from 'app/zdslogic-ui-shell/layout/common/quick-chat/quick-chat.module';
import { SearchModule } from 'app/zdslogic-ui-shell/layout/common/search/search.module';
import { ShortcutsModule } from 'app/zdslogic-ui-shell/layout/common/shortcuts/shortcuts.module';
import { UserModule } from 'app/zdslogic-ui-shell/layout/common/user/user.module';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { AdminLayoutComponent } from 'app/zdslogic-ui-shell/layout/layouts/admin/admin.component';

@NgModule({
	declarations: [
		AdminLayoutComponent
	],
	imports: [
		HttpClientModule,
		RouterModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatMenuModule,
		FuseFullscreenModule,
		FuseLoadingBarModule,
		FuseNavigationModule,
		LanguagesModule,
		NotificationsModule,
		//QuickChatModule,
		SearchModule,
		ShortcutsModule,
		UserModule,
		SharedModule
	],
	exports: [
		AdminLayoutComponent
	]
})
export class AdminLayoutModule {
}
