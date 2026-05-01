import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ChatChannel } from 'app/zdslogic-ui-base/app/core/models/chat-channel.model';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-chat-channel-data',
	templateUrl: './chat-channel-data.component.html',
	styleUrls: ['./chat-channel-data.component.scss']
})
export class ChatChannelDataComponent implements OnInit {
	@Input() public chatChannel: ChatChannel;
	public selectOptions = [{ name: 'Show', value: 'show' }, { name: `Don't Show`, value: '' }];
	@Output() selectEmitt = new EventEmitter();

	constructor(
		private _angularLogService: AngularLogService,
		private _location: Location) {

	}

	ngOnInit(): void {
	}

	public onChange(event): any {
		this.selectEmitt.emit(event.value);
	}

	public onCancel(): void {
		this._location.back();
	}
}
