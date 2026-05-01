import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuDetailsComponent } from './product-sku-details.component';

describe('UserDetailsComponent', () => {
  let component: SkuDetailsComponent;
  let fixture: ComponentFixture<SkuDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ SkuDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
