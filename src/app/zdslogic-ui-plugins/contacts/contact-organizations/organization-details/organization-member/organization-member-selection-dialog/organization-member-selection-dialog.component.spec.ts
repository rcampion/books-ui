import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMemberSelectionDialogComponent } from './organization-member-selection-dialog.component';

describe('OrganizationMemberSelectionDialogComponent', () => {
  let component: OrganizationMemberSelectionDialogComponent;
  let fixture: ComponentFixture<OrganizationMemberSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ OrganizationMemberSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationMemberSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
