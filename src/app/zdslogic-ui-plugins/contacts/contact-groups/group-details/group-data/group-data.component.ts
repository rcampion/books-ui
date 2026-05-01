import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Group } from '../../../core/interfaces/group.model';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
  selector: 'app-group-data',
  templateUrl: './group-data.component.html',
  styleUrls: ['./group-data.component.scss']
})
export class GroupDataComponent implements OnInit {
  @Input() public group: Group;
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
