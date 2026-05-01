import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBundleCreateComponent } from './product-bundle-create.component';

describe('UserCreateComponent', () => {
  let component: ProductBundleCreateComponent;
  let fixture: ComponentFixture<ProductBundleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ProductBundleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBundleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
