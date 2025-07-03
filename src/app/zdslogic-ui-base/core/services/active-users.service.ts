import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { SocketClientThreeService } from './socket-client-three.service';
import { AngularLogService } from '../../core/services/angular-log.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveUsersService {

  constructor(
	  private _socketClient: SocketClientThreeService) {
  }

  save(post: any): any {
    return this._socketClient.send('/topic/user/login', post);
  }

  update(post: any): any {
    return this._socketClient.send('/topic/user/update', post);
  }

  delete(post: string): any {
    return this._socketClient.send('/topic/user/delete', post);
  }

  onSave(id: string): Observable<any> {
    // return this._socketClient.onMessage(id, '/topic/contacts/created').pipe(map(post => ContactsPostService.getPostListing(post)));
    return this._socketClient.subscribe('/topic/user/created', id);
  }

  onUpdate(id: string): Observable<any> {
    // return this._socketClient.onMessage(id, '/topic/contacts/update').pipe(map(post => ContactsPostService.getPostListing(post)));
    return this._socketClient.subscribe('/topic/user/auth', id);
  }

  onDelete(id: string): Observable<any> {
    // return this._socketClient.onMessage(id, '/topic/contacts/deleted').pipe(map(post => post));
    return this._socketClient.subscribe('/topic/user/deleted', id);
  }

}
