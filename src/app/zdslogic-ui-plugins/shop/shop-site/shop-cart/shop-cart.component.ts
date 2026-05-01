import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../core/interfaces/product.model';
import { CartService } from '../../core/services/cart.service';

@Component({
	selector: 'app-cart',
	templateUrl: './shop-cart.component.html',
	styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {

	products: any = [];
	grandTotal !: number;

	constructor(
		private _cartService: CartService
	) { }

	ngOnInit(): void {
		this._cartService.getItems()
			.subscribe((result) => {
				this.products = result;
				//this.grandTotal = this.getTotal();

			});
	}

	public getItemTotal(item: Product): Observable<number> {
		return this._cartService.getItemTotalAmount(item);
	}

	public getGrandTotal(): Observable<number> {
		return this._cartService.getGrandTotalAmount();
	}

	removeItem(item: any): void {
		this._cartService.removeFromCart(item);
	}

	emptyCart(): void {
		this._cartService.removeAllCart();
	}

}
