import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class CartService {

	private itemsInCartSubject = new BehaviorSubject<Product[]>([]);

	private itemsInCart: Product[] = [];

	constructor() {
		this.itemsInCartSubject.subscribe(data => this.itemsInCart = data);
	}

	public getItems(): Observable<Product[]> {
		return this.itemsInCartSubject.asObservable();
	}

	public addToCart(item: Product): void {
		this.itemsInCartSubject.next([...this.itemsInCart, item]);
	}

	public removeFromCart(item: Product): void {
		const currentItems = [...this.itemsInCart];
		const items = currentItems.filter(product => product.productId !== item.productId);
		this.itemsInCartSubject.next(items);
	}

	public removeAllCart(): void {
		this.itemsInCart = [];
		this.itemsInCartSubject.next(this.itemsInCart);
	}

	public isInCart(item: Product): boolean {
		const currentItems = [...this.itemsInCart];
		for (const val of currentItems) {
			if (val.productId === item.productId) {
				return true;
			}
		}
		return false;
	}

	public getItemTotalAmount(item: Product): Observable<number> {

		let total = 0;

		total = (item.qty * item.retailPrice);

		return of(total);
	}

	public getGrandTotalAmount(): Observable<number> {
		const currentItems = [...this.itemsInCart];
		let total = 0;
		for (const item of currentItems) {
			total += (item.qty * item.retailPrice);
		}
		return of(total);
	}

}
