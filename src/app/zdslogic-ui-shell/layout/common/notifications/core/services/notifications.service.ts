import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { map, Observable, ReplaySubject, switchMap, take, tap } from 'rxjs';
import { Subject, takeUntil } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { catchError } from 'rxjs/operators';

import { Notification } from 'app/zdslogic-ui-shell/layout/common/notifications/core/interfaces/notifications.types';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

import { environment } from '../../../../../../../environments/environment';
import { application } from '../../../../../../../../application';

@Injectable({
	providedIn: 'root'
})
export class NotificationsService {

	private unsubscribeAll: Subject<any> = new Subject<any>();

	private notifications: ReplaySubject<Notification[]> = new ReplaySubject<Notification[]>(1);

	/**
	 * Constructor
	 */
	constructor(
		private _http: HttpClient,
		private _errorHandlerService: ErrorHandlerService) { }

	// -----------------------------------------------------------------------------------------------------
	// @ Accessors
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Getter for notifications
	 */
	get notifications$(): Observable<Notification[]> {
		//return this._notifications.asObservable();

		const apiUrl = 'notification';

		this.getData(apiUrl)
			.subscribe((res) => {
				this.notifications.next(res.content);

			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});

		return this.notifications.asObservable();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------
	public refresh(): void {
		this.notifications$.pipe(takeUntil(this.unsubscribeAll))
			.subscribe((notifications: Notification[]) => {

				// Load the notifications
				//this._notificationServices = notifications;

				// Calculate the unread count
				//this._calculateUnreadCount();

				// Mark for check
				//this._changeDetectorRef.markForCheck();
			});
	}

	public getData(route: string): any {
		return this._http.get(this.createCompleteRoute(route, environment.apiUrl), this.generateHeaders());
	}

	public create(route: string, body): any {
		return this._http.post(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeadersNoToken());
	}

	public send(route: string, body): any {
		return this._http.post(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
	}

	public update(route: string, body): any {
		return this._http.put(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
	}

	public delete(route: string): any {
		return this._http.delete(this.createCompleteRoute(route, environment.apiUrl), this.generateHeaders());
	}

	findNotificationsWithSortAndFilter(

		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {
		let apiUrl = this.createCompleteRoute('apikey', environment.apiUrl);
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
			apiUrl = this.createCompleteRoute('apikey/search', environment.apiUrl);

			const description = '\'*' + filter + '*\'';

			//search = 'apikeyName==*' + filter + '* or ' + 'apikeyDescription==*' + filter + '*';
			//search = 'apikeyDescription==' + filter + '*';
			search = 'description==' + description;

		}
		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Access-Control-Allow-Origin': environment.originHeader,
					'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),
			params: new HttpParams()
				.set('search', search)
				.set('sort', sortTest)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())

		}).pipe(
			// map(res => res['content']
			map(res => res),
			catchError((error) => { this._errorHandlerService.handleError(error); return throwError(error.statusText); })
		);
	}
	
	/**
	 * Mark all notifications as read
	 */
	markAllAsRead(): Observable<any> {
		return this.notifications$.pipe(
			take(1),
			switchMap(notifications =>
				//				this._http.get<boolean>('api/notifications/mark-all-as-read').pipe(
				this.getData('api/notifications/mark-all-as-read').pipe(

					map((isUpdated: boolean) => {

						// Go through all notifications and set them as read
						notifications.forEach((notification, index) => {
							notifications[index].readFlag = true;
						});

						// Update the notifications
						this.notifications.next(notifications);

						// Return the updated status
						return isUpdated;
					})
				)

			)
		);
	}

	private createCompleteRoute(route: string, envAddress: string): any {
		return `${envAddress}/${route}`;
	}

	private generateHeaders(): any {

		const headers = new HttpHeaders(
			{
				'apikey': application.apiKey,
				'Access-Control-Allow-Origin': environment.originHeader,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'Authorization': 'Bearer ' + Cookie.get('access_token')

			}
		);

		return {

			headers: headers

		};
	}

	private generateHeadersNoToken(): any {
		return {

			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': environment.originHeader,
				})
		};
	}
}
