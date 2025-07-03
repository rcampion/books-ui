import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiSecureService } from './api-secure.service';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { PaginationPropertySort } from '../interfaces/pagination';

import { BehaviorSubject } from 'rxjs';
import { AngularLogService } from '../../core/services/angular-log.service';

import { application } from '../../../../../application';
@Injectable({
	providedIn: 'root'
})
export class SystemService {

	constructor(
		private _http: HttpClient,
		private apiSecureService: ApiSecureService
	) {
	}

	get(path: any): Observable<any> {
		return this.apiSecureService.get(path)
			.pipe(
				map(result => result
				)
			);
	}
	
    public getData(route: string): any {
        return this._http.get(this.createCompleteRoute(route, environment.apiUrl), this.generateHeaders());
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
