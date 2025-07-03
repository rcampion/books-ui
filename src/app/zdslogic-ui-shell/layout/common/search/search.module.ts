import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlockScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'app/zdslogic-ui-base/material/material.module';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { SearchComponent } from 'app/zdslogic-ui-shell/layout/common/search/search.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchBoxResultsComponent } from './search-results/search-results.component';

@NgModule({
	declarations: [
		SearchComponent,
		SearchBoxComponent,
		SearchBoxResultsComponent
	],
	imports: [
		RouterModule.forChild([]),
		MatAutocompleteModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		SharedModule,
		FontAwesomeModule,
		MaterialModule,
	],
	exports: [
		SearchComponent,
		SearchBoxComponent,
		SearchBoxResultsComponent
	],
	providers: [
		{
			provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
			useFactory: (overlay: Overlay) => (): BlockScrollStrategy => overlay.scrollStrategies.block(),
			deps: [Overlay]
		}
	]
})
export class SearchModule {

	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}
}
