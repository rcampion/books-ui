import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMemberListComponent } from './organization-member-list.component';

describe('OrganizationMemberListComponent', () => {
  let component: OrganizationMemberListComponent;
  let fixture: ComponentFixture<OrganizationMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ OrganizationMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
