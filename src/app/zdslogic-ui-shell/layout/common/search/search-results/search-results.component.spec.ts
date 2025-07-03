import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxResultsComponent } from './search-results.component';

describe('SearchBoxResultsComponent',(): any {
  let component: SearchBoxResultsComponent;
  let fixture: ComponentFixture<SearchBoxResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoxResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',(): any {
    expect(component).toBeTruthy();
  });
});
