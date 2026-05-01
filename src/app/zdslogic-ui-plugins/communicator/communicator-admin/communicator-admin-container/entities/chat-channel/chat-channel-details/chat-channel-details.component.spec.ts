import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChannelDetailsComponent } from './chat-channel-details.component';

describe('ContactDetailsComponent', () => {
  let component: ChatChannelDetailsComponent;
  let fixture: ComponentFixture<ChatChannelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ChatChannelDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChannelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
