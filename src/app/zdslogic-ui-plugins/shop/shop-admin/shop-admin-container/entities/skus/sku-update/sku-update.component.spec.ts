import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuUpdateComponent } from './sku-update.component';

describe('UserUpdateComponent', () => {
  let component: SkuUpdateComponent;
  let fixture: ComponentFixture<SkuUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ SkuUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
