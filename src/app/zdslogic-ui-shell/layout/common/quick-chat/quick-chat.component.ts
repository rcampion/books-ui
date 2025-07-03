import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, NgZone, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { merge, Observable, Subject, takeUntil, tap } from 'rxjs';
import { QuickChatService } from 'app/zdslogic-ui-shell/layout/common/quick-chat/quick-chat.service';
import { Chat } from 'app/zdslogic-ui-shell/layout/common/quick-chat/quick-chat.types';
import { ContactsService } from 'app/zdslogic-ui-plugins/contacts/core/services/contacts.service';
import { UserContactsDataSource } from 'app/zdslogic-ui-plugins/contacts/connections/core/services/user-contacts.datasource';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { UserContact } from 'app/zdslogic-ui-plugins/contacts/connections/core/interfaces/user-contact.model';
import { CollectionViewer } from '@angular/cdk/collections';
import { SocketClientFourService } from 'app/zdslogic-ui-plugins/contacts/connections/core/services/socket-client-four.service';
import { ActiveContactsService } from 'app/zdslogic-ui-plugins/contacts/connections/core/services/active-contacts.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmMessageDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/confirm-message-dialog/confirm-message-dialog.component';
import { MessageDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/message-dialog/message-dialog.component';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { AppMessage } from 'app/zdslogic-ui-base/core/models/appmessage.model';
import { MessageService } from 'app/zdslogic-ui-base/core/services/message.service';
import { ConnectionDeleteDialogComponent } from 'app/zdslogic-ui-plugins/contacts/connections/connection-delete/connection-delete-dialog.component';
import { ConnectionsSelectionDialogComponent } from 'app/zdslogic-ui-plugins/contacts/connections/connections-selection-dialog/connections-selection-dialog.component';

@Component({
	selector: 'quick-chat',
	templateUrl: './quick-chat.component.html',
	styleUrls: ['./quick-chat.component.scss'],
	encapsulation: ViewEncapsulation.None,
	exportAs: 'quickChat'
})
export class QuickChatComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('messageInput') messageInput: ElementRef;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

	chat: Chat;
	chats: Chat[];
	opened: boolean = false;
	selectedChat: UserContact;

	room: any;
	currentUser: User = new User();
	presenceStatus: number;
	dataSource: UserContactsDataSource;
	userId: number;
	firstLoad = true;
	result: boolean = false;

	public searchString: string = '';
	sortProperty = '';

	messages13: any;
	mysubid13 = 'my-subscription-id-013';

	deleteContactDialogRef: MatDialogRef<ConnectionDeleteDialogComponent>;
	messageDialogRef: MatDialogRef<MessageDialogComponent>;

	private _scrollStrategy: ScrollStrategy = this._scrollStrategyOptions.block();
	private _overlay: HTMLElement;
	private _unsubscribeAll: Subject<any> = new Subject<any>();
	private deleteDialogConfig = {
		height: '200px',
		width: '400px',
		disableClose: true,
		data: {}
	};

	private selectDialogConfig = {
		height: '800px',
		width: '800px',
		disableClose: true,
		data: {}
	};

	private messageDialogConfig = {
		height: '200px',
		width: '400px',
		disableClose: true,
		data: {}
	};

	/**
	 * Constructor
	 */
	constructor(
		private _elementRef: ElementRef,
		private _renderer2: Renderer2,
		private _ngZone: NgZone,
		private errorService: ErrorHandlerService,
		private router: Router,
		private _scrollStrategyOptions: ScrollStrategyOptions,
		private repository: ContactsService,
		private dialog: MatDialog,
		private messageService: MessageService,
		private usersService: UsersService,
		private wsDataService: SocketClientFourService,
		private dataSharingService: DataSharingService,
		private activeContactsService: ActiveContactsService
	) {
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Decorated methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Host binding for component classes
	 */
	@HostBinding('class') get classList(): any {
		return {
			'quick-chat-opened': this.opened
		};
	}

	/**
	 * Resize on 'input' and 'ngModelChange' events
	 *
	 * @private
	 */
	@HostListener('input')
	@HostListener('ngModelChange')
	private _resizeMessageInput(): void {
		// This doesn't need to trigger Angular's change detection by itself
		this._ngZone.runOutsideAngular(() => {

			setTimeout(() => {

				// Set the height to 'auto' so we can correctly read the scrollHeight
				this.messageInput.nativeElement.style.height = 'auto';

				// Get the scrollHeight and subtract the vertical padding
				this.messageInput.nativeElement.style.height = `${this.messageInput.nativeElement.scrollHeight}px`;
			});
		});
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.dataSource = new UserContactsDataSource(this.repository);

		this.dataSharingService.isActiveContactsReady.subscribe((data) => {
			if (data === true) {
				if (this.usersService.isUserAuthenticatedWithToken()) {
					this.userId = this.usersService.getUserId();
					this.dataSource.loadUserContacts(this.userId, '', '', 'asc', 0, 30);
					this.firstLoad = false;
				}
			}
		});

		// // Chat
		// this._quickChatService.chat$
		//     .pipe(takeUntil(this._unsubscribeAll))
		//     .subscribe((chat: Chat) => {
		//         this.chat = chat;
		//     });

		// // Chats
		// this._quickChatService.chats$
		//     .pipe(takeUntil(this._unsubscribeAll))
		//     .subscribe((chats: Chat[]) => {
		//         this.chats = chats;
		//     });

		// // Selected chat
		// this._quickChatService.chat$
		//     .pipe(takeUntil(this._unsubscribeAll))
		//     .subscribe((chat: Chat) => {
		//         this.selectedChat = chat;
		//     });
	}

	ngAfterViewInit(): void {

		// this.sortProperty = 'userId';
		// this.sort.direction = 'desc';

		this.wsDataService.connect().subscribe((result: any) => {
			////console.log(result: any);

			this.messages13 = this.activeContactsService
				.onUpdate(this.mysubid13)
				.pipe(takeUntil(this._unsubscribeAll))
				.subscribe((post) => {
					if ((post.message === 'Session Expired')
						|| (post.message === 'Presence Changed')
						|| (post.message === 'Logged In')
						|| (post.message === 'Logged Out')) {
						if (this.firstLoad) {

							//this.currentUser = this.usersService.getCurrentUser();
							//this.userId = parseInt(this.currentUser.id);
							this.userId = this.usersService.getUserId();
							this.dataSource.loadUserContacts(this.userId, '', '', 'asc', 0, 30);
							this.firstLoad = false;

						} else {
							if (this.usersService.isUserAuthenticatedWithToken()) {

								// = this.usersService.getCurrentUser();
								//this.userId = parseInt(this.currentUser.id);
								this.userId = this.usersService.getUserId();
								this.dataSource.refresh(this.userId);

							}

						}
					}
				});
		});

		// this.sort.sortChange.subscribe((event) => {
		// 	this.paginator.pageIndex = 0;
		// 	this.sortProperty = event.active;
		// });

		// merge(this.sort.sortChange, this.paginator.page)
		// 	.pipe(
		// 		tap(() => this.loadContactsPage())
		// 	)
		// 	.subscribe(

		// 		(data) => {
		// 			//console.log(data);
		// 		}

		// 	);

	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Open the panel
	 */
	open(): void {
		// Return if the panel has already opened
		if (this.opened) {
			return;
		}

		// Open the panel
		this._toggleOpened(true);
	}

	/**
	 * Close the panel
	 */
	close(): void {
		// Return if the panel has already closed
		if (!this.opened) {
			return;
		}

		// Close the panel
		this._toggleOpened(false);
	}

	/**
	 * Toggle the panel
	 */
	toggle(): void {
		if (this.opened) {
			this.close();
		}
		else {
			this.open();
		}
	}
	// -----------------------------------------------------------------------------------------------------
	// @ Private methods
	// -----------------------------------------------------------------------------------------------------

	public redirectToAdd(): void {
		const id: number = this.userId;
		this.selectDialogConfig.data = {
			userId: id
		};
		const dialogRef = this.dialog.open(ConnectionsSelectionDialogComponent, this.selectDialogConfig)
			.afterClosed().subscribe((result: any) => {
				this.loadContactsPage();
			});
	};

	/**
	 * Show the backdrop
	 *
	 * @private
	 */
	private _showOverlay(): void {
		// Try hiding the overlay in case there is one already opened
		this._hideOverlay();

		// Create the backdrop element
		this._overlay = this._renderer2.createElement('div');

		// Return if overlay couldn't be create for some reason
		if (!this._overlay) {
			return;
		}

		// Add a class to the backdrop element
		this._overlay.classList.add('quick-chat-overlay');

		// Append the backdrop to the parent of the panel
		this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._overlay);

		// Enable block scroll strategy
		this._scrollStrategy.enable();

		// Add an event listener to the overlay
		this._overlay.addEventListener('click', () => {
			this.close();
		});
	}

	private loadContactsPage(): void {
		//this.input.nativeElement.value,

		this.dataSource.loadUserContacts(
			this.userId,
			this.searchString,
			'',
			'',
			0,
			30
		);
		// this.sortProperty,
		// this.sort.direction,
		//this.paginator.pageIndex,
		//this.paginator.pageSize);

	}

	selectChat(id: string): void {
		// Open the panel
		this._toggleOpened(true);
	}

	/**
	 * Hide the backdrop
	 *
	 * @private
	 */
	private _hideOverlay(): void {
		if (!this._overlay) {
			return;
		}

		// If the backdrop still exists...
		if (this._overlay) {
			// Remove the backdrop
			this._overlay.parentNode.removeChild(this._overlay);
			this._overlay = null;
		}

		// Disable block scroll strategy
		this._scrollStrategy.disable();
	}

	/**
	 * Open/close the panel
	 *
	 * @param open
	 * @private
	 */
	private _toggleOpened(open: boolean): void {
		// Set the opened
		this.opened = open;

		// If the panel opens, show the overlay
		if (open) {
			this._showOverlay();
		}
		// Otherwise, hide the overlay
		else {
			this._hideOverlay();
		}
	}

	public redirectToDetails(element: UserContact): void {
		let url = '';
		if (element.contactId) {
			url = `/contacts/contact/details/${element.contactId}`;
		} else {
			url = `/contacts/contact/details/${element.id}`;
		}
		this.router.navigate([url]);
	};

	public redirectToUpdate(element: UserContact): void {
		let url = '';
		if (element.contactId) {
			url = `/contacts/update/${element.contactId}`;
		} else {
			url = `/contacts/update/${element.id}`;
		}
		this.router.navigate([url]);
	};

	public redirectToVideo(element: UserContact): void {

		this.presenceStatus = element.presenceStatus;
		if (this.presenceStatus === 4) {
			this.messageDialogConfig.data = { 'errorMessage': 'Join the Meeting' };

			const dialogRef = this.dialog.open(ConfirmMessageDialogComponent, this.messageDialogConfig);

			dialogRef.afterClosed().subscribe((dialogResult) => {
				this.result = dialogResult;
				if (this.result === true) {
					const url = '';
					if (element.contactId) {
						//url = `video-jitsi/video-jitsi-start`;
						//this.router.navigate([url]);

						this.room = element.currentRoom;
						//this.room = this.currentUser.userName;
						const locationUrl = `/collaboration/collaboration-video-enter/video/${this.room}`;
						//var locationUrl = `/video-jitsi/video-jitsi-enter`;

						//window.location.href = locationUrl;
						this.router.navigate([locationUrl]);

					}
				}

			});

		} else
			if (this.presenceStatus !== 0) {
				this.messageDialogConfig.data = { 'errorMessage': 'Contact is not Online' };
				this.dialog.open(MessageDialogComponent, this.messageDialogConfig);
			}

		if (this.presenceStatus === 0) {

			const url = '';
			if (element.contactId) {
				//url = `video-jitsi/video-jitsi-start`;

				this.currentUser = this.usersService.getCurrentUser();
				this.room = this.currentUser.userName;

				//send invite
				const model = new AppMessage();
				model.message = element.contactId.toString();
				model.data = this.room;
				model.flag = true;
				this.messageService.send(model);

				//this.router.navigate([url]);
				const locationUrl = `/collaboration/collaboration-video-enter/video/${this.room}`;
				//var locationUrl = `/video-jitsi/video-jitsi-enter`;

				//window.location.href = locationUrl;
				this.router.navigate([locationUrl]);

			}

		}
	};

	public delete(element: UserContact): void {

		if (element.contactId) {
			let id = element.id;
			const apiUrl = `user/contacts/${id}`;
			this.repository.delete(apiUrl)
				.subscribe((result: any) => {
					id = result as number;
					this.loadContactsPage();
				},
					(error) => {
						this.errorService.handleError(error);
					});
		} else {
			const id = element.id;
			this.deleteDialogConfig.data = {
				id: id
			};
			const dialogRef = this.dialog.open(ConnectionDeleteDialogComponent, this.deleteDialogConfig)
				.afterClosed().subscribe((result: any) => {
					this.loadContactsPage();
				});
		}
	};
}
