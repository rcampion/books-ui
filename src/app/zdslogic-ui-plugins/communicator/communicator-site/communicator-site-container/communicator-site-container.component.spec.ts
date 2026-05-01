import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicatorSiteContainerComponent } from './communicator-site-container.component';

describe('CommunicatorSiteContainerComponent', () => {
  let component: CommunicatorSiteContainerComponent;
  let fixture: ComponentFixture<CommunicatorSiteContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicatorSiteContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunicatorSiteContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
