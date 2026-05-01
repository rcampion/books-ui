import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoJitsiEnterComponent } from './video-jitsi-enter.component';

describe('VideoComponent', () => {
  let component: VideoJitsiEnterComponent;
  let fixture: ComponentFixture<VideoJitsiEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ VideoJitsiEnterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoJitsiEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
