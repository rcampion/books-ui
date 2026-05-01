import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMemberSelectionListComponent } from './organization-member-selection-list.component';

describe('OrganizationMemberSelectionListComponent', () => {
  let component: OrganizationMemberSelectionListComponent;
  let fixture: ComponentFixture<OrganizationMemberSelectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ OrganizationMemberSelectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationMemberSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
