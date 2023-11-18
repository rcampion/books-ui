import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AddressStatusService } from '../../../../../core/services/address-status.service';
import { AddressStatus } from '../../../../../core/models/address-status.model';
import { SuccessDialogComponent } from '../../../../../../../zdslogic-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../../../../../zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-base/core/services/angular-log.service';

@Component({
	selector: 'app-address-details',
	templateUrl: './address-status-details.component.html',
	styleUrls: ['./address-status-details.component.scss']
})
export class AddressStatusDetailsComponent implements OnInit {
	public addressStatus: AddressStatus;
	public showAccounts;

	constructor(
		private _angularLogService: AngularLogService,
		private _repository: AddressStatusService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {
		this.getAddressStatusDetails();
	}

	private getAddressStatusDetails(): any{
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `addresss/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((res) => {
				this.addressStatus = res as AddressStatus;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
