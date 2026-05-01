import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShopHomeComponent } from './../shop-home/home.component';
import { ShopProductsListComponent } from './../shop-products/products-list/products-list.component';
import { ShopCartComponent } from './../shop-cart/shop-cart.component';

const routes: Routes = [
	{
		path: '',
		component: ShopHomeComponent
	},
	{
		path: 'home',
		component: ShopHomeComponent
	},
	{
		path: 'products',
		component: ShopProductsListComponent
	},
	{
		path: 'cart',
		component: ShopCartComponent
	}

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
export class ShopSiteRoutingModule { }

