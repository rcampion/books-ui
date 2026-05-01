import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactWebsiteUpdateDialogComponent } from './contact-website-update-dialog.component';

describe('ContactWebsiteUpdateDialogComponent', () => {
  let component: ContactWebsiteUpdateDialogComponent;
  let fixture: ComponentFixture<ContactWebsiteUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ContactWebsiteUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactWebsiteUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
