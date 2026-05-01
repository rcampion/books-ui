import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistFileAttachmentListComponent } from './blacklist-file-attachment-list.component';

describe('ContactAddressListComponent', () => {
  let component: BlacklistFileAttachmentListComponent;
  let fixture: ComponentFixture<BlacklistFileAttachmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ BlacklistFileAttachmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistFileAttachmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
