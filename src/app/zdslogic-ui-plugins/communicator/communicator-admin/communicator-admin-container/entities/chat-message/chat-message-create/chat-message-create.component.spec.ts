import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageCreateComponent } from './chat-message-create.component';

describe('ContactCreateComponent', () => {
  let component: ChatMessageCreateComponent;
  let fixture: ComponentFixture<ChatMessageCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ChatMessageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
