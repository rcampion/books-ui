import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChannelMemberSelectionListComponent } from './chat-channel-member-selection-list.component';

describe('ChatChannelMemberSelectionListComponent', () => {
  let component: ChatChannelMemberSelectionListComponent;
  let fixture: ComponentFixture<ChatChannelMemberSelectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ChatChannelMemberSelectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChannelMemberSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
