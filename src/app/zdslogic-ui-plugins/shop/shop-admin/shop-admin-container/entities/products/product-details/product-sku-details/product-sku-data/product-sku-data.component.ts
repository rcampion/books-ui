import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
import { Location } from '@angular/common';

import { Sku } from '../../../../../../../core/interfaces/sku.model';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
  selector: 'app-product-sku-data',
  templateUrl: './product-sku-data.component.html',
  styleUrls: ['./product-sku-data.component.scss']
})
export class ProductSkuDataComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() public sku: Sku;
  public selectOptions = [{name: 'Show', value: 'show'}, {name: `Don't Show`, value: ''}];
  @Output() selectEmitt = new EventEmitter();

hasAddl:boolean = false;
  constructor(private _angularLogService: AngularLogService, private _location: Location) { }

ngOnChanges(changes: SimpleChanges) {
	/*
    console.log(changes);
	  if(this.sku.defaultProductId != null){
		  this.hasAddl=true;
	  } else {
		this.hasAddl=false;  
	  }
	  */
}

  ngOnInit(): void  {
  }

  ngAfterViewInit() {

  }
  
  public onChange = (event) => {
    this.selectEmitt.emit(event.value);
  }

  public onCancel(): void {
    this._location.back();
  }
  
public	hasAddlSkus(){	
		return this.hasAddl;
	}
}
