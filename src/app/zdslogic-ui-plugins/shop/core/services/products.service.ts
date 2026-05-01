import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';

import { Cookie } from 'ng2-cookies';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';

import { Product } from '../interfaces/product.model';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';
import { environment } from '../../../../../environments/environment';
import { application } from '../../../../../../application';

@Injectable()
export class ProductsService {

	//private items = new Observable<Product[]>();

	public total = 0;

	private productsSubject = new BehaviorSubject<Product[]>([]);

	private loadingSubject = new BehaviorSubject<boolean>(false);

	constructor(private _http: HttpClient,
		private _errorHandlerService: ErrorHandlerService) {
		this.loadProducts('', '', 'asc', 0, 6);
	}

	public getData(route: string): any {
		return this._http.get(this.createCompleteRoute(route, environment.apiUrl), this.generateHeaders());
	}

	public create(route: string, body): any {
		return this._http.post(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
	}

	public update(route: string, body): any {
		return this._http.put(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
	}

	public delete(route: string): any {
		return this._http.delete(this.createCompleteRoute(route, environment.apiUrl), this.generateHeaders());
	}



	findProductsWithSortAndFilter(

		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {
		let apiUrl = this.createCompleteRoute('products', environment.apiUrl);
		const paramsx: any = { page: pageNumber, size: pageSize };
		if (sort != null) {
			paramsx.sort = sort.property + ',' + sort.direction;
		}

		let sortTest = sort.direction;
		if (sort.property !== '') {
			sortTest = sort.property + ',' + sort.direction;
		}

		let search: string;
		if (filter !== '') {
			apiUrl = this.createCompleteRoute('products/search', environment.apiUrl);

			const name = '\'*' + filter + '*\'';
			const longDescription = '\'*' + filter + '*\'';

			//search = 'productName===*' + filter + '* or ' + 'productDescription===*' + filter + '*';
			//search = 'productDescription===' + filter + '*';

			search = 'name==' + name + ' or ' + 'longDescription==' + longDescription;

		}
		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Access-Control-Allow-Origin': environment.originHeader,
					//					'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),
			params: new HttpParams()

				.set('search', search)
				.set('sort', sortTest)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())

		}).pipe(
			// map(result => result['content']
			map(result => result),
			catchError((error) => { this._errorHandlerService.handleError(error); return throwError(error.statusText); })
		);
	}

	findProductMembersWithSortAndFilter(
		productId = 0,
		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {

		const id: number = productId;
		const buildApiUrl = 'product/member/' + id;
		let apiUrl = this.createCompleteRoute(buildApiUrl, environment.apiUrl);
		const paramsx: any = { page: pageNumber, size: pageSize };
		if (sort != null) {
			paramsx.sort = sort.property + ',' + sort.direction;
		}

		let sortTest = sort.direction;
		if (sort.property !== '') {
			sortTest = sort.property + ',' + sort.direction;
		}
		let search: string;
		if (filter !== '') {
			apiUrl = this.createCompleteRoute('contacts/search', environment.apiUrl);

			const fullName = '\'*' + filter + '*\'';
			const firstName = '\'*' + filter + '*\'';
			const lastName = '\'*' + filter + '*\'';
			const company = '\'*' + filter + '*\'';
			const title = '\'*' + filter + '*\'';

			search = 'fullName==' + fullName + ' or ' + 'firstName==' + firstName + ' or ' + 'lastName==' + lastName + ' or ' + 'company==' + company + ' or ' + 'title==' + title;
		}
		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apiKey': '001',
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Access-Control-Allow-Origin': environment.originHeader,
					'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),
			params: new HttpParams()
				.set('search', search)
				.set('sort', sortTest)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())

		}).pipe(
			// map(result => result['content']
			map(result => result),
			catchError((error) => { this._errorHandlerService.handleError(error); return throwError(error.statusText); })
		);
	}

	public getProducts(): Observable<Product[]> {
		return this.productsSubject;
	}
	/*
		private loadProducts() {
			this.items = of([
				{ productId: 1, name: 'Red T-Shirt', price: 23.99, qty: 1, image: 'assets/img/image_one.jpg' },
				{ productId: 2, name: 'Black T-Shirt', price: 23.99, qty: 1, image: 'assets/img/image_two.jpg' },
				{ productId: 3, name: 'Silver T-Shirt', price: 23.99, qty: 1, image: 'assets/img/image_three.jpg' }
			]);
		}
	*/

	loadProducts(
		filter: string,
		sortProperty: string,
		sortDirection: string,
		pageIndex: number,
		pageSize: number): void {

		this.loadingSubject.next(true);

		const sort = new PaginationPropertySort();
		sort.property = sortProperty;
		sort.direction = sortDirection;

		this.findProductsWithSortAndFilter(filter, sort,
			pageIndex, pageSize).pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe((response) => {
				this.productsSubject.next(response.content);
				this.total = response.totalElements;
			}
			);
	}

	private createCompleteRoute(route: string, envAddress: string): any {
		return `${envAddress}/${route}`;
	}

	private generateHeaders(): any {

		const headers = new HttpHeaders(
			{
				'apikey': application.apiKey,
				'Access-Control-Allow-Origin': environment.originHeader,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'Authorization': 'Bearer ' + Cookie.get('access_token')

			}
		);

		return {

			headers: headers

		};
	}
}
