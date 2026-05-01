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

import { ProductsAdminContainerComponent } from './shop-admin-container/shop-admin-container.component';
import { ProductsAdminRoutingModule } from './shop-admin-routing/shop-admin-routing.module';

import { AddressListComponent } from './shop-admin-container/entities/address/address-list/address-list.component';
import { AddressDetailsComponent } from './shop-admin-container/entities/address/address-details/address-details.component';
import { AddressDataComponent } from './shop-admin-container/entities/address/address-details/address-data/address-data.component';
import { AddressCreateComponent } from './shop-admin-container/entities/address/address-create/address-create.component';
import { AddressUpdateComponent } from './shop-admin-container/entities/address/address-update/address-update.component';
import { AddressDeleteDialogComponent } from './shop-admin-container/entities/address/address-delete/address-delete-dialog.component';

import { AddressStatusListComponent } from './shop-admin-container/entities/address-status/address-status-list/address-status-list.component';
import { AddressStatusDetailsComponent } from './shop-admin-container/entities/address-status/address-status-details/address-status-details.component';
import { AddressStatusDataComponent } from './shop-admin-container/entities/address-status/address-status-details/address-status-data/address-status-data.component';
import { AddressStatusCreateComponent } from './shop-admin-container/entities/address-status/address-status-create/address-status-create.component';
import { AddressStatusUpdateComponent } from './shop-admin-container/entities/address-status/address-status-update/address-status-update.component';
import { AddressStatusDeleteDialogComponent } from './shop-admin-container/entities/address-status/address-status-delete/address-status-delete-dialog.component';

import { AuthorListComponent } from './shop-admin-container/entities/author/author-list/author-list.component';
import { AuthorDetailsComponent } from './shop-admin-container/entities/author/author-details/author-details.component';
import { AuthorDataComponent } from './shop-admin-container/entities/author/author-details/author-data/author-data.component';
import { AuthorCreateComponent } from './shop-admin-container/entities/author/author-create/author-create.component';
import { AuthorUpdateComponent } from './shop-admin-container/entities/author/author-update/author-update.component';
import { AuthorDeleteDialogComponent } from './shop-admin-container/entities/author/author-delete/author-delete-dialog.component';

import { ProductListComponent } from './shop-admin-container/entities/product/product-list/product-list.component';
import { ProductDetailsComponent } from './shop-admin-container/entities/product/product-details/product-details.component';
import { ProductDataComponent } from './shop-admin-container/entities/product/product-details/product-data/product-data.component';
import { ProductCreateComponent } from './shop-admin-container/entities/product/product-create/product-create.component';
import { ProductUpdateComponent } from './shop-admin-container/entities/product/product-update/product-update.component';
import { ProductDeleteDialogComponent } from './shop-admin-container/entities/product/product-delete/product-delete-dialog.component';

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

		productsAdminRoutingModule,
	],
	// tslint:disable-next-line:max-line-length
	declarations: [

		productsAdminContainerComponent,

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

		productListComponent,
		productDetailsComponent,
		productDataComponent,
		productCreateComponent,
		productUpdateComponent,
		productDeleteDialogComponent,

	]
})
export class ShopAdminModule {


	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}
}
