import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConnectionsListComponent } from '../connections-list/connections-list.component';

const routes: Routes = [
    { path: '', component: ConnectionsListComponent },
    { path: 'list', component: ConnectionsListComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
	/**
	* Components / Directives/ Pipes
	*/
	declarations: []
})
export class ConnectionsRoutingModule { }
