import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

@Component({
	selector: 'app-shop-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class ShopHomeComponent implements OnInit {

	@Input() searchString: string = '';

	public totalItem: number = 0;

	constructor(private _cartService: CartService) { }

	ngOnInit(): void {
		this._cartService.getItems()
			.subscribe((result) => {
				this.totalItem = result.length;
			});
	}
	/*
		search(event: any) {
			this.searchTerm = (event.target as HTMLInputElement).value;
			//console.log(this.searchTerm);
			this._cartService.search.next(this.searchTerm);
		}
	*/
}
