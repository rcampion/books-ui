import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseNavigationItem } from 'app/zdslogic-ui-shell/@fuse/components/navigation';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from 'app/zdslogic-ui-shell/@fuse/services/media-watcher';

@Component({
    selector     : 'src/@fuse-components',
    templateUrl  : 'src/@fuse-components.component.html',
    styleUrls    : ['src/@fuse-components.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseComponentsComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    drawerOpened: boolean;
    menuData: FuseNavigationItem[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService
    )
    {
        this.menuData = [
            {
                id      : 'src/@fuse-components.libraries',
                title   : 'Libraries',
                type    : 'group',
                children: [
                    {
                        id   : 'src/@fuse-components.libraries.mock-api',
                        title: 'MockAPI',
                        type : 'basic',
                        link : '/ui/fuse-components/libraries/mock-api'
                    }
                ]
            },
            {
                id      : 'src/@fuse-components.components',
                title   : 'Components',
                type    : 'group',
                children: [
                    {
                        id   : 'src/@fuse-components.components.alert',
                        title: 'Alert',
                        type : 'basic',
                        link : '/ui/fuse-components/components/alert'
                    },
                    {
                        id   : 'src/@fuse-components.components.card',
                        title: 'Card',
                        type : 'basic',
                        link : '/ui/fuse-components/components/card'
                    },
                    {
                        id   : 'src/@fuse-components.components.drawer',
                        title: 'Drawer',
                        type : 'basic',
                        link : '/ui/fuse-components/components/drawer'
                    },
                    {
                        id   : 'src/@fuse-components.components.fullscreen',
                        title: 'Fullscreen',
                        type : 'basic',
                        link : '/ui/fuse-components/components/fullscreen'
                    },
                    {
                        id   : 'src/@fuse-components.components.highlight',
                        title: 'Highlight',
                        type : 'basic',
                        link : '/ui/fuse-components/components/highlight'
                    },
                    {
                        id   : 'src/@fuse-components.components.loading-bar',
                        title: 'Loading Bar',
                        type : 'basic',
                        link : '/ui/fuse-components/components/loading-bar'
                    },
                    {
                        id   : 'src/@fuse-components.components.masonry',
                        title: 'Masonry',
                        type : 'basic',
                        link : '/ui/fuse-components/components/masonry'
                    },
                    {
                        id   : 'src/@fuse-components.components.navigation',
                        title: 'Navigation',
                        type : 'basic',
                        link : '/ui/fuse-components/components/navigation'
                    }
                ]
            },
            {
                id      : 'src/@fuse-components.directives',
                title   : 'Directives',
                type    : 'group',
                children: [
                    {
                        id   : 'src/@fuse-components.directives.scrollbar',
                        title: 'Scrollbar',
                        type : 'basic',
                        link : '/ui/fuse-components/directives/scrollbar'
                    },
                    {
                        id   : 'src/@fuse-components.directives.scroll-reset',
                        title: 'ScrollReset',
                        type : 'basic',
                        link : '/ui/fuse-components/directives/scroll-reset'
                    }
                ]
            },
            {
                id      : 'src/@fuse-components.services',
                title   : 'Services',
                type    : 'group',
                children: [
                    {
                        id   : 'src/@fuse-components.services.config',
                        title: 'Config',
                        type : 'basic',
                        link : '/ui/fuse-components/services/config'
                    },
                    {
                        id   : 'src/@fuse-components.services.confirmation',
                        title: 'Confirmation',
                        type : 'basic',
                        link : '/ui/fuse-components/services/confirmation'
                    },
                    {
                        id   : 'src/@fuse-components.services.splash-screen',
                        title: 'SplashScreen',
                        type : 'basic',
                        link : '/ui/fuse-components/services/splash-screen'
                    },
                    {
                        id   : 'src/@fuse-components.services.media-watcher',
                        title: 'MediaWatcher',
                        type : 'basic',
                        link : '/ui/fuse-components/services/media-watcher'
                    }
                ]
            },
            {
                id      : 'src/@fuse-components.pipes',
                title   : 'Pipes',
                type    : 'group',
                children: [
                    {
                        id   : 'src/@fuse-components.pipes.find-by-key',
                        title: 'FindByKey',
                        type : 'basic',
                        link : '/ui/fuse-components/pipes/find-by-key'
                    }
                ]
            },
            {
                id      : 'src/@fuse-components.validators',
                title   : 'Validators',
                type    : 'group',
                children: [
                    {
                        id   : 'src/@fuse-components.validators.must-match',
                        title: 'MustMatch',
                        type : 'basic',
                        link : '/ui/fuse-components/validators/must-match'
                    }
                ]
            }
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to media query change
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}): any {

                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('md') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
