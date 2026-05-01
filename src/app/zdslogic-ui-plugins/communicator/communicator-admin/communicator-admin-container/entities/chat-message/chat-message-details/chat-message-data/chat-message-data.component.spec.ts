import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageDataComponent } from './chat-message-data.component';

describe('ChatMessageDataComponent', () => {
  let component: ChatMessageDataComponent;
  let fixture: ComponentFixture<ChatMessageDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ChatMessageDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
