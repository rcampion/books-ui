import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEMailsContainerComponent } from './my-emails-container.component';

describe('MyEMailsContainerComponent', () => {
  let component: MyEMailsContainerComponent;
  let fixture: ComponentFixture<MyEMailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ MyEMailsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEMailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
