import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBundleDataComponent } from './product-bundle-data.component';

describe('ProductBundleDataComponent', () => {
  let component: ProductBundleDataComponent;
  let fixture: ComponentFixture<ProductBundleDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ProductBundleDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBundleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
