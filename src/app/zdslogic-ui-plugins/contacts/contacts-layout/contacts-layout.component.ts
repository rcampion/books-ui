import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts-layout',
  templateUrl: './contacts-layout.component.html',
  styleUrls: ['./contacts-layout.component.scss']
})
export class ContactsLayoutComponent implements OnInit {
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  title: string;

  constructor(private _route: ActivatedRoute){

  }

  ngOnInit(): void{
    this._route.firstChild.data.subscribe((data) => {
      this.title = data.title;
    });
  }
}
