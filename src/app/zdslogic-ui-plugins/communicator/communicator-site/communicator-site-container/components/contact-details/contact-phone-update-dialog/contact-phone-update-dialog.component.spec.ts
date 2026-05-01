import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPhoneUpdateDialogComponent } from './contact-phone-update-dialog.component';

describe('ContactPhoneUpdateDialogComponent', () => {
  let component: ContactPhoneUpdateDialogComponent;
  let fixture: ComponentFixture<ContactPhoneUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ContactPhoneUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPhoneUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
