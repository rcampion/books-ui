import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from './../../../core/interfaces/product.model';
import { ProductsService } from './../../../core/services/products.service';
import { CartService } from './../../../core/services/cart.service';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.css']
})

export class ShopProductsListComponent implements OnInit {

	title = 'Angular Shopping Cart Example';

	public items: Observable<Product[]>;
	public shoppingCartItems: Observable<Product[]>;

	constructor(
		private _productsService: ProductsService,
		private _cartService: CartService) {
	}

	ngOnInit(): void {
		this.items = this._productsService.getProducts();
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
