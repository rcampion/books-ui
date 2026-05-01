import { Component, OnInit } from '@angular/core';

import { Organization } from '../../core/interfaces/organization.model';
import { Router, ActivatedRoute } from '@angular/router';
import { OrganizationsService } from '../../core/services/organizations.service';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-organization-details',
	templateUrl: './organization-details.component.html',
	styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit {
	public organization: Organization;
	public showAccounts;

	constructor(private _angularLogService: AngularLogService,
		private _repository: OrganizationsService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void  {
		this.getOrganizationDetails();
	}

	private getOrganizationDetails = () => {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `organization/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.organization = result as Organization;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
