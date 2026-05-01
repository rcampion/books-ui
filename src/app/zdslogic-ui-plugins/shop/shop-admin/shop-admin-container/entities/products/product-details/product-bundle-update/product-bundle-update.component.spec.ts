import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBundleUpdateComponent } from './product-bundle-update.component';

describe('UserUpdateComponent', () => {
  let component: ProductBundleUpdateComponent;
  let fixture: ComponentFixture<ProductBundleUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ProductBundleUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBundleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
