import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBundleDetailsComponent } from './product-bundle-details.component';

describe('UserDetailsComponent', () => {
  let component: ProductBundleDetailsComponent;
  let fixture: ComponentFixture<ProductBundleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ProductBundleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBundleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
