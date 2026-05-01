import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributeCreateComponent } from './product-attribute-create.component';

describe('UserCreateComponent', () => {
  let component: ProductAttributeCreateComponent;
  let fixture: ComponentFixture<ProductAttributeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ProductAttributeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
