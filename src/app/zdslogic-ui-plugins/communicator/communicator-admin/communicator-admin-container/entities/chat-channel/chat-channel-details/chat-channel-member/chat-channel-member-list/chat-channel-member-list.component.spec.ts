import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChannelMemberListComponent } from './chat-channel-member-list.component';

describe('ChatChannelMemberListComponent', () => {
  let component: ChatChannelMemberListComponent;
  let fixture: ComponentFixture<ChatChannelMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ChatChannelMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChannelMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
