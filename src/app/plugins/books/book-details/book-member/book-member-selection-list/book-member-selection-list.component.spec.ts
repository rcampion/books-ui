import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMemberSelectionListComponent } from './book-member-selection-list.component';

describe('BookMemberSelectionListComponent', () => {
  let component: BookMemberSelectionListComponent;
  let fixture: ComponentFixture<BookMemberSelectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMemberSelectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMemberSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
