import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUpdateComponent } from './organization-update.component';

describe('ContactUpdateComponent', () => {
  let component: OrganizationUpdateComponent;
  let fixture: ComponentFixture<OrganizationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ OrganizationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
