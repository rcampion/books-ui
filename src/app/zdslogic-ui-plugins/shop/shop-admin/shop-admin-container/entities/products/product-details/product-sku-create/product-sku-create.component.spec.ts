import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuCreateComponent } from './product-sku-create.component';

describe('UserCreateComponent', () => {
  let component: SkuCreateComponent;
  let fixture: ComponentFixture<SkuCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ SkuCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
