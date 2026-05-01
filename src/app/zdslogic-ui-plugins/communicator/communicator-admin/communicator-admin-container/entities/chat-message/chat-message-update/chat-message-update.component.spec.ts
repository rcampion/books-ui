import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageUpdateComponent } from './chat-message-update.component';

describe('ContactUpdateComponent', () => {
  let component: ChatMessageUpdateComponent;
  let fixture: ComponentFixture<ChatMessageUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ChatMessageUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
