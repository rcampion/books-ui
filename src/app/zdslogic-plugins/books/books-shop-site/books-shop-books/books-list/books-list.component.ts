import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from './../../../core/models/book.model';
import { BooksService } from './../../../core/services/books.service';
import { CartService } from './../../../core/services/cart.service';

@Component({
	selector: 'app-books-list',
	templateUrl: './books-list.component.html',
	styleUrls: ['./books-list.component.css']
})

export class ShopBooksListComponent implements OnInit {

	title = 'Angular Shopping Cart Example';

	public items: Observable<Book[]>;
	public shoppingCartItems: Observable<Book[]>;

	constructor(
		private _booksService: BooksService,
		private _cartService: CartService) {
	}

	ngOnInit(): void {
		this.items = this._booksService.getBooks();
		this.shoppingCartItems = this._cartService.getItems();
	}

	public addToCart(item: Book): void {
		this._cartService.addToCart(item);
	}

	public itemIsInCart(item: Book): boolean {
		return this._cartService.isInCart(item);
	}

	public getTotalItems(): Observable<number> {
		return this.shoppingCartItems.pipe(map((items) => {
			return items.reduce((prev, curr: Book) => {
				return prev + curr.qty;
			}, 0);
		}));
	}
}
