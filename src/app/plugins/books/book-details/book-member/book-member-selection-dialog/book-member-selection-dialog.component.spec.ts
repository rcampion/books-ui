import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMemberSelectionDialogComponent } from './book-member-selection-dialog.component';

describe('BookMemberSelectionDialogComponent', () => {
  let component: BookMemberSelectionDialogComponent;
  let fixture: ComponentFixture<BookMemberSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMemberSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMemberSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
