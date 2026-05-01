import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChannelUpdateComponent } from './chat-channel-update.component';

describe('ContactUpdateComponent', () => {
  let component: ChatChannelUpdateComponent;
  let fixture: ComponentFixture<ChatChannelUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ ChatChannelUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChannelUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
