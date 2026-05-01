
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { UserContact } from '../interfaces/user-contact.model';
import { ContactsService } from '../../../core/services/contacts.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginationPropertySort } from '../interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export class UserContactsDataSource implements DataSource<UserContact> {

    private contactsSubject = new BehaviorSubject<UserContact[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public total = 0;

    public userId: number;
    public filter: string;
    public sortProperty: string;
    public sortDirection: string;
    public pageIndex: number;
    public pageSize: number;

    constructor(private _contactsService: ContactsService) {

    }

    refresh(userId: number) {

        this.userId = userId;

        this.loadUserContacts(
            this.userId,
            this.filter,
            this.sortProperty,
            this.sortDirection,
            this.pageIndex,
            this.pageSize,
        )

    }

    loadUserContacts(
        userId: number,
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number): void {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this.userId = userId;
        this.filter = filter;
        this.sortProperty = sortProperty;
        this.sortDirection = sortDirection;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;

        this._contactsService.findUserContactsWithSortAndFilter(userId, filter, sort,
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

    connect(collectionViewer?: CollectionViewer): Observable<UserContact[]> {
        ////console.log('Connecting data source');
        return this.contactsSubject.asObservable();
    }

    disconnect(collectionViewer?: CollectionViewer): void {
        this.contactsSubject.complete();
        this.loadingSubject.complete();
    }

}

