import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChannelCreateComponent } from './chat-channel-create.component';

describe('ContactCreateComponent', () => {
  let component: ChatChannelCreateComponent;
  let fixture: ComponentFixture<ChatChannelCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ChatChannelCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChannelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
