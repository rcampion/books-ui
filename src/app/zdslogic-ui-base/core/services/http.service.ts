import { Injectable } from '@angular/core';
//import { environment } from '../../../environments/environment';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  public static getBaseURL(): string {
    //return environment.production;
    // console.log(environment.production);
    // if (!environment.production) {
    //   return window.location.protocol + "//" + window.location.hostname + ":4200/api";
    // } else {
    //   return window.location.protocol + "//" + window.location.hostname + "/api";
    // }
    //return "http://localhost:8085/api";
    return environment.baseURL;
  }
}
