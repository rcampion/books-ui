import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistFilesListComponent } from './blacklist-files-list.component';

describe('BlacklistFilesListComponent', () => {
  let component: BlacklistFilesListComponent;
  let fixture: ComponentFixture<BlacklistFilesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ BlacklistFilesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistFilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
