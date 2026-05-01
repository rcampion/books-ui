import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Organization } from '../../../core/interfaces/organization.model';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
  selector: 'app-organization-data',
  templateUrl: './organization-data.component.html',
  styleUrls: ['./organization-data.component.scss']
})
export class OrganizationDataComponent implements OnInit {
  @Input() public organization: Organization;
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
