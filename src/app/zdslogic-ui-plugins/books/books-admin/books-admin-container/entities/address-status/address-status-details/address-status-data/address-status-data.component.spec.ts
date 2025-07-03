import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressStatusDataComponent } from './address-data.component';

describe('AddressStatusDataComponent', () => {
  let component: AddressStatusDataComponent;
  let fixture: ComponentFixture<AddressStatusDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressStatusDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressStatusDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
