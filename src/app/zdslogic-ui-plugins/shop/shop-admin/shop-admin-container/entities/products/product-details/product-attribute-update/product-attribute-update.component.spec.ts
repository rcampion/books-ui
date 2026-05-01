import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributeUpdateComponent } from './product-attribute-update.component';

describe('UserUpdateComponent', () => {
  let component: ProductAttributeUpdateComponent;
  let fixture: ComponentFixture<ProductAttributeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ProductAttributeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
