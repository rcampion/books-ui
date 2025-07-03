
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription.model';
import { SubscriptionsService } from './subscriptions.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { AngularLogService } from './angular-log.service';

export class SubscriptionsDataSource implements DataSource<Subscription> {

    private subscriptionsSubject = new BehaviorSubject<Subscription[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public paginationPage: any;

    public total = 0;

    constructor(private _subscriptionsService: SubscriptionsService) {

    }

    loadSubscriptions(
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number): any {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this._subscriptionsService.findSubscriptionsWithSortAndFilter(filter, sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response) => {
                this.subscriptionsSubject.next(response.content);
                this.total = response.totalElements;
            }
            );
    }

    connect(collectionViewer: CollectionViewer): Observable<Subscription[]> {
        ////console.log('Connecting data source');
        return this.subscriptionsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subscriptionsSubject.complete();
        this.loadingSubject.complete();
    }

}

