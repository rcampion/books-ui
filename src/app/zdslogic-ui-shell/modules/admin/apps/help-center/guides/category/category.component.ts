import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HelpCenterService } from 'app/zdslogic-ui-shell/modules/admin/apps/help-center/help-center.service';
import { GuideCategory } from 'app/zdslogic-ui-shell/modules/admin/apps/help-center/help-center.type';

@Component({
    selector     : 'help-center-guides-category',
    templateUrl  : './category.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HelpCenterGuidesCategoryComponent implements OnInit, OnDestroy
{
    guideCategory: GuideCategory;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _helpCenterService: HelpCenterService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the Guides
        this._helpCenterService.guides$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((guideCategories): any {
                this.guideCategory = guideCategories[0];
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
