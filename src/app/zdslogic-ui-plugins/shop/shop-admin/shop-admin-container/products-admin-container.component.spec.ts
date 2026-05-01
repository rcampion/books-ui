import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAdminContainerComponent } from './shop-admin-container.component';

describe('ProductsAdminContainerComponent ', () => {
	let component: ProductsAdminContainerComponent;
	let fixture: ComponentFixture<ProductsAdminContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
		/**
			* Components / Directives/ Pipes
			*/
			declarations: [ProductsAdminContainerComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductsAdminContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
