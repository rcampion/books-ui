import { NgModule } from '@angular/core';
import { PopupComponent } from './popup/popup.component';

@NgModule({
	bootstrap: [],
	/**
		* Components / Directives/ Pipes
		*/
	declarations: [
		PopupComponent
	],
	exports: [
		PopupComponent
	],
})
export class UtilsModule { }
