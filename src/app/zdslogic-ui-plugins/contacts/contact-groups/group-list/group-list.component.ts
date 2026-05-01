import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Group } from '../../core/interfaces/group.model';
import { GroupsDataSource } from '../../core/services/groups.datasource';
import { GroupsService } from '../../core/services/groups.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Router } from '@angular/router';
import { GroupDeleteDialogComponent } from './../group-delete/group-delete-dialog.component';

import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-group-list',
	templateUrl: './group-list.component.html',
	styleUrls: ['./group-list.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GroupListComponent implements OnInit, AfterViewInit {

	public displayedColumns = ['groupName', 'groupDescription', 'details', 'update', 'delete', 'send'];
	dataSource: GroupsDataSource;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', {static: false}) input: ElementRef;

	currentGroup: Group;

	groupsLength = 0;

	public searchString: string = '';

	sortProperty = '';

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	deleteGroupDialogRef: MatDialogRef<GroupDeleteDialogComponent>;

	// tslint:disable-next-line:max-line-length
	constructor(private _angularLogService: AngularLogService, private _repository: GroupsService, private _errorHandlerService: ErrorHandlerService, private _router: Router, private _dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }
	ngOnInit(): void  {

		this.dataSource = new GroupsDataSource(this._repository);

		this.dataSource.loadGroups('', '', 'asc', 0, 6);

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}

	ngAfterViewInit(): void {

		this.sort.sortChange.subscribe((event) => {
			this.paginator.pageIndex = 0;
			this.sortProperty = event.active;
		});

		/*
				fromEvent(this.input.nativeElement, 'keyup')
					.pipe(
						debounceTime(150),
						distinctUntilChanged(),
						tap(() => {
							this.paginator.pageIndex = 0;
		
							this.loadGroupsPage();
						})
					)
					.subscribe();
		*/

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadGroupsPage())
			)
			.subscribe(

				data => {
					//console.log(data);
				}

			);

	}

	searchValueChanged() {

		this.paginator.pageIndex = 0;

		this.loadGroupsPage();

	}

	searchFormSubmitted(type: string = 'All') {

		this.paginator.pageIndex = 0;

		this.loadGroupsPage();

	}
	/*
		public getAllGroups = () => {
			this._repository.getData('group')
				.subscribe((result) => {
					const data = result as PaginationPage<Group>;
					this.dataSource.data = data.content;
					this.changeDetectorRefs.detectChanges();
				},
					(error) => {
						this._errorHandlerService.handleError(error);
					});
		}
	*/
	public doFilter = (value: string) => {
		//        this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	public redirectToAdd(): void {
		const url = `contacts/groups/create`;
		this._router.navigate([url]);
	}

	public redirectToDetails = (id: string) => {
		const url = `contacts/groups/details/${id}`;
		this._router.navigate([url]);
	}

	public redirectToUpdate(id: string): void {
		const url = `contacts/groups/update/${id}`;
		this._router.navigate([url]);
	}

	public redirectToDelete = (id: string) => {
		this.dialogConfig.data = {
			id: id
		};
		const dialogRef = this._dialog.open(GroupDeleteDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				this.loadGroupsPage();
			});
	}

    public redirectToEMail = (id: string) => {
        const url = `contacts/groups/email/${id}`;
        this._router.navigate([url]);
    }
	
	loadGroupsPage() {
		//this.input.nativeElement.value,
		this.dataSource.loadGroups(
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}
}
