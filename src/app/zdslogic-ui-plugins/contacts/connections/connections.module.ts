import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/zdslogic-ui-base/shared/shared.module';

import { MaterialModule } from 'app/zdslogic-ui-base/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// import needed PrimeNG modules here
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { RecaptchaModule } from 'ng-recaptcha';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

//import { ConnectionDeleteDialogComponent } from './connection-delete/connection-delete-dialog.component';
import { ConnectionsListComponent } from './connections-list/connections-list.component';
import { ConnectionsListSmallComponent } from './connections-list-small/connections-list-small.component';
// tslint:disable-next-line:max-line-length
import { ConnectionsSelectionDialogComponent } from './connections-selection-dialog/connections-selection-dialog.component';
import { ConnectionsSelectionListComponent } from './connections-selection-list/connections-selection-list.component';
import { ConnectionsRoutingModule } from './connections-routing/connections-routing.module';

@NgModule({
	imports: [
		CommonModule,
		ConnectionsRoutingModule,
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
		MaterialModule,
		MatDialogModule,
		MatInputModule,
		MatFormFieldModule,
		ConnectionDeleteDialogComponent,
		ConnectionsListSmallComponent
	],
	declarations: [
		//ConnectionDeleteDialogComponent,
		ConnectionsListComponent,
		ConnectionsListSmallComponent,
		ConnectionsSelectionDialogComponent,
		ConnectionsSelectionListComponent,

	]
})
export class ConnectionsModule {

	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}

}
