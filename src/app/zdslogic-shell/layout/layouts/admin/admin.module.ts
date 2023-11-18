import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseFullscreenModule } from 'app/zdslogic-shell/@fuse/components/fullscreen';
import { FuseLoadingBarModule } from 'app/zdslogic-shell/@fuse/components/loading-bar';
import { FuseNavigationModule } from 'app/zdslogic-shell/@fuse/components/navigation';
import { LanguagesModule } from 'app/zdslogic-shell/layout/common/languages/languages.module';
import { ShortcutsModule } from 'app/zdslogic-shell/layout/common/shortcuts/shortcuts.module';
import { SharedModule } from 'app/zdslogic-shell/shared/shared.module';
import { AdminLayoutComponent } from 'app/zdslogic-shell/layout/layouts/admin/admin.component';

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
		ShortcutsModule,
		SharedModule
	],
	exports: [
		AdminLayoutComponent
	]
})
export class AdminLayoutModule {
}
