import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

import { AddressStatus } from '../../../../../../core/models/address-status.model';
import { AngularLogService } from '../../../../../../../../zdslogic-base/core/services/angular-log.service';

@Component({
  selector: 'app-address-status-data',
  templateUrl: './address-status-data.component.html',
  styleUrls: ['./address-status-data.component.scss']
})
export class AddressStatusDataComponent implements OnInit {
  @Input() public addressStatus: AddressStatus;
  public selectOptions = [{name: 'Show', value: 'show'}, {name: 'Do not Show', value: ''}];
  @Output() selectEmitt = new EventEmitter();

  constructor(private _angularLogService: AngularLogService, private _location: Location) { }

  ngOnInit(): void {
  }

  public onChange(event): void {
    this.selectEmitt.emit(event.value);
  }

  public onCancel(): void {
    this._location.back();
  }
}
