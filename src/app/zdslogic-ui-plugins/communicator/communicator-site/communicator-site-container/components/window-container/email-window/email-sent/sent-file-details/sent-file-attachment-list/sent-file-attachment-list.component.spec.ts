import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentFileAttachmentListComponent } from './sent-file-attachment-list.component';

describe('ContactAddressListComponent', () => {
  let component: SentFileAttachmentListComponent;
  let fixture: ComponentFixture<SentFileAttachmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ SentFileAttachmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentFileAttachmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
