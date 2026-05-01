import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChannelListComponent } from './chat-channel-list.component';

describe('ContactListComponent', () => {
  let component: ChatChannelListComponent;
  let fixture: ComponentFixture<ChatChannelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ChatChannelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChannelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
