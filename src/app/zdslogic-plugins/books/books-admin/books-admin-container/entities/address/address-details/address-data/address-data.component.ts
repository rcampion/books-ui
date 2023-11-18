import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Address } from '../../../../../../core/models/address.model';
import { AngularLogService } from '../../../../../../../../zdslogic-base/core/services/angular-log.service';

@Component({
  selector: 'app-address-data',
  templateUrl: './address-data.component.html',
  styleUrls: ['./address-data.component.scss']
})
export class AddressDataComponent implements OnInit {
  @Input() public address: Address;
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
