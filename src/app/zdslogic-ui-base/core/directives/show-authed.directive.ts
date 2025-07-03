import {
	Directive,
	Input,
	OnInit,
	TemplateRef,
	ViewContainerRef
} from '@angular/core';

import { UsersService } from '../services/users.service';

import { AngularLogService } from '../services/angular-log.service';

@Directive({ selector: '[appShowAuthed]' })
export class ShowAuthedDirective implements OnInit {

    /**
     * Constructor
     */
	constructor(
		private _angularLogService: AngularLogService,
		private _templateRef: TemplateRef<any>,
		private _usersService: UsersService,
		private _viewContainer: ViewContainerRef
	) { }

	condition: boolean;

	@Input() set appShowAuthed(condition: boolean) {
		this.condition = condition;
	}

	ngOnInit(): void {

		this._usersService.isUserAuthenticated.subscribe(
			(isUserAuthenticated) => {
				if (isUserAuthenticated && this.condition || !isUserAuthenticated && !this.condition) {
					this._viewContainer.createEmbeddedView(this._templateRef);
				} else {
					this._viewContainer.clear();
				}
			}
		);
	}

	refresh(): void {

		this._usersService.isUserAuthenticated.subscribe(
			(isUserAuthenticated) => {
				if (isUserAuthenticated && this.condition || !isUserAuthenticated && !this.condition) {
					this._viewContainer.createEmbeddedView(this._templateRef);
				} else {
					this._viewContainer.clear();
				}
			}
		);
	}

}
