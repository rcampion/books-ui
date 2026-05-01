import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChannelDataComponent } from './chat-channel-data.component';

describe('ChatChannelDataComponent', () => {
  let component: ChatChannelDataComponent;
  let fixture: ComponentFixture<ChatChannelDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ChatChannelDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChannelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
