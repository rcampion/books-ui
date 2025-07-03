import { NgModule } from '@angular/core';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';

//import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { aboutRoute } from './about.routing';
import { MaterialModule } from './../../zdslogic-ui-base/material/material.module';
import { AboutComponent } from './about.component';
//import { MapComponent } from '../map/map.component';
//import { SiteMapNodesChartComponent } from '../visualizations/site-map-nodes-chart/nodes-chart.component';
//import { KnowledgeNodesChartComponent } from '../visualizations/knowledge-nodes-chart/knowledge-nodes-chart.component';

@NgModule({
    declarations: [
        AboutComponent,
        //MapComponent,
        //SiteMapNodesChartComponent,
        //KnowledgeNodesChartComponent
    ],
    imports     : [
        SharedModule,
        //GoogleMapsModule,
        MaterialModule,
        RouterModule.forChild(aboutRoute),
    ]
})
export class AboutModule
{
}
