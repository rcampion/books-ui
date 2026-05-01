import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

import { ProductBundle } from '../../../../../../../core/interfaces/product-bundle.model';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-product-bundle-data',
	templateUrl: './product-bundle-data.component.html',
	styleUrls: ['./product-bundle-data.component.scss']
})
export class ProductBundleDataComponent implements OnInit {
	@Input() public productBundle: ProductBundle;
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
