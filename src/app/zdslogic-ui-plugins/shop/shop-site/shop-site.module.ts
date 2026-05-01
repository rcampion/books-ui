import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

// import needed PrimeNG modules here
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { RecaptchaModule } from 'ng-recaptcha';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faShippingFast} from '@fortawesome/free-solid-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { MaterialModule } from 'app/zdslogic-ui-base/material/material.module';
import { SharedModule } from 'app/zdslogic-ui-base/shared/shared.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';

//import { MarkdownPipe } from './markdown.pipe';
//import { TestEsComponent } from '../test-es/test-es.component';
import { SwiperModule } from 'swiper/angular';

import { ShopSiteRoutingModule } from './shop-site-routing/shop-site-routing.module';
import { ShopHomeComponent } from './shop-home/home.component';
import { ShopProductsListComponent } from './shop-products/products-list/products-list.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { ProductsService } from './../core/services/products.service';
import { CartService } from './../core/services/cart.service';
import { ProductComponent } from './shop-products/product.component';

@NgModule({
	imports: [
		CommonModule,
		ShopSiteRoutingModule,
		ReactiveFormsModule,
		SharedModule,

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
		SwiperModule,
	],
	/**
		* Components / Directives/ Pipes
		*/
	declarations: [
		ShopHomeComponent,
		ProductComponent,
		ShopProductsListComponent,
		ShopCartComponent
	],
	providers: [ProductsService, CartService],
})
export class ShopSiteModule {

	constructor(private _library: FaIconLibrary) {

		_library.addIcons(faSearch, faShippingFast, faShop, faShoppingCart, faCaretDown);

	}
}
