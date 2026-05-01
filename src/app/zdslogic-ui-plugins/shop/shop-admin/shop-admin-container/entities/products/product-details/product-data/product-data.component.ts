import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

import { Product } from '../../../../../../core/interfaces/product.model';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-data',
	templateUrl: './product-data.component.html',
	styleUrls: ['./product-data.component.scss']
})
export class ProductDataComponent implements OnInit {
	@Input() public product: Product;
	public selectOptions = [{ name: 'Show', value: 'show' }, { name: `Don't Show`, value: '' }];
	@Output() selectEmitt = new EventEmitter();

	constructor(private _angularLogService: AngularLogService, private _location: Location) { }

	ngOnInit(): void {
	}

	public onChange = (event) => {
		this.selectEmitt.emit(event.value);
	}

	public onCancel(): void {
		this._location.back();
	}
}
