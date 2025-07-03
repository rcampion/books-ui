import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAdminContainerComponent } from './books-admin-container.component';

describe('BooksAdminContainerComponent ', () => {
	let component: BooksAdminContainerComponent;
	let fixture: ComponentFixture<BooksAdminContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
		/**
			* Components / Directives/ Pipes
			*/
			declarations: [BooksAdminContainerComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BooksAdminContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
