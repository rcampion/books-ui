import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddressUpdateDialogComponent } from './contact-address-update-dialog.component';

describe('ContactAddressUpdateDialogComponent', () => {
  let component: ContactAddressUpdateDialogComponent;
  let fixture: ComponentFixture<ContactAddressUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ContactAddressUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAddressUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
