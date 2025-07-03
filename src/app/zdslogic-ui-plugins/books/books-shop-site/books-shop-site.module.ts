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

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faShippingFast} from '@fortawesome/free-solid-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { MaterialModule } from 'app/zdslogic-ui-base/material/material.module';
import { SharedModule } from 'app/zdslogic-ui-base/shared/shared.module';

import { BooksService } from './../core/services/books.service';
import { CartService } from './../core/services/cart.service';

import { BookComponent } from './books-shop-books/book.component';
import { ShopBooksHomeComponent } from './books-shop-home/home.component';
import { ShopBooksListComponent } from './books-shop-books/books-list/books-list.component';
import { ShopCartComponent } from './books-shop-cart/shop-cart.component';
import { ShopSiteRoutingModule } from './books-shop-routing/books-shop-site-routing.module';

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
		//CKEditorModule,
		//SwiperModule,
	],
	/**
		* Components / Directives/ Pipes
		*/
	declarations: [
		ShopBooksHomeComponent,
		BookComponent,
		ShopBooksListComponent,
		ShopCartComponent
	],
	providers: [BooksService, CartService],
})
export class BooksShopSiteModule {

	constructor(private _library: FaIconLibrary) {

		_library.addIcons(faSearch, faShippingFast, faShop, faShoppingCart, faCaretDown);

	}
}
