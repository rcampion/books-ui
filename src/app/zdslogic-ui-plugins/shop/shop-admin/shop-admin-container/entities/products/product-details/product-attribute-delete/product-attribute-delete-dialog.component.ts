import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { ProductAttributesService } from '../../../../../../core/services/product-attributes.service';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-attribute-delete-dialog',
	templateUrl: './product-attribute-delete-dialog.component.html',
	styleUrls: ['./product-attribute-delete-dialog.component.scss']
})
export class ProductAttributeDeleteDialogComponent implements OnInit {
	id: string;
	constructor(
		private _angularLogService: AngularLogService,
		private _repository: ProductAttributesService,
		private _errorHandlerService: ErrorHandlerService,
		private _dialogRef: MatDialogRef<ProductAttributeDeleteDialogComponent>,
		private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

		this.id = data.id;
	}

	ngOnInit(): void {
	}

	public delete() {
		const apiUrl = `productAttribute/${this.id}`;
		this._repository.delete(apiUrl)
			.subscribe((result) => {
				this.id = result as string;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
		this._dialogRef.close();

	}

}
