import { Component } from '@angular/core';
import { GuidesComponent } from 'app/zdslogic-ui-shell/modules/admin/docs/guides/guides.component';

@Component({
    selector   : 'prerequisites',
    templateUrl: './prerequisites.html'
})
export class PrerequisitesComponent
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
