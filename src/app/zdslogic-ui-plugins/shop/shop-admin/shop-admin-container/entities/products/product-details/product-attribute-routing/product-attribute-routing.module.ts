import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductAttributeListComponent } from '../product-attribute-list/product-attribute-list.component';
import { ProductAttributeDetailsComponent } from '../product-attribute-details/product-attribute-details.component';
import { ProductAttributeCreateComponent } from '../product-attribute-create/product-attribute-create.component';
import { ProductAttributeUpdateComponent } from '../product-attribute-update/product-attribute-update.component';

const routes: Routes = [
	{ path: '', component: ProductAttributeListComponent },
	{ path: 'list', component: ProductAttributeListComponent },
	{ path: 'product-attribute/details/:id', component: ProductAttributeDetailsComponent },
	{ path: 'product-attribute/create', component: ProductAttributeCreateComponent },
	{ path: 'product-attribute/update/:id', component: ProductAttributeUpdateComponent },
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
export class ProductAttributeRoutingModule { }
