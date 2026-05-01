import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'app/zdslogic-ui-base/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { GroupListComponent } from './group-list/group-list.component';
import { GroupRoutingModule } from './group-routing/group-routing.module';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupDataComponent } from './group-details/group-data/group-data.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/zdslogic-ui-base/shared/shared.module';
import { GroupUpdateComponent } from './group-update/group-update.component';
import { GroupDeleteDialogComponent } from './group-delete/group-delete-dialog.component';
import { GroupMemberListComponent } from './group-details/group-member/group-member-list/group-member-list.component';
// tslint:disable-next-line:max-line-length
import { GroupMemberSelectionDialogComponent } from './group-details/group-member/group-member-selection-dialog/group-member-selection-dialog.component';
// tslint:disable-next-line:max-line-length
import { GroupMemberSelectionListComponent } from './group-details/group-member/group-member-selection-list/group-member-selection-list.component';
import { GroupEMailComponent } from './group-email/group-email.component'

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// import needed PrimeNG modules here
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { RecaptchaModule } from 'ng-recaptcha';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { GroupsService } from '../core/services/groups.service';

@NgModule({
	imports: [
		CommonModule,
		GroupRoutingModule,
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
	/**
	* Components / Directives/ Pipes
	*/
	declarations: [
		GroupListComponent,
		GroupDetailsComponent,
		GroupDataComponent,
		GroupCreateComponent,
		GroupUpdateComponent,
		GroupDeleteDialogComponent,
		GroupMemberListComponent,
		GroupMemberSelectionDialogComponent,
		GroupMemberSelectionListComponent,
		GroupEMailComponent
	]
})
export class GroupsModule {


	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}
}
