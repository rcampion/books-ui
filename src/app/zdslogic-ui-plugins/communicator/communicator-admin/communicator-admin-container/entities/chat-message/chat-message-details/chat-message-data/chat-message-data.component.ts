import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ChatMessageService } from 'app/zdslogic-ui-base/app/core/services/chat-message.service';
import { ChatMessage } from 'app/zdslogic-ui-base/app/core/models/chat-message.model';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
  selector: 'app-chat-message-data',
  templateUrl: './chat-message-data.component.html',
  styleUrls: ['./chat-message-data.component.scss']
})
export class ChatMessageDataComponent implements OnInit {
  @Input() public chatMessage: ChatMessage;
  public selectOptions = [{name: 'Show', value: 'show'}, {name: `Don't Show`, value: ''}];
  @Output() selectEmitt = new EventEmitter();

  constructor(private _angularLogService: AngularLogService, private _location: Location) { }

  ngOnInit(): void  {
  }

  public onChange(event): any {
    this.selectEmitt.emit(event.value);
  }

  public onCancel(): void {
    this._location.back();
  }
}
