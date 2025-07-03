import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressStatusUpdateComponent } from './address-status-update.component';

describe('UserUpdateComponent', () => {
  let component: AddressStatusUpdateComponent;
  let fixture: ComponentFixture<AddressStatusUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressStatusUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressStatusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
