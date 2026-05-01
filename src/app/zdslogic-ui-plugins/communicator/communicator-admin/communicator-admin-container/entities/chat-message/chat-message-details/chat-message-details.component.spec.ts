import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageDetailsComponent } from './chat-message-details.component';

describe('ContactDetailsComponent', () => {
  let component: ChatMessageDetailsComponent;
  let fixture: ComponentFixture<ChatMessageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ChatMessageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
