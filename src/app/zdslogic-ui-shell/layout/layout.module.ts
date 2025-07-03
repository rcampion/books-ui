import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/zdslogic-ui-shell/layout/layout.component';
import { GuestLayoutModule } from 'app/zdslogic-ui-shell/layout/layouts/guest/guest.module';
import { AdminLayoutModule } from 'app/zdslogic-ui-shell/layout/layouts/admin/admin.module';
import { SettingsModule } from 'app/zdslogic-ui-shell/layout/common/settings/settings.module';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';

const layoutModules = [
	GuestLayoutModule,
	AdminLayoutModule
];

@NgModule({
	declarations: [
		LayoutComponent
	],
	imports: [
		SharedModule,
		SettingsModule,
		GuestLayoutModule,
		AdminLayoutModule
	],
	exports: [
		LayoutComponent,
		GuestLayoutModule,
		AdminLayoutModule
	]
})
export class LayoutModule {
}
