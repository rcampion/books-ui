
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { OrganizationMember } from '../interfaces/organization-member.model';
import { OrganizationsService } from './organizations.service';

import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export class OrganizationMembersDataSource implements DataSource<OrganizationMember> {

    private contactsSubject = new BehaviorSubject<OrganizationMember[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public paginationPage: any;

    public total = 0;

    constructor(private organizationsService: OrganizationsService) {

    }

    loadOrganizationMembers(
        organizationId: number,
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number): any {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this.organizationsService.findOrganizationMembersWithSortAndFilter(organizationId, filter, sort,
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

    connect(collectionViewer: CollectionViewer): Observable<OrganizationMember[]> {
        ////console.log('Connecting data source');
        return this.contactsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.contactsSubject.complete();
        this.loadingSubject.complete();
    }

}

