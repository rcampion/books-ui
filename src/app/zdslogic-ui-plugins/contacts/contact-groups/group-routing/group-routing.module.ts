import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GroupListComponent } from '../group-list/group-list.component';
import { GroupDetailsComponent } from '../group-details/group-details.component';
import { GroupCreateComponent } from '../group-create/group-create.component';
import { GroupUpdateComponent } from '../group-update/group-update.component';
import { GroupEMailComponent } from '../group-email/group-email.component';

const routes: Routes = [
	{ path: '', component: GroupListComponent },
    { path: 'list', component: GroupListComponent },
    { path: 'details/:id', component: GroupDetailsComponent },
    { path: 'create', component: GroupCreateComponent },
    { path: 'update/:id', component: GroupUpdateComponent },
    { path: 'email/:id', component: GroupEMailComponent },
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
export class GroupRoutingModule { }
