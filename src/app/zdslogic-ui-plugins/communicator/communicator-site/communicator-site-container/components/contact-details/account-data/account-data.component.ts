import { Component, OnInit } from '@angular/core';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.css']
})
export class AccountDataComponent implements OnInit {

  constructor(private _angularLogService: AngularLogService,) { }

  ngOnInit(): void  {
  }

}
