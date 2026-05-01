import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

import { ProductAttribute } from '../../../../../../../core/interfaces/product-attribute.model';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-attribute-data',
	templateUrl: './product-attribute-data.component.html',
	styleUrls: ['./product-attribute-data.component.scss']
})
export class ProductAttributeDataComponent implements OnInit {
	@Input() public productAttribute: ProductAttribute;
	public selectOptions = [{ name: 'Show', value: 'show' }, { name: `Don't Show`, value: '' }];
	@Output() selectEmitt = new EventEmitter();

	constructor(
		private _angularLogService: AngularLogService,
		private _location: Location) { }

	ngOnInit(): void {
	}

	public onChange = (event) => {
		this.selectEmitt.emit(event.value);
	}

	public onCancel(): void {
		this._location.back();
	}
}
