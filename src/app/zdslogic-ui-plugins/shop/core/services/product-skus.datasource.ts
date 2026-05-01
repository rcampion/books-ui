
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';


import { Sku } from '../interfaces/sku.model';
import { ProductSkusService } from './product-skus.service';

import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { environment } from '../../../../../environments/environment';
import { application } from '../../../../../../application';

export class ProductSkusDataSource implements DataSource<Sku> {

    public skusSubject = new BehaviorSubject<Sku[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public paginationPage: any;

    public total = 0;

    constructor(
	private skusService: ProductSkusService) {
    }

    loadProductSkusByDefaultProductId(
		id:string,
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number): any {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this.skusService.findProductSkusByDefaultProductIdWithSortAndFilter(
			id, filter, sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response) => {
                this.skusSubject.next(response.content);
                this.total = response.totalElements;
            }
            );
    }

    loadProductSkusByAddlProductId(
		id:string,
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number): any {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this.skusService.findProductSkusByAddlProductIdWithSortAndFilter(
			id, filter, sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response) => {
                this.skusSubject.next(response.content);
                this.total = response.totalElements;
            }
            );
    }
    
    connect(collectionViewer: CollectionViewer): Observable<Sku[]> {
        ////console.log('Connecting data source');
        return this.skusSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.skusSubject.complete();
        this.loadingSubject.complete();
    }

}

