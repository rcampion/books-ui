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
import { GuestLayoutComponent } from 'app/zdslogic-shell/layout/layouts/guest/guest.component';
import { FooterModule } from 'app/zdslogic-shell/layout/common/footer/footer.module';

@NgModule({
	declarations: [
		GuestLayoutComponent
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
		FooterModule,
		SharedModule
	],
	exports: [
		GuestLayoutComponent
	]
})
export class GuestLayoutModule {
}
