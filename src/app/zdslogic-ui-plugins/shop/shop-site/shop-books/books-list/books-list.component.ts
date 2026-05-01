import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from './../../../core/models/book.model';
import { ProductsService } from './../../../core/services/books.service';
import { CartService } from './../../../core/services/cart.service';

@Component({
	selector: 'app-books-list',
	templateUrl: './books-list.component.html',
	styleUrls: ['./books-list.component.css']
})

export class ShopProductsListComponent implements OnInit {

	title = 'Angular Shopping Cart Example';

	public items: Observable<Product[]>;
	public shoppingCartItems: Observable<Product[]>;

	constructor(
		private _booksService: ProductsService,
		private _cartService: CartService) {
	}

	ngOnInit(): void {
		this.items = this._booksService.getProducts();
		this.shoppingCartItems = this._cartService.getItems();
	}

	public addToCart(item: Product): void {
		this._cartService.addToCart(item);
	}

	public itemIsInCart(item: Product): boolean {
		return this._cartService.isInCart(item);
	}

	public getTotalItems(): Observable<number> {
		return this.shoppingCartItems.pipe(map((items) => {
			return items.reduce((prev, curr: Product) => {
				return prev + curr.qty;
			}, 0);
		}));
	}
}
