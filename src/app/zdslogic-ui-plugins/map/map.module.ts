import { NgModule } from '@angular/core';
import { SharedModule } from 'app/zdslogic-ui-base/shared/shared.module';

import { MapComponent } from '../map/map.component';
//import { SiteMapNodesChartComponent } from '../visualizations/site-map-nodes-chart/nodes-chart.component';

//import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { mapRoute } from './map.routing';
import { MaterialModule } from './../../zdslogic-ui-base/material/material.module';

@NgModule({
	declarations: [
		MapComponent
	],
	imports: [
		SharedModule,
		//GoogleMapsModule,
		MaterialModule,
		RouterModule.forChild(mapRoute),
	]
})
export class MapModule {
}
