import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributeDetailsComponent } from './product-attribute-details.component';

describe('UserDetailsComponent', () => {
  let component: ProductAttributeDetailsComponent;
  let fixture: ComponentFixture<ProductAttributeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ProductAttributeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
