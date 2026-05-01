import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborationContainerComponent } from './collaboration-container.component';

describe('CollaborationContainerComponent', () => {
  let component: CollaborationContainerComponent;
  let fixture: ComponentFixture<CollaborationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ CollaborationContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
