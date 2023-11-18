import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BooksAdminContainerComponent } from '../books-admin-container/books-admin-container.component';

import { AddressListComponent } from '../books-admin-container/entities/address/address-list/address-list.component';
import { AddressDetailsComponent } from '../books-admin-container/entities/address/address-details/address-details.component';
import { AddressCreateComponent } from '../books-admin-container/entities/address/address-create/address-create.component';
import { AddressUpdateComponent } from '../books-admin-container/entities/address/address-update/address-update.component';

import { AddressStatusListComponent } from '../books-admin-container/entities/address-status/address-status-list/address-status-list.component';
import { AddressStatusDetailsComponent } from '../books-admin-container/entities/address-status/address-status-details/address-status-details.component';
import { AddressStatusCreateComponent } from '../books-admin-container/entities/address-status/address-status-create/address-status-create.component';
import { AddressStatusUpdateComponent } from '../books-admin-container/entities/address-status/address-status-update/address-status-update.component';

import { AuthorListComponent } from '../books-admin-container/entities/author/author-list/author-list.component';
import { AuthorDetailsComponent } from '../books-admin-container/entities/author/author-details/author-details.component';
import { AuthorCreateComponent } from '../books-admin-container/entities/author/author-create/author-create.component';
import { AuthorUpdateComponent } from '../books-admin-container/entities/author/author-update/author-update.component';

import { BookListComponent } from '../books-admin-container/entities/book/book-list/book-list.component';
import { BookDetailsComponent } from '../books-admin-container/entities/book/book-details/book-details.component';
import { BookCreateComponent } from '../books-admin-container/entities/book/book-create/book-create.component';
import { BookUpdateComponent } from '../books-admin-container/entities/book/book-update/book-update.component';

//import { BookEMailComponent } from '../book-email/book-email.component';

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
			component: BookCreateComponent,
		},
		{
			path: 'book/details/:id',
			component: BookDetailsComponent,
		},
		{
			path: 'book/update/:id',
			component: BookUpdateComponent,
		},
	*/
	{
		path: '',
		component: BooksAdminContainerComponent,
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
			//books-admin/book/details/1
			{
				path: 'book',
				component: BookListComponent,
				children: [
					{
						path: 'create',
						component: BookCreateComponent,
					},
					{
						path: 'details',
						component: BookDetailsComponent,
						children: [{
							path: ':id',
							component: BookDetailsComponent,
						}]
					},
					{
						path: 'update',
						component: BookListComponent,
						children: [{
							path: ':id',
							component: BookUpdateComponent,
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
export class BooksAdminRoutingModule { }
