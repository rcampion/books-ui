import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'app/zdslogic-ui-base/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { FuseNavigationModule } from 'app/zdslogic-ui-shell/@fuse/components/navigation';
import { QuillModule } from 'ngx-quill';

// import needed PrimeNG modules here
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RecaptchaModule } from 'ng-recaptcha';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SharedModule } from 'app/zdslogic-ui-base/shared/shared.module';

import { BooksAdminContainerComponent } from './books-admin-container/books-admin-container.component';

import { BooksAdminRoutingModule } from './books-admin-routing/books-admin-routing.module';

import { AddressListComponent } from './books-admin-container/entities/address/address-list/address-list.component';
import { AddressDetailsComponent } from './books-admin-container/entities/address/address-details/address-details.component';
import { AddressDataComponent } from './books-admin-container/entities/address/address-details/address-data/address-data.component';
import { AddressCreateComponent } from './books-admin-container/entities/address/address-create/address-create.component';
import { AddressUpdateComponent } from './books-admin-container/entities/address/address-update/address-update.component';
import { AddressDeleteDialogComponent } from './books-admin-container/entities/address/address-delete/address-delete-dialog.component';

import { AddressStatusListComponent } from './books-admin-container/entities/address-status/address-status-list/address-status-list.component';
import { AddressStatusDetailsComponent } from './books-admin-container/entities/address-status/address-status-details/address-status-details.component';
import { AddressStatusDataComponent } from './books-admin-container/entities/address-status/address-status-details/address-status-data/address-status-data.component';
import { AddressStatusCreateComponent } from './books-admin-container/entities/address-status/address-status-create/address-status-create.component';
import { AddressStatusUpdateComponent } from './books-admin-container/entities/address-status/address-status-update/address-status-update.component';
import { AddressStatusDeleteDialogComponent } from './books-admin-container/entities/address-status/address-status-delete/address-status-delete-dialog.component';

import { AuthorListComponent } from './books-admin-container/entities/author/author-list/author-list.component';
import { AuthorDetailsComponent } from './books-admin-container/entities/author/author-details/author-details.component';
import { AuthorDataComponent } from './books-admin-container/entities/author/author-details/author-data/author-data.component';
import { AuthorCreateComponent } from './books-admin-container/entities/author/author-create/author-create.component';
import { AuthorUpdateComponent } from './books-admin-container/entities/author/author-update/author-update.component';
import { AuthorDeleteDialogComponent } from './books-admin-container/entities/author/author-delete/author-delete-dialog.component';

import { BookListComponent } from './books-admin-container/entities/book/book-list/book-list.component';
import { BookDetailsComponent } from './books-admin-container/entities/book/book-details/book-details.component';
import { BookDataComponent } from './books-admin-container/entities/book/book-details/book-data/book-data.component';
import { BookCreateComponent } from './books-admin-container/entities/book/book-create/book-create.component';
import { BookUpdateComponent } from './books-admin-container/entities/book/book-update/book-update.component';
import { BookDeleteDialogComponent } from './books-admin-container/entities/book/book-delete/book-delete-dialog.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
        FuseNavigationModule,

		MaterialModule,
		MatDialogModule,
		MatInputModule,
		MatFormFieldModule,

		FontAwesomeModule,

		ButtonModule,
		InputTextModule,
		PanelModule,
		NgxMatFileInputModule,
		RecaptchaModule,
		CKEditorModule,

        PdfViewerModule,

        QuillModule,

		BooksAdminRoutingModule,
	],
	// tslint:disable-next-line:max-line-length
	declarations: [

		BooksAdminContainerComponent,

		AddressListComponent,
		AddressDetailsComponent,
		AddressDataComponent,
		AddressCreateComponent,
		AddressUpdateComponent,
		AddressDeleteDialogComponent,

		AddressStatusListComponent,
		AddressStatusDetailsComponent,
		AddressStatusDataComponent,
		AddressStatusCreateComponent,
		AddressStatusUpdateComponent,
		AddressStatusDeleteDialogComponent,

		AuthorListComponent,
		AuthorDetailsComponent,
		AuthorDataComponent,
		AuthorCreateComponent,
		AuthorUpdateComponent,
		AuthorDeleteDialogComponent,

		BookListComponent,
		BookDetailsComponent,
		BookDataComponent,
		BookCreateComponent,
		BookUpdateComponent,
		BookDeleteDialogComponent,

	]
})
export class BooksAdminModule {


	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}
}
