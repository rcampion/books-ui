
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';import { Observable } from 'rxjs';

import { EMailBlacklistFile } from './../models/email-blacklist-file.model';
import { EMailBlacklistFilesService } from './email-blacklist-files.service';

import { PaginationPropertySort } from '../interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

export class EMailBlacklistFilesDataSource implements DataSource<File> {

    private filesSubject = new BehaviorSubject<File[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public total = 0;

    constructor(
		private filesService: EMailBlacklistFilesService,
        private _errorHandlerService: ErrorHandlerService) {
    }

    loadFilesByName(
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number): any {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this.filesService.findFilesWithSortAndNamesFilter(filter, sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response) => {
                this.filesSubject.next(response.content);
                this.total = response.totalElements;
            },
                (error) => {
                    // this._errorHandlerService.dialogConfig = { ...this.dialogConfig };
                    this._errorHandlerService.handleError(error);
                }
            );
    }

    loadFilesByText(
        filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number): any {

        this.loadingSubject.next(true);

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this.filesService.findFilesWithSortAndTextFilter(filter, sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response) => {
                this.filesSubject.next(response.content);
                this.total = response.totalElements;
            },
                (error) => {
                    // this._errorHandlerService.dialogConfig = { ...this.dialogConfig };
                    this._errorHandlerService.handleError(error);
                }
            );
    }

    connect(collectionViewer: CollectionViewer): Observable<File[]> {
        ////console.log('Connecting data source');
        return this.filesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.filesSubject.complete();
        this.loadingSubject.complete();
    }

}

