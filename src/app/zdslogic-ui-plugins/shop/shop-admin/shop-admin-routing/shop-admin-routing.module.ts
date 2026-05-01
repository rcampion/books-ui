import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductsAdminContainerComponent } from '../shop-admin-container/shop-admin-container.component';

import { AddressListComponent } from '../shop-admin-container/entities/address/address-list/address-list.component';
import { AddressDetailsComponent } from '../shop-admin-container/entities/address/address-details/address-details.component';
import { AddressCreateComponent } from '../shop-admin-container/entities/address/address-create/address-create.component';
import { AddressUpdateComponent } from '../shop-admin-container/entities/address/address-update/address-update.component';

import { AddressStatusListComponent } from '../shop-admin-container/entities/address-status/address-status-list/address-status-list.component';
import { AddressStatusDetailsComponent } from '../shop-admin-container/entities/address-status/address-status-details/address-status-details.component';
import { AddressStatusCreateComponent } from '../shop-admin-container/entities/address-status/address-status-create/address-status-create.component';
import { AddressStatusUpdateComponent } from '../shop-admin-container/entities/address-status/address-status-update/address-status-update.component';

import { AuthorListComponent } from '../shop-admin-container/entities/author/author-list/author-list.component';
import { AuthorDetailsComponent } from '../shop-admin-container/entities/author/author-details/author-details.component';
import { AuthorCreateComponent } from '../shop-admin-container/entities/author/author-create/author-create.component';
import { AuthorUpdateComponent } from '../shop-admin-container/entities/author/author-update/author-update.component';

import { ProductListComponent } from '../shop-admin-container/entities/book/book-list/book-list.component';
import { ProductDetailsComponent } from '../shop-admin-container/entities/book/book-details/book-details.component';
import { ProductCreateComponent } from '../shop-admin-container/entities/book/book-create/book-create.component';
import { ProductUpdateComponent } from '../shop-admin-container/entities/book/book-update/book-update.component';

//import { ProductEMailComponent } from '../book-email/book-email.component';

const routes: Routes = [
	/*
		{
			path: 'address/create',
			component: AddressCreateComponent,
		},
		{
			path: 'address/details/:id',
			component: AddressDetailsComponent,
		},
		{
			path: 'address/update/:id',
			component: AddressUpdateComponent,
		},
		{
			path: 'address-status/create',
			component: AddressStatusCreateComponent,
		},
		{
			path: 'address-status/details/:id',
			component: AddressStatusDetailsComponent,
		},
		{
			path: 'address-satus/update/:id',
			component: AddressStatusUpdateComponent,
		},
		{
			path: 'author/create',
			component: AuthorCreateComponent,
		},
		{
			path: 'author/details/:id',
			component: AuthorDetailsComponent,
		},
		{
			path: 'author/update/:id',
			component: AuthorUpdateComponent,
		},
		{
			path: 'book/create',
			component: ProductCreateComponent,
		},
		{
			path: 'book/details/:id',
			component: ProductDetailsComponent,
		},
		{
			path: 'book/update/:id',
			component: ProductUpdateComponent,
		},
	*/
	{
		path: '',
		component: ProductsAdminContainerComponent,
		children: [
			{
				path: 'address',
				component: AddressListComponent,
				children: [
					{ path: 'list', component: AddressListComponent },
					{ path: 'details/:id', component: AddressDetailsComponent },
					{ path: 'create', component: AddressCreateComponent },
					{ path: 'update/:id', component: AddressUpdateComponent }
				]
			},
			{
				path: 'address-status',
				component: AddressStatusListComponent,
				children: [
					{ path: 'list', component: AddressStatusListComponent },
					{ path: 'details/:id', component: AddressStatusDetailsComponent },
					{ path: 'create', component: AddressStatusCreateComponent },
					{ path: 'update/:id', component: AddressStatusUpdateComponent }]
			},
			{
				path: 'author',
				component: AuthorListComponent,
				children: [

					{ path: 'list', component: AuthorListComponent },
					{ path: 'details/:id', component: AuthorDetailsComponent },
					{ path: 'create', component: AuthorCreateComponent },
					{ path: 'update/:id', component: AuthorUpdateComponent }]
			},
			//shop-admin/book/details/1
			{
				path: 'book',
				component: ProductListComponent,
				children: [
					{
						path: 'create',
						component: ProductCreateComponent,
					},
					{
						path: 'details',
						component: ProductDetailsComponent,
						children: [{
							path: ':id',
							component: ProductDetailsComponent,
						}]
					},
					{
						path: 'update',
						component: ProductListComponent,
						children: [{
							path: ':id',
							component: ProductUpdateComponent,
						}]
					}
				],
			},
		],
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
	declarations: []
})
export class ProductsAdminRoutingModule { }
