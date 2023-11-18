import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressStatusListComponent } from './address-list.component';

describe('UserListComponent', () => {
  let component: AddressStatusListComponent;
  let fixture: ComponentFixture<AddressStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
