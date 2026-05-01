
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SkuMediaMap } from '../interfaces/sku-media-map.model';
import { ProductSkuMediaMapsService } from './product-sku-media-maps.service';

import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { environment } from '../../../../../environments/environment';
import { application } from '../../../../../../application';

export class ProductSkuMediaMapsDataSource implements DataSource<SkuMediaMap> {

	private skuMediaMapsSubject = new BehaviorSubject<SkuMediaMap[]>([]);

	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();

	public paginationPage: any;

	public total = 0;

	constructor(
		private service: ProductSkuMediaMapsService) {
	}

	loadSkus(
		id: number,
		filter: string,
		sortProperty: string,
		sortDirection: string,
		pageIndex: number,
		pageSize: number): any {

		this.loadingSubject.next(true);

		const sort = new PaginationPropertySort();
		sort.property = sortProperty;
		sort.direction = sortDirection;

		this.service.findProductSkuMediaMapsWithSortAndFilter(id, filter, sort,
			pageIndex, pageSize).pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe((response) => {
				this.skuMediaMapsSubject.next(response.content);
				this.total = response.totalElements;
			}
			);
	}

	connect(collectionViewer: CollectionViewer): Observable<SkuMediaMap[]> {
		////console.log('Connecting data source');
		return this.skuMediaMapsSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.skuMediaMapsSubject.complete();
		this.loadingSubject.complete();
	}

}

