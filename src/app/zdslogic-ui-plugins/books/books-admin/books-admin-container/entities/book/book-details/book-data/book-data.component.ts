import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

import { Book } from '../../../../../../core/models/book.model';
import { AngularLogService } from '../../../../../../../../zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-book-data',
	templateUrl: './book-data.component.html',
	styleUrls: ['./book-data.component.scss']
})
export class BookDataComponent implements OnInit {
	@Input() public book: Book;
	public selectOptions = [{ name: 'Show', value: 'show' }, { name: 'Do not Show', value: '' }];
	@Output() selectEmitt = new EventEmitter();

	constructor(
		private _angularLogService: AngularLogService,
		private _location: Location) { }

	ngOnInit(): void {
	}

	public onChange(event): void {
		this.selectEmitt.emit(event.value);
	}

	public onCancel(): void {
		this._location.back();
	}
}
