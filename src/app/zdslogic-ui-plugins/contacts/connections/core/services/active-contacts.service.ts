import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Contact } from '../../../core/interfaces/contact.model';
import { SocketClientFourService } from './socket-client-four.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveContactsService {

  constructor(private _socketClient: SocketClientFourService) {
  }

  //  static getPostListing(post: any): any {
  //    const postedAt = new Date(post['postedAt']);
  //    return {...post, postedAt};
  //  }

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
