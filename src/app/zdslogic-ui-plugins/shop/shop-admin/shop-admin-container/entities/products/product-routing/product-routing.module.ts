import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { ProductSkuDetailsComponent } from '../product-details/product-sku-details/product-sku-details.component';
import { ProductSkuCreateComponent } from '../product-details/product-sku-create/product-sku-create.component';
import { ProductSkuUpdateComponent } from '../product-details/product-sku-update/product-sku-update.component';
//import { ProductEMailComponent } from '../product-email/product-email.component';

const routes: Routes = [
	{ path: '', component: ProductListComponent },
	{ path: 'list', component: ProductListComponent },
	{ path: 'product/details/:id', component: ProductDetailsComponent },
	{ path: 'product/create', component: ProductCreateComponent },
	{ path: 'product/update/:id', component: ProductUpdateComponent },

	{ path: 'product/sku/details/:id', component: ProductSkuDetailsComponent },
	{ path: 'product/sku/create', component: ProductSkuCreateComponent },
	{ path: 'product/sku/update/:id', component: ProductSkuUpdateComponent },

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
export class ProductRoutingModule { }
