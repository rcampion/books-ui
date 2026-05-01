import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';

import { PaginationPropertySort } from '../interfaces/pagination';

import { EMailJunkFile } from './../models/email-junk-file.model';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import * as FileSaver from 'file-saver';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

import { environment } from '../../../../../../../../../../environments/environment';
import { application } from '../../../../../../../../../../../application';

@Injectable({
	providedIn: 'root'
})
export class EMailJunkUserFilesService {

	private isUserAuthenticatedSubject = new ReplaySubject<boolean>(1);

	public isUserAuthenticated = this.isUserAuthenticatedSubject.asObservable();

	error: string;

	constructor(
		private _http: HttpClient,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router) { }

	public getData(route: string): any {
		return this._http.get(this.createCompleteRoute(route, environment.apiUrl), this.generateHeaders());
	}

	public create(route: string, body): any {
		return this._http.post(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
	}

	public update(route: string, body): any {
		return this._http.put(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
	}

	public delete(route: string): any {
		return this._http.delete(this.createCompleteRoute(route, environment.apiUrl), this.generateHeaders());
	}

	findFilesWithSortAndFilter(

		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {
		let apiUrl = this.createCompleteRoute('my-junk-emails', environment.apiUrl);
		const paramsx: any = { page: pageNumber, size: pageSize };
		if (sort != null) {
			paramsx.sort = sort.property + ',' + sort.direction;
		}
		// const sortTest = 'firstName' + '\&' + 'firstName.dir=desc';
		// const sortTestEncoded = encodeURIComponent(sortTest);
		let sortTest = sort.direction;
		if (sort.property !== '') {
			sortTest = sort.property + ',' + sort.direction;
		}
		let search: string;
		if (filter !== '') {
			apiUrl = this.createCompleteRoute('my-junk-emails/search', environment.apiUrl);

			const fromText = '\'*' + filter + '*\'';
			const subject = '\'*' + filter + '*\'';
			const message = '\'*' + filter + '*\'';

			search = '(fromText==' + fromText
				+ ' or '
				+ 'subject==' + subject
				+ ' or '
				+ 'message==' + message + ')';

		}
		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Access-Control-Allow-Origin': environment.originHeader,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),
			params: new HttpParams()

				.set('search', search)
				.set('sort', sortTest)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())

		}).pipe(
			map(result => result),
			catchError((error) => {
				this._errorHandlerService.handleError(error);
				return throwError(error.statusText);
			})

		);
	}


	findFilesWithSortAndTextFilter(

		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {
		let apiUrl = this.createCompleteRoute('my-files/search/text', environment.apiUrl);
		const paramsx: any = { page: pageNumber, size: pageSize };
		if (sort != null) {
			paramsx.sort = sort.property + ',' + sort.direction;
		}
		// const sortTest = 'firstName' + '\&' + 'firstName.dir=desc';
		// const sortTestEncoded = encodeURIComponent(sortTest);
		let sortTest = sort.direction;
		if (sort.property !== '') {
			sortTest = sort.property + ',' + sort.direction;
		}
		let search: string;
		if (filter !== '') {
			apiUrl = this.createCompleteRoute('my-files/search/text', environment.apiUrl);

			search = filter;
		}
		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Access-Control-Allow-Origin': environment.originHeader,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					//					'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),
			params: new HttpParams()

				.set('search', search)
				.set('sort', sortTest)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())

		}).pipe(
			map(result => result),
			catchError((error) => {
				this._errorHandlerService.handleError(error);
				return throwError(error.statusText);
			})

		);
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

	downloadTheExport(): any {
		this.downloadfile().subscribe((resp: any) => {

			/*
			const fileSaver: any = new FileSaver();
			fileSaver.responseData = resp.body;
			fileSaver.strFileName = 'testdata.xls';
			fileSaver.strMimeType = 'application/vnd.ms-excel;charset=utf-8';
			fileSaver.initSaveFile();
			*/
		});
	}

	downloadfile(): any {
		const formDataForExport: FormData = new FormData();
		formDataForExport.append('export', 'ALL');

		return this._http.post('http://localhost:8080/service/exportExcel.php', formDataForExport, {
			headers: { 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' },
			responseType: 'blob',
			observe: 'response'
		});
	}

	getFile(id: string): any {

		const route = `my-junk-emails/download/${id}`;

		const apiURL = this.createCompleteRoute(route, environment.apiUrl)

		const _httpOptions = {
			responseType: 'blob' as 'json',
			headers: new HttpHeaders({
				'apikey': application.apiKey,
				'Access-Control-Allow-Origin': environment.originHeader,
				'Authorization': 'Bearer ' + Cookie.get('access_token')
			})
		};

		return this._http.get(apiURL, _httpOptions);
	}
}
