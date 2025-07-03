import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressStatusDetailsComponent } from './address-details.component';

describe('UserDetailsComponent', () => {
  let component: AddressStatusDetailsComponent;
  let fixture: ComponentFixture<AddressStatusDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressStatusDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressStatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
