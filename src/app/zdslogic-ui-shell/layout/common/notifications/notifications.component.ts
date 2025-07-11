import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { Notification } from 'app/zdslogic-ui-shell/layout/common/notifications/core/interfaces/notifications.types';
import { NotificationsService } from 'app/zdslogic-ui-shell/layout/common/notifications/core/services/notifications.service';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

@Component({
	selector: 'notifications',
	templateUrl: './notifications.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'notifications'
})
export class NotificationsComponent implements OnInit, OnDestroy {
	@ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
	@ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;

	notifications: Notification[];
	unreadCount: number = 0;
	private _overlayRef: OverlayRef;
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/**
	 * Constructor
	 */
	constructor(
		private _changeDetectorRef: ChangeDetectorRef,
		private _notificationsService: NotificationsService,
		private _overlay: Overlay,
		private _viewContainerRef: ViewContainerRef,
		private _errorHandlerService: ErrorHandlerService
	) {
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		// Subscribe to notification changes
		this._notificationsService.notifications$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((notifications: Notification[]) => {

				// Load the notifications
				this.notifications = notifications;

				// Calculate the unread count
				this._calculateUnreadCount();

				// Mark for check
				this._changeDetectorRef.markForCheck();
			});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();

		// Dispose the overlay
		if (this._overlayRef) {
			this._overlayRef.dispose();
		}
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Open the notifications panel
	 */
	openPanel(): void {
		// Return if the notifications panel or its origin is not defined
		if (!this._notificationsPanel || !this._notificationsOrigin) {
			return;
		}

		// Create the overlay if it doesn't exist
		if (!this._overlayRef) {
			this._createOverlay();
		}

		// Attach the portal to the overlay
		this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));

		// Add a custom CSS class to the overlay
		this._overlayRef.addPanelClass('notifications-overlay');

	}

	/**
	 * Close the notifications panel
	 */
	closePanel(): void {
		this._overlayRef.detach();
	}

	/**
	 * Mark all notifications as read
	 */
	markAllAsRead(): void {
		// Mark all as read
		this._notificationsService.markAllAsRead().subscribe();
	}

	/**
	 * Toggle read status of the given notification
	 */
	toggleRead(notification: Notification): void {
		// Toggle the read status
		notification.readFlag = !notification.readFlag;

		// Update the notification
		const apiUrl = `notification/${notification.id}`;
		this._notificationsService.update(apiUrl, notification).subscribe();
	}

	/**
	 * Delete the given notification
	 */
	delete(notification: Notification): void {
		// Delete the notification
		const apiUrl = `notification/${notification.id}`;
		this._notificationsService.delete(apiUrl).subscribe();
		/*
				 apiUrl = 'notification';

				this._notificationsService.getData(apiUrl)
					.subscribe((res) => {

						//this._notifications.next(res.content);

					},
						(error) => {
							this._errorHandlerService.handleError(error);
						});
		*/

		this._notificationsService.refresh();

	}

	/**
	 * Track by function for ngFor loops
	 *
	 * @param index
	 * @param item
	 */
	trackByFn(index: number, item: any): any {
		return item.id || index;
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Private methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Create the overlay
	 */
	private _createOverlay(): void {
		// Create the overlay
		this._overlayRef = this._overlay.create({
			hasBackdrop: true,
			backdropClass: 'fuse-backdrop-on-mobile',
			scrollStrategy: this._overlay.scrollStrategies.block(),
			positionStrategy: this._overlay.position()
				.flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
				.withLockedPosition(true)
				.withPush(true)
				.withPositions([
					{
						originX: 'start',
						originY: 'bottom',
						overlayX: 'start',
						overlayY: 'top'
					},
					{
						originX: 'start',
						originY: 'top',
						overlayX: 'start',
						overlayY: 'bottom'
					},
					{
						originX: 'end',
						originY: 'bottom',
						overlayX: 'end',
						overlayY: 'top'
					},
					{
						originX: 'end',
						originY: 'top',
						overlayX: 'end',
						overlayY: 'bottom'
					}
				])
		});

		// Detach the overlay from the portal on backdrop click
		this._overlayRef.backdropClick().subscribe(() => {
			this._overlayRef.detach();
		});
	}

	/**
	 * Calculate the unread count
	 *
	 * @private
	 */
	private _calculateUnreadCount(): void {
		let count = 0;

		if (this.notifications && this.notifications.length) {
			count = this.notifications.filter(notification => !notification.readFlag).length;
		}

		this.unreadCount = count;
	}
}
