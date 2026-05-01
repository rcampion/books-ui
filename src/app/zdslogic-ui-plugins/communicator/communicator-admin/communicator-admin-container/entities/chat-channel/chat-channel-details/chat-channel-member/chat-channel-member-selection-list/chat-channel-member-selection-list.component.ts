import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { Contact } from '../../../../../../../../../zdslogic-ui-plugins/contacts/core/interfaces/contact.model';
import { ContactsService } from '../../../../../../../../../zdslogic-ui-plugins/contacts/core/services/contacts.service';
import { PaginationPage } from 'app/zdslogic-ui-base/core/interfaces/pagination';
import { ChatChannelMemberSelectionDialogComponent } from './../chat-channel-member-selection-dialog/chat-channel-member-selection-dialog.component';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

@Component({
  selector: 'app-chat-channel-member-selection-list',
  templateUrl: './chat-channel-member-selection-list.component.html',
  styleUrls: ['./chat-channel-member-selection-list.component.scss']
})
export class ChatChannelMemberSelectionListComponent implements OnInit, AfterViewInit {

    public displayedColumns = ['fullName', 'title', 'company', 'add'];
    public dataSource = new MatTableDataSource<Contact>();

    @ViewChild(MatSort, {static:false}) sort: MatSort;
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

    channelId: string;

    currentContact: Contact;

	public searchString: string = '';

    private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

    chatChannelMemberSelectionDialogRef: MatDialogRef<ChatChannelMemberSelectionDialogComponent>;

    // tslint:disable-next-line:max-line-length
    constructor(private _angularLogService: AngularLogService,
        private _dialogRef: ChatChannelMemberSelectionDialogComponent,
        private _repository: ContactsService,
        private _errorHandlerService: ErrorHandlerService,
        private _router: Router,
        private _activeRoute: ActivatedRoute,
        private _dialog: MatDialog,
        private changeDetectorRefs: ChangeDetectorRef) {

       // this.chat-channelMemberSelectionDialogRef = dialogRef;
     }
    ngOnInit(): void  {
        this.getFilteredContacts();

        this.dialogConfig = {
            height: '600px',
            width: '1500px',
            disableClose: true,
            data: {}
        };
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

	searchValueChanged(): void {

		this.paginator.pageIndex = 0;

		this.doFilter(this.searchString);

	}

	searchFormSubmitted(type: string = 'All'): void {

		this.paginator.pageIndex = 0;

		this.doFilter(this.searchString);

	}

    public getFilteredContacts(): any {
        this.channelId = this._dialogRef.channelId;

        const url = `chat-channel/member/filtered/${this.channelId}`;

        this._repository.getData(url)
            .subscribe((result) => {
                const data = result as PaginationPage<Contact>;
                this.dataSource.data = data.content;
                this.changeDetectorRefs.detectChanges();
            });
    }

    public addMember = (id: string) => {
        const apiUrl  = 'chat-channel/member/' + this.channelId + '/' + id;

        this._repository.create(apiUrl, null)
            .subscribe((result) => {
                this.getFilteredContacts();
                //console.log('chat-channel member add completed');
            });
    }

    public doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

}
