import { Injectable } from '@angular/core';
import { SocketClientTwoService } from './socket-client-two.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AngularLogService } from '../../core/services/angular-log.service';
import { SocketClientElizaService } from './socket-client-eliza.service';

@Injectable({
	providedIn: 'root'
})
export class ElizaChatService {

	constructor(
		private _socketClientElizaService: SocketClientElizaService
	) {
	}

	//  static getPostListing(post: any): any {
	//    const postedAt = new Date(post['postedAt']);
	//    return {...post, postedAt};
	//  }

	save(post: any): any {
		return this._socketClientElizaService.send('/topic/eliza/chat/update', post);
	}

	/*
	  update(post: any) {
		return this._socketClient.send('/topic/user/update', post);
	  }

	  delete(post: string) {
		return this._socketClient.send('/topic/user/delete', post);
	  }
	*/
	onSave(id: string): Observable<any> {
		// return this._socketClient.onMessage(id, '/topic/contacts/created').pipe(map(post => ContactsPostService.getPostListing(post)));
		return this._socketClientElizaService.subscribe('/topic/eliza/chat/created', id);
	}

	onUpdate(id: string): Observable<any> {
		// return this._socketClient.onMessage(id, '/topic/contacts/update').pipe(map(post => ContactsPostService.getPostListing(post)));
		return this._socketClientElizaService.subscribe('/topic/eliza/chat/updated', id);
	}

	onDelete(id: string): Observable<any> {
		// return this._socketClient.onMessage(id, '/topic/contacts/deleted').pipe(map(post => post));
		return this._socketClientElizaService.subscribe('/topic/eliza/chat/deleted', id);
	}

}
