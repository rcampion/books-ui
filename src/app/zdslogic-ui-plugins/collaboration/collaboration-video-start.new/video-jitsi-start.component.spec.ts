import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoJitsiStartComponent } from './video-jitsi-start.component';

describe('VideoJitsiStartComponent', () => {
  let component: VideoJitsiStartComponent;
  let fixture: ComponentFixture<VideoJitsiStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ VideoJitsiStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoJitsiStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
