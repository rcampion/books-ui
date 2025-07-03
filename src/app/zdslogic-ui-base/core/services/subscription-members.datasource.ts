
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SubscriptionMember } from '../models/subscription-member.model';
import { SubscriptionsService } from './subscriptions.service';

import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';

import { AngularLogService } from './angular-log.service';

export class SubscriptionMembersDataSource implements DataSource<SubscriptionMember> {

    private contactsSubject = new BehaviorSubject<SubscriptionMember[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public paginationPage: any;

    public total = 0;

    constructor(
		private _subscriptionsService: SubscriptionsService) {

    }

    loadSubscriptionMembers(
        subscriptionId: number,
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number): any {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this._subscriptionsService.findSubscriptionMembersWithSortAndFilter(subscriptionId, filter, sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response) => {
                this.contactsSubject.next(response.content);
                this.total = response.totalElements;
            }
            );
    }

    connect(collectionViewer: CollectionViewer): Observable<SubscriptionMember[]> {
        ////console.log('Connecting data source');
        return this.contactsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.contactsSubject.complete();
        this.loadingSubject.complete();
    }

}

