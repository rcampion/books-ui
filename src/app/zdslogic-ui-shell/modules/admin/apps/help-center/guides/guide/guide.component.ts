import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HelpCenterService } from 'app/zdslogic-ui-shell/modules/admin/apps/help-center/help-center.service';
import { GuideCategory } from 'app/zdslogic-ui-shell/modules/admin/apps/help-center/help-center.type';

@Component({
    selector     : 'help-center-guides-guide',
    templateUrl  : './guide.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HelpCenterGuidesGuideComponent implements OnInit, OnDestroy
{
    guideCategory: GuideCategory;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * Constructor
     */
    constructor(private _helpCenterService: HelpCenterService)
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
        this._helpCenterService.guide$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((guideCategory): any {
                this.guideCategory = guideCategory;
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
