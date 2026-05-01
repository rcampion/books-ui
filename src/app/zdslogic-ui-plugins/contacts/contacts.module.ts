import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterStateSnapshot, ActivatedRouteSnapshot, Router, RouteReuseStrategy } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider'; import { NgxMatFileInputModule } from '@angular-material-components/file-input';

// import needed PrimeNG modules here
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { RecaptchaModule } from 'ng-recaptcha';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


//connections
//import { ConnectionDeleteComponent } from './contact-create/contact-create.component'
//import { ConnectionListomponent } from './contact-create/contact-create.component'
//import { ConnectionListSmallComponent } from './contact-create/contact-create.component'
//import { ConnectionCreateComponent } from './contact-create/contact-create.component'
//import { ConnectionCreateComponent } from './contact-create/contact-create.component'

//contact-create
import { ContactCreateComponent } from './contact-create/contact-create.component'
import { ContactDataComponent } from './contact-details/contact-data/contact-data.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ContactDeleteDialogComponent } from './contact-delete/contact-delete-dialog.component';

//contact-delete
//contact-details
//contact-email
//contact-groups
//contact-list
import { AccountDataComponent } from './contact-details/account-data/account-data.component';

import { ContactAddressListComponent } from './contact-details/contact-address-list/contact-address-list.component';
import { ContactAddressDetailsDialogComponent } from './contact-details/contact-address-details-dialog/contact-address-details-dialog.component';
import { ContactAddressUpdateDialogComponent } from './contact-details/contact-address-update-dialog/contact-address-update-dialog.component';
import { ContactAddressCreateDialogComponent } from './contact-details/contact-address-create-dialog/contact-address-create-dialog.component';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

import { ContactEmailListComponent } from './contact-details/contact-email-list/contact-email-list.component';
import { ContactEmailUpdateDialogComponent } from './contact-details/contact-email-update-dialog/contact-email-update-dialog.component';
import { ContactEmailCreateDialogComponent } from './contact-details/contact-email-create-dialog/contact-email-create-dialog.component';

import { ContactPhoneListComponent } from './contact-details/contact-phone-list/contact-phone-list.component';
import { ContactPhoneCreateDialogComponent } from './contact-details/contact-phone-create-dialog/contact-phone-create-dialog.component';
import { ContactPhoneUpdateDialogComponent } from './contact-details/contact-phone-update-dialog/contact-phone-update-dialog.component';

import { ContactWebsiteListComponent } from './contact-details/contact-website-list/contact-website-list.component';
import { ContactWebsiteCreateDialogComponent } from './contact-details/contact-website-create-dialog/contact-website-create-dialog.component';
import { ContactWebsiteUpdateDialogComponent } from './contact-details/contact-website-update-dialog/contact-website-update-dialog.component';

import { ContactNoteListComponent } from './contact-details/contact-note-list/contact-note-list.component';
import { ContactNoteDetailsDialogComponent } from './contact-details/contact-note-details-dialog/contact-note-details-dialog.component';
import { ContactNoteCreateDialogComponent } from './contact-details/contact-note-create-dialog/contact-note-create-dialog.component';
import { ContactNoteUpdateDialogComponent } from './contact-details/contact-note-update-dialog/contact-note-update-dialog.component';

import { ContactEMailComponent } from './contact-email/contact-email.component';

//import { ContacLinkedinUploadComponent } from './contact-details/contact-website-update-dialog/contact-website-update-dialog.component';

import { ContactsService } from './core/services/contacts.service';
import { GroupsService } from './core/services/groups.service';
import { OrganizationsService } from './core/services/organizations.service';

//zdslogic modules
import { ZdsCoreModule } from './../../zdslogic-ui-base/core/zds-core.module';
import { MaterialModule } from './../../zdslogic-ui-base/material/material.module';
import { NzModule } from './../../zdslogic-ui-base/nz/nz.module';
import { SharedModule } from './../../zdslogic-ui-base/shared/shared.module';
import { ContactsLayoutComponent } from './contacts-layout/contacts-layout.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
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
	],
	exports: [
		FormsModule,
		MaterialModule,
		MatButtonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatSelectModule,
		MatToolbarModule,
		RecaptchaModule,
		NzModule,
		ReactiveFormsModule,
		RecaptchaModule
	],

	// tslint:disable-next-line:max-line-length
	/**
	 * Components / Directives/ Pipes
	 */
	declarations: [
		AccountDataComponent,
		ContactCreateComponent,
		ContactListComponent,
		ContactDetailsComponent,
		ContactDataComponent,
		ContactUpdateComponent,
		ContactDeleteDialogComponent,
		ContactEmailListComponent,
		ContactEmailUpdateDialogComponent,
		ContactEmailCreateDialogComponent,
		ContactAddressListComponent,
		ContactAddressDetailsDialogComponent,
		ContactAddressUpdateDialogComponent,
		ContactAddressCreateDialogComponent,
		ContactPhoneListComponent,
		ContactPhoneCreateDialogComponent,
		ContactPhoneUpdateDialogComponent,
		ContactWebsiteListComponent,
		ContactWebsiteCreateDialogComponent,
		ContactWebsiteUpdateDialogComponent,
		ContactNoteListComponent,
		ContactNoteDetailsDialogComponent,
		ContactNoteCreateDialogComponent,
		ContactNoteUpdateDialogComponent,
		ContactEMailComponent,
		ContactsLayoutComponent
	],
	providers: [
		ContactsService,
		GroupsService,
		OrganizationsService
	]
})
export class ContactsModule {

	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}
}
