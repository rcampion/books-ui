import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthorService } from '../../../../../core/services/author.service';
import { Author } from '../../../../../core/models/author.model';
import { SuccessDialogComponent } from '../../../../../../../zdslogic-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../../../../../zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-base/core/services/angular-log.service';

@Component({
	selector: 'app-author-details',
	templateUrl: './author-details.component.html',
	styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {
	public author: Author;
	public showAccounts;

	constructor(
		private _angularLogService: AngularLogService,
		private _repository: AuthorService,
		private _router: Router,
		private _activeRoute: ActivatedRoute,
		private _errorHandlerService: ErrorHandlerService) { }

	ngOnInit(): void {
		this.getAuthorDetails();
	}

	private getAuthorDetails(): any{
		const id: string = this._activeRoute.snapshot.params['id'];
		const apiUrl = `addresss/${id}`;

		this._repository.getData(apiUrl)
			.subscribe((res) => {
				this.author = res as Author;
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
}
