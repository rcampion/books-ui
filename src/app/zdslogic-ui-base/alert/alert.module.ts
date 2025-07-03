import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';

@NgModule({
	imports: [
		CommonModule
	],
	/**
	 * Components / Directives/ Pipes
	 */
	declarations: [
		AlertComponent
	],
	exports: [
		AlertComponent
	]
})
export class AlertModule { }
