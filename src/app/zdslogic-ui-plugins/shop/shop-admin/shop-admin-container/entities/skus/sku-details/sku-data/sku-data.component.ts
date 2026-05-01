import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

import { Sku } from '../../../../../../core/interfaces/sku.model';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
  selector: 'app-sku-data',
  templateUrl: './sku-data.component.html',
  styleUrls: ['./sku-data.component.scss']
})
export class SkuDataComponent implements OnInit {
  @Input() public sku: Sku;
  public selectOptions = [{name: 'Show', value: 'show'}, {name: `Don't Show`, value: ''}];
  @Output() selectEmitt = new EventEmitter();

  constructor(private _angularLogService: AngularLogService, private _location: Location) { }

  ngOnInit(): void  {
  }

  public onChange = (event) => {
    this.selectEmitt.emit(event.value);
  }

  public onCancel(): void {
    this._location.back();
  }
}
