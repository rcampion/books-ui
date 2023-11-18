import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

import { Author } from '../../../../../../core/models/author.model';
import { AngularLogService } from '../../../../../../../../zdslogic-base/core/services/angular-log.service';

@Component({
  selector: 'app-author-data',
  templateUrl: './author-data.component.html',
  styleUrls: ['./author-data.component.scss']
})
export class AuthorDataComponent implements OnInit {
  @Input() public author: Author;
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
