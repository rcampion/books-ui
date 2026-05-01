import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressStatusCreateComponent } from './address-status-create.component';

describe('UserCreateComponent', () => {
  let component: AddressStatusCreateComponent;
  let fixture: ComponentFixture<AddressStatusCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressStatusCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressStatusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
