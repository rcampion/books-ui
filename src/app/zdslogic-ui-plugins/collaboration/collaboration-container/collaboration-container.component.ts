import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';
import { Subject } from 'rxjs';
import { FuseNavigationItem } from 'app/zdslogic-ui-shell/@fuse/components/navigation';

@UntilDestroy()
@Component({
  selector: 'app-collaboration-container',
  templateUrl: './collaboration-container.component.html',
  styleUrls: ['./collaboration-container.component.scss'],
  //encapsulation: ViewEncapsulation.None,
})
export class CollaborationContainerComponent implements OnInit, AfterViewInit {
  //@ViewChild("popupChat") chat: PopupComponent;

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  contactMenu: FuseNavigationItem[];

  @ViewChild("emailSidenav")
  emailSidenav!: MatSidenav;

	isUserLoggedIn: boolean = false;
	isUserAuthorized: boolean = false;
	isUserSubscribed: boolean = false;

  constructor(private observer: BreakpointObserver,
  	private router: Router,
		private errorHandler: ErrorHandlerService,
		private dataSharingService: DataSharingService
		) {

		this.dataSharingService.isUserLoggedIn.subscribe((value) => {
			this.isUserLoggedIn = value;
		});

		this.dataSharingService.isUserAuthorized.subscribe((value) => {
			this.isUserAuthorized = value;
		});

		this.dataSharingService.isUserSubscribed.subscribe((value) => {
			this.isUserSubscribed = value;
		});

	}

  ngOnInit(): void {
    this.contactMenu = [
        {
          title   : '',
          type    : 'group',
          children: [
            {
                title: 'Call',
                type : 'basic',
                icon : 'heroicons_outline:phone',
                link : 'call'
            },
            {
                title: 'Chat',
                type : 'basic',
                icon : 'heroicons_outline:chat-alt',
                link : 'chat'
            },
            {
                title: 'Email',
                type : 'basic',
                icon : 'heroicons_outline:mail',
                link : 'email'
            },
            {
              title: 'Meet',
              type : 'basic',
              icon : 'heroicons_outline:video-camera',
              link : '/meet'
          },
          ]
        }
    ];
  }

  ngOnDestroy(): void
  {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngAfterViewInit(): void {
    //this.emailSidenav.open();

    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          //this.emailSidenav.mode = 'over';
          //this.emailSidenav.close();
        } else {
          // this.emailSidenav.mode = 'side';
          // this.emailSidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        // if (this.emailSidenav.mode === 'over') {
        //   //this.sidenav.close();
        // }
      });
  }

	public redirectToMeet= (): void => {
		const url = '/meet';
		this.router.navigate([url]);
	};
}
