import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoJitsiPublicComponent } from './video-jitsi-public.component';

describe('VideoComponent', () => {
  let component: VideoJitsiPublicComponent;
  let fixture: ComponentFixture<VideoJitsiPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ VideoJitsiPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoJitsiPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
