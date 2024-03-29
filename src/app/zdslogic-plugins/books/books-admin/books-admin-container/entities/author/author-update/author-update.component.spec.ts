import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorUpdateComponent } from './author-update.component';

describe('UserUpdateComponent', () => {
  let component: AuthorUpdateComponent;
  let fixture: ComponentFixture<AuthorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
