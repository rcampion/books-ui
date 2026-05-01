import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

import { environment } from '../../../../../../../../../../environments/environment';
import { application } from '../../../../../../../../../../../application';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  //SERVER_URL: string = '{Server URL}';

  constructor(private _httpClient: HttpClient) { }

  public upload(formData): any {
    const apiUrl = 'files/uploadFile';
    const headers = new HttpHeaders(
      {
        //'Content-Type': 'multipart/form-data',
        //'Accept': 'application/json'
        'apikey': application.apiKey,
        'Access-Control-Allow-Origin': environment.originHeader,
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': 'Bearer ' + Cookie.get('access_token')
      }
    );
    return this._httpClient.post<any>(this.createCompleteRoute(apiUrl, environment.apiUrl), formData, {
      headers: headers,

      reportProgress: true,

      observe: 'events'

    });
  }

  public create(route: string, body): any {
    return this._httpClient.post(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
  }
  private createCompleteRoute(route: string, envAddress: string): any {
    return `${envAddress}/${route}`;
  }

  private generateHeaders(): any {
    return {

      headers: new HttpHeaders(
        {
			'apikey': application.apiKey,
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': environment.originHeader,
			'Authorization': 'Bearer ' + Cookie.get('access_token')
        })
    };
  }
}
