import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDetailsComponent } from './organization-details.component';

describe('ContactDetailsComponent', () => {
  let component: OrganizationDetailsComponent;
  let fixture: ComponentFixture<OrganizationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ OrganizationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
