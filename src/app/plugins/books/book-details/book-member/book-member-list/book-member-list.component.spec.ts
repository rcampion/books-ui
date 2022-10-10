import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMemberListComponent } from './book-member-list.component';

describe('BookMemberListComponent', () => {
  let component: BookMemberListComponent;
  let fixture: ComponentFixture<BookMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
