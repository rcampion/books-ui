import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactnoteCreateDialogComponent } from './contact-note-create-dialog.component';

describe('ContactnoteCreateDialogComponent', () => {
  let component: ContactnoteCreateDialogComponent;
  let fixture: ComponentFixture<ContactnoteCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ContactnoteCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactnoteCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
