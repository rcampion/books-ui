import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactWebsiteCreateDialogComponent } from './contact-website-create-dialog.component';

describe('ContactWebsiteCreateDialogComponent', () => {
  let component: ContactWebsiteCreateDialogComponent;
  let fixture: ComponentFixture<ContactWebsiteCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ContactWebsiteCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactWebsiteCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
