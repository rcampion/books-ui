import { Injectable } from '@angular/core';
import { SocketClientFiveService } from './socket-client-five.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Contact } from '../interfaces/contact.model';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsPostService {

  constructor(private _socketClient: SocketClientFiveService) {
  }

//  static getPostListing(post: any): any {
//    const postedAt = new Date(post['postedAt']);
//    return {...post, postedAt};
//  }

  save(post: any) {
    return this._socketClient.send('/topic/contacts/create', post);
  }

  update(post: any) {
    return this._socketClient.send('/topic/contacts/update', post);
  }

  delete(post: string) {
    return this._socketClient.send('/topic/contacts/delete', post);
  }

  onSave(id: string): Observable<any> {
    // return this._socketClient.onMessage(id, '/topic/contacts/created').pipe(map(post => ContactsPostService.getPostListing(post)));
    return this._socketClient.subscribe('/topic/contacts/created', id );
  }

  onUpdate(id: string): Observable<any> {
    // return this._socketClient.onMessage(id, '/topic/contacts/update').pipe(map(post => ContactsPostService.getPostListing(post)));
    return this._socketClient.subscribe('/topic/contacts/updated', id );
  }

  onDelete(id: string): Observable<any> {
    // return this._socketClient.onMessage(id, '/topic/contacts/deleted').pipe(map(post => post));
    return this._socketClient.subscribe('/topic/contacts/deleted', id );
  }

}
