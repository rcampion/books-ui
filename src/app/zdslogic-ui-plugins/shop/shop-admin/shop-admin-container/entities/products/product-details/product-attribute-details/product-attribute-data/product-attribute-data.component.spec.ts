import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributeDataComponent } from './product-attribute-data.component';

describe('ProductAttributeDataComponent', () => {
  let component: ProductAttributeDataComponent;
  let fixture: ComponentFixture<ProductAttributeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ProductAttributeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
