import {
	Directive,
	Input,
	OnInit,
	TemplateRef,
	ViewContainerRef
} from '@angular/core';

import { UsersService } from '../services/users.service';

import { AngularLogService } from '../services/angular-log.service';

@Directive({ selector: '[appShowSubscribed]' })
export class ShowSubscribedDirective implements OnInit {
	constructor(
		private _angularLogService: AngularLogService,
		private _templateRef: TemplateRef<any>,
		private _usersService: UsersService,
		private _viewContainer: ViewContainerRef
	) { }

	condition: boolean;

	@Input() set appShowSubscribed(condition: boolean) {
		this.condition = condition;
	}
	
	ngOnInit(): void  {

		this._usersService.isUserSubscribed.subscribe(
			(isUserSubscribed) => {
				if (isUserSubscribed && this.condition || !isUserSubscribed && !this.condition) {
					this._viewContainer.createEmbeddedView(this._templateRef);
				} else {
					this._viewContainer.clear();
				}
			}
		);
	}

	refresh() {

		this._usersService.isUserSubscribed.subscribe(
			(isUserSubscribed) => {
				if (isUserSubscribed && this.condition || !isUserSubscribed && !this.condition) {
					this._viewContainer.createEmbeddedView(this._templateRef);
				} else {
					this._viewContainer.clear();
				}
			}
		);
	}

}
