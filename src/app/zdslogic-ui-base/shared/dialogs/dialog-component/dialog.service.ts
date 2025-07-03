import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//component we just created
import { DialogComponent } from './dialog.component';

@Injectable()

export class DialogService {

	constructor(private _dialog: MatDialog) { }

	open(data: any): any {

		return this._dialog.open(DialogComponent, {

			data: data

		});

	}
}
