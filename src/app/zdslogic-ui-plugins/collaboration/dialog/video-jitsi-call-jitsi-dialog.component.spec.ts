import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoJitsiCallDialogComponent } from './video-jitsi-call-dialog.component';

describe('DeleteDialogComponent', () => {
  let component: VideoJitsiCallDialogComponent;
  let fixture: ComponentFixture<VideoJitsiCallDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ VideoJitsiCallDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoJitsiCallDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
