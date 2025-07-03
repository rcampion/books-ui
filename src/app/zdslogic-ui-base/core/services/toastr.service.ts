import { Injectable } from '@angular/core';
import { NzNotificationService, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

@Injectable()
export class ToastrService {
	constructor(
		private _notificationService: NzNotificationService,
		private modalService: NzModalService,
		private message: NzMessageService) { }

	success(subject: string, message: string): any {
		this._notificationService.success(subject, message);
	}

	info(subject: string, message: string): any {
		this._notificationService.info(subject, message);
	}

	warn(subject: string, message: string): any {
		this._notificationService.warning(subject, message);
	}

	error(subject: string, message: string): any {
		this._notificationService.error(subject, message);
	}

	successMessage(msg: string): any {
		this.message.success(msg);
	}

	infoMessage(msg: string): any {
		this.message.info(msg);
	}

	warnMessage(msg: string): any {
		this.message.warning(msg);
	}

	errorMessage(msg: string): any {
		this.message.error(msg);
	}

	confirm(text: string): any {
		const result = {
			value: false
		};
		const data = new Observable<any>((observer) => {
			this.modalService.confirm({
				nzTitle: 'Are you sure ?',
				nzContent: text,
				nzOnOk: () => {
					result.value = true;
					observer.next(result);
					observer.complete();
				},
				nzOnCancel: () => {
					result.value = false;
					observer.next(result);
					observer.complete();
				}
			});
		});
		return data.toPromise();
	}
}
