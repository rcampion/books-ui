import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactWebsiteListComponent } from './contact-website-list.component';

describe('ContactWebsiteListComponent', () => {
  let component: ContactWebsiteListComponent;
  let fixture: ComponentFixture<ContactWebsiteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ContactWebsiteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactWebsiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
