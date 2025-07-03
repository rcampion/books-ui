
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { AddressStatus } from '../models/address-status.model';
import { AddressStatusService } from './address-status.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export class AddressStatusDataSource implements DataSource<AddressStatus> {

	private addressesSubject = new BehaviorSubject<AddressStatus[]>([]);

	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();

	public paginationPage: any;

	public total = 0;

	constructor(
		private _booksService: AddressStatusService) {
	}

	loadAddressStatuss(
		filter: string,
		sortProperty: string,
		sortDirection: string,
		pageIndex: number,
		pageSize: number): any {

		this.loadingSubject.next(true);

		const sort = new PaginationPropertySort();
		sort.property = sortProperty;
		sort.direction = sortDirection;

		this._booksService.findAddressStatusesWithSortAndFilter(filter, sort,
			pageIndex, pageSize).pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe((response) => {
				this.addressesSubject.next(response.content);
				this.total = response.totalElements;
			}
			);
	}

	connect(collectionViewer: CollectionViewer): Observable<AddressStatus[]> {
		//console.log('Connecting data source');
		return this.addressesSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.addressesSubject.complete();
		this.loadingSubject.complete();
	}

}

