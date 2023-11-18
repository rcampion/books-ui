import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShopBooksHomeComponent } from './../books-shop-home/home.component';
import { ShopBooksListComponent } from './../books-shop-books/books-list/books-list.component';
import { ShopCartComponent } from './../books-shop-cart/shop-cart.component';

const routes: Routes = [
	{
		path: '',
		component: ShopBooksHomeComponent
	},
	{
		path: 'home',
		component: ShopBooksHomeComponent
	},
	{
		path: 'books',
		component: ShopBooksListComponent
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

