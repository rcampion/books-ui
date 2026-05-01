import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChannelMemberSelectionDialogComponent } from './chat-channel-member-selection-dialog.component';

describe('ChatChannelMemberSelectionDialogComponent', () => {
  let component: ChatChannelMemberSelectionDialogComponent;
  let fixture: ComponentFixture<ChatChannelMemberSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ChatChannelMemberSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChannelMemberSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
