import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SkuListComponent } from '../sku-list/sku-list.component';
import { SkuDetailsComponent } from '../sku-details/sku-details.component';
import { SkuCreateComponent } from '../sku-create/sku-create.component';
import { SkuUpdateComponent } from '../sku-update/sku-update.component';

const routes: Routes = [
	{ path: '', component: SkuListComponent },
	{ path: 'list', component: SkuListComponent },
	{ path: 'sku/details/:id', component: SkuDetailsComponent },
	{ path: 'sku/create', component: SkuCreateComponent },
	{ path: 'sku/update/:id', component: SkuUpdateComponent },
	//    { path: 'sku/email/:id', component: SkuEMailComponent },
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
export class SkuRoutingModule { }
