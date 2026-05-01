
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Group } from '../interfaces/group.model';
import { GroupsService } from './groups.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export class GroupsDataSource implements DataSource<Group> {

    private groupsSubject = new BehaviorSubject<Group[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public paginationPage: any;

    public total = 0;

    constructor(private groupsService: GroupsService) {

    }

    loadGroups(
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number): any {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this.groupsService.findGroupsWithSortAndFilter(filter, sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response) => {
                this.groupsSubject.next(response.content);
                this.total = response.totalElements;
            }
            );
    }

    connect(collectionViewer: CollectionViewer): Observable<Group[]> {
        ////console.log('Connecting data source');
        return this.groupsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.groupsSubject.complete();
        this.loadingSubject.complete();
    }

}

