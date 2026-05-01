import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductBundleListComponent } from '../product-bundle-list/product-bundle-list.component';
import { ProductBundleDetailsComponent } from '../product-bundle-details/product-bundle-details.component';
import { ProductBundleCreateComponent } from '../product-bundle-create/product-bundle-create.component';
import { ProductBundleUpdateComponent } from '../product-bundle-update/product-bundle-update.component';

const routes: Routes = [
	{ path: '', component: ProductBundleListComponent },
	{ path: 'list', component: ProductBundleListComponent },
	{ path: 'product-bundle/details/:id', component: ProductBundleDetailsComponent },
	{ path: 'product-bundle/create', component: ProductBundleCreateComponent },
	{ path: 'product-bundle/update/:id', component: ProductBundleUpdateComponent },
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
export class ProductBundleRoutingModule { }
