import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'app/zdslogic-ui-base/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationRoutingModule } from './organization-routing/organization-routing.module';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { OrganizationDataComponent } from './organization-details/organization-data/organization-data.component';
import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/zdslogic-ui-base/shared';
import { OrganizationUpdateComponent } from './organization-update/organization-update.component';
import { OrganizationDeleteDialogComponent } from './organization-delete/organization-delete-dialog.component';
import { OrganizationMemberListComponent } from './organization-details/organization-member/organization-member-list/organization-member-list.component';
// tslint:disable-next-line:max-line-length
import { OrganizationMemberSelectionDialogComponent } from './organization-details/organization-member/organization-member-selection-dialog/organization-member-selection-dialog.component';
// tslint:disable-next-line:max-line-length
import { OrganizationMemberSelectionListComponent } from './organization-details/organization-member/organization-member-selection-list/organization-member-selection-list.component';
import { OrganizationEMailComponent } from './organization-email/organization-email.component'

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// import needed PrimeNG modules here
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { RecaptchaModule } from 'ng-recaptcha';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
	imports: [
		CommonModule,
		OrganizationRoutingModule,
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
	// tslint:disable-next-line:max-line-length
	declarations: [
		OrganizationListComponent,
		OrganizationDetailsComponent,
		OrganizationDataComponent,
		OrganizationCreateComponent,
		OrganizationUpdateComponent,
		OrganizationDeleteDialogComponent,
		OrganizationMemberListComponent,
		OrganizationMemberSelectionDialogComponent,
		OrganizationMemberSelectionListComponent,
		OrganizationEMailComponent
	]
})
export class OrganizationsModule {


	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}
}
