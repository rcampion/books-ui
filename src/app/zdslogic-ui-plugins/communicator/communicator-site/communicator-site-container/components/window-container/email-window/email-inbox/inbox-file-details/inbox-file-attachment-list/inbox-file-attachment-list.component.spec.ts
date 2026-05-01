import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxFileAttachmentListComponent } from './inbox-file-attachment-list.component';

describe('ContactAddressListComponent', () => {
  let component: InboxFileAttachmentListComponent;
  let fixture: ComponentFixture<InboxFileAttachmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ InboxFileAttachmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxFileAttachmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
