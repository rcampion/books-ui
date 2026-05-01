import { Component, OnInit } from '@angular/core';
import { Group } from '../../core/interfaces/group.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService } from '../../core/services/groups.service';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-group-details',
	templateUrl: './group-details.component.html',
	styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
	public group: Group;
	public showAccounts;

	constructor(private _angularLogService: AngularLogService,
		private _repository: GroupsService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void  {
		this.getGroupDetails();
	}

	private getGroupDetails = () => {
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `group/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.group = result as Group;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
