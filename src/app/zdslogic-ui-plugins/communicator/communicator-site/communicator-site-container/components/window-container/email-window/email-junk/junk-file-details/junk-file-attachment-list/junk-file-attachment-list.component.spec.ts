import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JunkFileAttachmentListComponent } from './junk-file-attachment-list.component';

describe('ContactAddressListComponent', () => {
  let component: JunkFileAttachmentListComponent;
  let fixture: ComponentFixture<JunkFileAttachmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ JunkFileAttachmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JunkFileAttachmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
