import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNoteListComponent } from './contact-note-list.component';

describe('ContactNoteListComponent', () => {
  let component: ContactNoteListComponent;
  let fixture: ComponentFixture<ContactNoteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ContactNoteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactNoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
