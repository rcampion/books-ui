import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageListComponent } from './chat-message-list.component';

describe('ContactListComponent', () => {
  let component: ChatMessageListComponent;
  let fixture: ComponentFixture<ChatMessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ChatMessageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
