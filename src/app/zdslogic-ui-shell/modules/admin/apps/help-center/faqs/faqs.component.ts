import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HelpCenterService } from 'app/zdslogic-ui-shell/modules/admin/apps/help-center/help-center.service';
import { FaqCategory } from 'app/zdslogic-ui-shell/modules/admin/apps/help-center/help-center.type';

@Component({
    selector     : 'help-center-faqs',
    templateUrl  : './faqs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HelpCenterFaqsComponent implements OnInit, OnDestroy
{
    faqCategories: FaqCategory[];
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
        // Get the FAQs
        this._helpCenterService.faqs$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((faqCategories): any {
                this.faqCategories = faqCategories;
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
