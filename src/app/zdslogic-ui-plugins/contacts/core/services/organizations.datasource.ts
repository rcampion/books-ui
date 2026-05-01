
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Organization } from '../interfaces/organization.model';
import { OrganizationsService } from './organizations.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export class OrganizationsDataSource implements DataSource<Organization> {

    private organizationsSubject = new BehaviorSubject<Organization[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public paginationPage: any;

    public total = 0;

    constructor(private organizationsService: OrganizationsService) {

    }

    loadOrganizations(
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number): any {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this.organizationsService.findOrganizationsWithSortAndFilter(filter, sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response) => {
                this.organizationsSubject.next(response.content);
                this.total = response.totalElements;
            }
            );
    }

    connect(collectionViewer: CollectionViewer): Observable<Organization[]> {
        ////console.log('Connecting data source');
        return this.organizationsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.organizationsSubject.complete();
        this.loadingSubject.complete();
    }

}

