import { Component } from '@angular/core';
import { GuidesComponent } from 'app/zdslogic-ui-shell/modules/admin/docs/guides/guides.component';

@Component({
    selector   : 'updating',
    templateUrl: './updating.html'
})
export class UpdatingComponent
{
    /**
     * Constructor
     */
    constructor(private _guidesComponent: GuidesComponent)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the drawer
     */
    toggleDrawer(): void
    {
        // Toggle the drawer
        this._guidesComponent.matDrawer.toggle();
    }
}
