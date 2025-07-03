import { Injectable } from '@angular/core';
import { SocketClientEightService } from './socket-client-eight.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AngularLogService } from '../../core/services/angular-log.service';

@Injectable({
	providedIn: 'root'
})
export class WebSocketAppLogsService {

	constructor(
		private _socketClient: SocketClientEightService) {
	}

	//  static getPostListing(post: any): any {
	//    const postedAt = new Date(post['postedAt']);
	//    return {...post, postedAt};
	//  }

	save(post: any): any {
		return this._socketClient.send('/topic/app/logs/create', post);
	}

	update(post: any): any {
		return this._socketClient.send('/topic/app/logs/update', post);
	}

	delete(post: string): any {
		return this._socketClient.send('/topic/app/logs/delete', post);
	}

	onSave(id: string): Observable<any> {
		return this._socketClient.subscribe('/topic/app/logs/created', id);
	}

	onUpdate(id: string): Observable<any> {
		return this._socketClient.subscribe('/topic/app/logs/updated', id);
	}

	onDelete(id: string): Observable<any> {
		return this._socketClient.subscribe('/topic/app/logs/deleted', id);
	}

}
