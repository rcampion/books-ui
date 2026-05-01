import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuListComponent } from './sku-list.component';

describe('UserListComponent', () => {
  let component: SkuListComponent;
  let fixture: ComponentFixture<SkuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ SkuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
