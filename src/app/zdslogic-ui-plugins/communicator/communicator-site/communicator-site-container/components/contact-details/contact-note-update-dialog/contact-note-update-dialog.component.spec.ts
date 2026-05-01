import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNoteUpdateDialogComponent } from './contact-note-update-dialog.component';

describe('ContactNoteUpdateDialogComponent', () => {
  let component: ContactNoteUpdateDialogComponent;
  let fixture: ComponentFixture<ContactNoteUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ContactNoteUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactNoteUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
