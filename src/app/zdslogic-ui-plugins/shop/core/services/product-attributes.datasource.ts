
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ProductAttribute } from '../interfaces/product-attribute.model';
import { ProductAttributesService } from './product-attributes.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { environment } from '../../../../../environments/environment';
import { application } from '../../../../../../application';

export class ProductAttributesDataSource implements DataSource<ProductAttribute> {

    private productAttributesSubject = new BehaviorSubject<ProductAttribute[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public paginationPage: any;

    public total = 0;

    constructor(private productAttributesService: ProductAttributesService) {

    }

    loadProductAttributes(
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

        this.productAttributesService.findProductAttributesWithSortAndFilter(
			id, filter, sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response) => {
                this.productAttributesSubject.next(response.content);
                this.total = response.totalElements;
            }
            );
    }

    connect(collectionViewer: CollectionViewer): Observable<ProductAttribute[]> {
        ////console.log('Connecting data source');
        return this.productAttributesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.productAttributesSubject.complete();
        this.loadingSubject.complete();
    }

}

