import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IsUserRouteGuard } from 'app/zdslogic-ui-shell/common/isUser.guard';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ContactCreateComponent } from '../contact-create/contact-create.component';
import { ContactUpdateComponent } from '../contact-update/contact-update.component';
import { ContactEMailComponent } from '../contact-email/contact-email.component';
//import { StartContactVideoComponent } from '../contact-video/start-contact-video.component';

const routes: Routes = [
	{ path: '', component: ContactListComponent },
	{
		path: 'list', component: ContactListComponent
	},
	{
		path: 'connections',
		loadChildren: () => import('../connections/connections.module').then(m => m.ConnectionsModule),
		data: { title: 'Connections'}
	},
	{
		path: 'groups',
		loadChildren: () => import('../contact-groups/groups.module').then(m => m.GroupsModule),
		data: { title: 'Groups'}
	},
	{
		path: 'organizations',
		loadChildren: () => import('../contact-organizations/organizations.module').then(m => m.OrganizationsModule),
		data: { title: 'Organizations'}
	},
	{ path: 'contact/details/:id', component: ContactDetailsComponent },
	{ path: 'contact/create', component: ContactCreateComponent },
	{ path: 'contact/update/:id', component: ContactUpdateComponent, canActivate: [IsUserRouteGuard] },
	{ path: 'contact/email/:id', component: ContactEMailComponent },
	//{ path: 'contact/video/:id', component: StartContactVideoComponent },
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	providers: [IsUserRouteGuard],
	exports: [
		RouterModule
	],
	/**
		* Components / Directives/ Pipes
		*/
	declarations: []
})
export class ContactsRoutingModule { }
