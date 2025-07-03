import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { LandingHomeComponent } from 'app/zdslogic-ui-shell/modules/landing/home/home.component';
import { landingHomeRoutes } from 'app/zdslogic-ui-shell/modules/landing/home/home.routing';
//import { MapModule } from 'app/zdslogic-ui-plugins/map/map.module';

@NgModule({
	declarations: [
		LandingHomeComponent,
		//MapComponent
	],
	imports: [
		RouterModule.forChild(landingHomeRoutes),
		MatButtonModule,
		MatIconModule,
		SharedModule,
		//MapModule
	]
})
export class LandingHomeModule {
}
