import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactaddressCreateDialogComponent } from './contact-address-create-dialog.component';

describe('ContactaddressCreateDialogComponent', () => {
  let component: ContactaddressCreateDialogComponent;
  let fixture: ComponentFixture<ContactaddressCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ContactaddressCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactaddressCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
