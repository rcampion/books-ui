import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AddressService } from '../../../../../core/services/address.service';
import { Address } from '../../../../../core/models/address.model';
import { ErrorHandlerService } from '../../../../../../../zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-address-details',
	templateUrl: './address-details.component.html',
	styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {
	public address: Address;
	public showAccounts;

	constructor(
		private _angularLogService: AngularLogService,
		private _repository: AddressService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {
		this.getAddressDetails();
	}

	private getAddressDetails(): any{
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `addresss/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((res) => {
				this.address = res as Address;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
