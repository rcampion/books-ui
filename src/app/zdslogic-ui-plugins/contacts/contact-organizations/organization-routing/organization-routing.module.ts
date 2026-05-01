import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationListComponent } from '../organization-list/organization-list.component';
import { OrganizationDetailsComponent } from '../organization-details/organization-details.component';
import { OrganizationCreateComponent } from '../organization-create/organization-create.component';
import { OrganizationUpdateComponent } from '../organization-update/organization-update.component';
import { OrganizationEMailComponent } from '../organization-email/organization-email.component';

const routes: Routes = [
	{ path: '', component: OrganizationListComponent },
	{ path: 'list', component: OrganizationListComponent },
	{ path: 'details/:id', component: OrganizationDetailsComponent },
	{ path: 'create', component: OrganizationCreateComponent },
	{ path: 'update/:id', component: OrganizationUpdateComponent },
	{ path: 'email/:id', component: OrganizationEMailComponent },
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
export class OrganizationRoutingModule { }
