import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';

import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, RouteReuseStrategy } from '@angular/router';

import { MarkdownModule } from 'ngx-markdown';

import { FuseModule } from 'app/zdslogic-ui-shell/@fuse';
import { FuseConfigModule } from 'app/zdslogic-ui-shell/@fuse/services/config';
import { FuseMockApiModule } from 'app/zdslogic-ui-shell/@fuse/lib/mock-api';

import { RecaptchaModule } from 'ng-recaptcha';
import {
	NgxMatDatetimePickerModule,
	NgxMatNativeDateModule,
	NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';

// import needed PrimeNG modules here
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { SlideshowModule } from 'ng-simple-slideshow';
import { GoogleMapsModule } from '@angular/google-maps';

import { CoreModule } from 'app/zdslogic-ui-shell/core/core.module';
import { appConfig } from 'app/zdslogic-ui-shell/core/config/app.config';
import { LayoutModule } from 'app/zdslogic-ui-shell/layout/layout.module';

import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';

//zdslogic components

//zdslogic directives

//zdslogic modules
import { MaterialModule } from './zdslogic-ui-base/material/material.module';
//import { NzModule } from './zdslogic-ui-base/nz/nz.module';
//import { ZdsCoreModule } from './zdslogic-ui-base/core';

//zdslogic services
import { AngularLogPublishersService } from './zdslogic-ui-base/core/services/angular-log-publishers.service';
import { AngularLogService } from './zdslogic-ui-base/core/services/angular-log.service';

const routerConfig: ExtraOptions = {
	preloadingStrategy: PreloadAllModules,
	scrollPositionRestoration: 'enabled'
};

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(appRoutes, routerConfig),
		ButtonModule,
		CKEditorModule,

		// Core module of your application
		CoreModule,

		FlexLayoutModule,
		FontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		//FullCalendarModule,

		// Fuse, FuseConfig & FuseMockAPI
		FuseModule,
		FuseConfigModule.forRoot(appConfig),
		//FuseMockApiModule.forRoot(mockApiServices),

		//GoogleMapsModule,
		HttpClientModule,

		// modules of your application

		LayoutModule,
		MaterialModule,
		//NzModule,
		//OverlayModule,
		//RegistrationModule,

		//ZdsCoreModule,

		// 3rd party modules that require global configuration via forRoot
		MarkdownModule.forRoot({})
	],
	exports: [
		RecaptchaModule,
		MaterialModule,
	],
	providers: [
		{
			provide: 'externalUrlRedirectResolver',
			useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, location: Location) => {
				//window.location.href = (route.data as any).externalUrl;
				let url = (route.data as any).externalUrl;
				window.open(url, '_blank');
				let currentUrl = window.location.href;
				//location.go(currentUrl);
				//window.location.go(currentUrl);
			}
		},
		//AccountEventsService,
		//AlertService,
		AngularLogService,
		AngularLogPublishersService,
		//ApiService,
		//AuthorizationRouteGuard,
		//DataSharingService,
		//ErrorService,
		//JwtService,
		//LoginRouteGuard,
		//MapApiService,
		//RegistrationService,
		//ResizeService,
		//SubscriptionRouteGuard,
		//UsersService,
		//MyAccountService
	],

	bootstrap: [
		AppComponent
	]
})
export class AppModule {

	myrouter: Router;

	constructor(private library: FaIconLibrary, private router: Router) {

		//library.add(faSearch);

		library.addIcons(faSearch, faShop, faShoppingCart, faCaretDown);

		this.myrouter = router;

	}
}
