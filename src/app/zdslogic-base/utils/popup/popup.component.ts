import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	popup(url: string): any {

		window.open(url,'popup','width=435,height=825');
		return false;
	}

}
