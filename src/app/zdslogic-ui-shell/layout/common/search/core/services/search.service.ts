
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ApiService } from 'app/zdslogic-ui-base/core/services/api.service';
import { JwtService } from 'app/zdslogic-ui-base/core/services/jwt.service';
//import { WikiTopicListConfig } from '../models/topic-list-config.model';
import { SearchData } from '../models/search.model';
import { environment } from '../../../../../../../environments/environment';
import { PaginationPropertySort } from '../interfaces/pagination';

import { BehaviorSubject } from 'rxjs';
//import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

//import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Injectable({
	providedIn: 'root'
})
export class SearchDataService {

	search = new BehaviorSubject<SearchData[]>([]);

	constructor(
		private _http: HttpClient,
		private _apiService: ApiService,
		//		private _errorHandlerService: ErrorHandlerService
	) {
	}

	getSearchData(): Observable<SearchData[]> {
		//return of(this.search);
		return this.search;
	}

	get(id): Observable<SearchData> {
		return this._apiService.get('/search/' + id)
			.pipe(map(data => data));
	}

	destroy(id): any {
		return this._apiService.delete('/search/' + id);
	}

	save(topic): Observable<SearchData> {
		// If we're updating an existing topic
		if (topic.id) {
			const jsonString = JSON.stringify(topic);
			return this._apiService.post('/search/' + topic.id, jsonString)
				.pipe(map(data => data));

			// Otherwise, create a new topic
		} else {
			return this._apiService.post('/search', topic)
				.pipe(map(data => data));
		}
	}

	favorite(id): Observable<SearchData> {
		return this._apiService.post('/search/' + id + '/favorite');
	}

	unfavorite(id): Observable<SearchData> {
		return this._apiService.delete('/search/' + id + '/favorite');
	}

	deleteTag(tag, id): Observable<SearchData> {
		if (tag !== '') {
			return this._apiService.delete('/tags/' + tag + '/' + id);
		} else {
			return this._apiService.delete('/tags/' + id);
		}
	}

	findSearchDataWithSortAndFilter(

		filter = '',
		sort: PaginationPropertySort,
		pageNumber = 0,
		pageSize = 3): Observable<any> {
		let apiUrl = '';

		apiUrl = this.createCompleteRoute('search', environment.apiUrl);

		const paramsx: any = { page: pageNumber, size: pageSize };
		if (sort != null) {
			paramsx.sort = sort.property + ',' + sort.direction;
		}

		let sortTest = sort.direction;
		if (sort.property !== '') {
			sortTest = sort.property + ',' + sort.direction;
		}

		let search: string;
		if (filter !== '') {
			apiUrl = this.createCompleteRoute('search', environment.apiUrl);

			const title = '\'*' + filter + '*\'';
			const description = '\'*' + filter + '*\'';
			const body = '\'*' + filter + '*\'';

			search = 'title==' + title + ' or ' + 'description==' + description + ' or ' + 'body==' + body;
		}

		const paramsy = {};

		let params = new HttpParams({ fromObject: paramsy });

		params = params.set('search', search);
		params = params.set('sort', sortTest);
		params = params.set('page', pageNumber.toString());
		params = params.set('size', pageSize.toString());

		let headers = new HttpHeaders();

		headers = headers.append('apikey', '001001');
		headers = headers.append('Content-Type', 'application/json');
		headers = headers.append('Accept', 'application/json',);
		headers = headers.append('Access-Control-Allow-Credentials', 'true');
		headers = headers.append('Access-Control-Allow-Origin', environment.originHeader);

		return this._http.get(apiUrl, {
			headers,
			params
		})
			.pipe(
				map(res => res),
				tap(data => { this.search.next(data['content']) }),
				//				catchError((error) => { this._errorHandlerService.handleError(error); return throwError(error.statusText); })
			);
	}

	setSearchData(arg0: any): any {
		this.search = arg0;
	}

	private createCompleteRoute(route: string, envAddress: string): any {
		return `${envAddress}/${route}`;
	}
}
