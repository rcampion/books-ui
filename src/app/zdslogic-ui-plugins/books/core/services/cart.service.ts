import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class CartService {

	private itemsInCartSubject = new BehaviorSubject<Book[]>([]);

	private itemsInCart: Book[] = [];

	constructor() {
		this.itemsInCartSubject.subscribe(data => this.itemsInCart = data);
	}

	public getItems(): Observable<Book[]> {
		return this.itemsInCartSubject.asObservable();
	}

	public addToCart(item: Book): void {
		this.itemsInCartSubject.next([...this.itemsInCart, item]);
	}

	public removeFromCart(item: Book): void {
		const currentItems = [...this.itemsInCart];
		const items = currentItems.filter(product => product.bookId !== item.bookId);
		this.itemsInCartSubject.next(items);
	}

	public removeAllCart(): void {
		this.itemsInCart = [];
		this.itemsInCartSubject.next(this.itemsInCart);
	}

	public isInCart(item: Book): boolean {
		const currentItems = [...this.itemsInCart];
		for (const val of currentItems) {
			if (val.bookId === item.bookId) {
				return true;
			}
		}
		return false;
	}

	public getItemTotalAmount(item: Book): Observable<number> {

		let total = 0;

		total = (item.qty * item.price);

		return of(total);
	}

	public getGrandTotalAmount(): Observable<number> {
		const currentItems = [...this.itemsInCart];
		let total = 0;
		for (const item of currentItems) {
			total += (item.qty * item.price);
		}
		return of(total);
	}

}
