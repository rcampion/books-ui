import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../core/models/book.model';
import { CartService } from '../../core/services/cart.service';

@Component({
	selector: 'app-cart',
	templateUrl: './shop-cart.component.html',
	styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {

	books: any = [];
	grandTotal !: number;

	constructor(
		private _cartService: CartService
	) { }

	ngOnInit(): void {
		this._cartService.getItems()
			.subscribe((res) => {
				this.books = res;
				//this.grandTotal = this.getTotal();

			});
	}

	public getItemTotal(item: Book): Observable<number> {
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
