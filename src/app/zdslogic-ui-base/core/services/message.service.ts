import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppMessage } from '../models/appmessage.model';
import { AppMessageService } from './appmessage.service';

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	constructor(
		private _appMessageService: AppMessageService
	) { }

	private subject = new Subject<any>();

	messages: string[] = [];

	add(appMessage: AppMessage): void {

		const message = 'Contact: ' + appMessage.message
			+ ' PeerId: ' + appMessage.data
			+ ' Join: ' + appMessage.flag;
		this.messages.push(message);
		this.subject.next({ text: message });
	}

	send(message: AppMessage): any {
		const apiUrl = 'app/message';

		//const model = new AppMessage();

		//model.message = message;

		const json = JSON.stringify(message);

		//console.log(json);
		this._appMessageService.create(apiUrl, json)
			.subscribe((result) => {
				//console.log('message upload completed');
			});
	}

	clear(): void {
		this.messages = [];
		this.subject.next('');

	}

	getMessage(): Observable<any> {
		return this.subject.asObservable();
	}
}
