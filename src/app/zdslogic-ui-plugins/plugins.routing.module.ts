import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
//import { AboutComponent } from './about/about.component';

export const pluginRoutes: Route[] = [

];


@NgModule({
  imports: [RouterModule.forChild(pluginRoutes)],
  exports: [RouterModule]
})
export class PluginsRoutingModule { }
