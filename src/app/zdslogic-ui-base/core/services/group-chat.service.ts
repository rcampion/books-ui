import { Injectable } from '@angular/core';
import { SocketClientTwoService } from './socket-client-two.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AngularLogService } from '../../core/services/angular-log.service';
import { SocketClientElizaService } from './socket-client-eliza.service';

@Injectable({
	providedIn: 'root'
})
export class GroupChatService {

	constructor(

		private _socketClientTwoService: SocketClientTwoService,
		//	private _socketClientElizaService: SocketClientElizaService

	) {
	}

	//  static getPostListing(post: any): any {
	//    const postedAt = new Date(post['postedAt']);
	//    return {...post, postedAt};
	//  }

	save(post: any): void {
		return this._socketClientTwoService.send('/topic/group/chat/update', post);
	}
	/*
	  eliza(post: any) {
		return this._socketClientElizaService.send('/topic/chat/eliza', post);
	  }
	*/
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
		return this._socketClientTwoService.subscribe('/topic/group/chat/created', id);
	}

	onUpdate(id: string): Observable<any> {
		// return this._socketClient.onMessage(id, '/topic/contacts/update').pipe(map(post => ContactsPostService.getPostListing(post)));
		return this._socketClientTwoService.subscribe('/topic/group/chat/updated', id);
	}

	/*
	  onElizaUpdate(id: string): Observable<any> {
		// return this._socketClient.onMessage(id, '/topic/contacts/update').pipe(map(post => ContactsPostService.getPostListing(post)));
		return this._socketClientElizaService.subscribe('/topic/chat/eliza/updated', id );
	  }
	*/
	onDelete(id: string): Observable<any> {
		// return this._socketClient.onMessage(id, '/topic/contacts/deleted').pipe(map(post => post));
		return this._socketClientTwoService.subscribe('/topic/group/chat/deleted', id);
	}

}
