import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDeleteDialogComponent } from './contact-delete-dialog.component';

describe('DeleteDialogComponent', () => {
  let component: ContactDeleteDialogComponent;
  let fixture: ComponentFixture<ContactDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ContactDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
