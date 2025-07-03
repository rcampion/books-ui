import { Injectable } from '@angular/core';
import { SocketClientMessageService } from './socket-client-message.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AngularLogService } from '../../core/services/angular-log.service';

@Injectable({
	providedIn: 'root'
})
export class WebSocketMessageService {

	constructor(
		private _socketClient: SocketClientMessageService) {
	}

	//  static getPostListing(post: any): any {
	//    const postedAt = new Date(post['postedAt']);
	//    return {...post, postedAt};
	//  }

	save(post: any): any {
		return this._socketClient.send('/topic/app/message/create', post);
	}

	update(post: any): any {
		return this._socketClient.send('/topic/app/message/update', post);
	}

	delete(post: string): any {
		return this._socketClient.send('/topic/app/message/delete', post);
	}

	onSave(id: string): Observable<any> {
		return this._socketClient.subscribe('/topic/app/message/created', id);
	}

	onUpdate(id: string): Observable<any> {
		return this._socketClient.subscribe('/topic/app/message/updated', id);
	}

	onDelete(id: string): Observable<any> {
		return this._socketClient.subscribe('/topic/app/message/deleted', id);
	}

}
