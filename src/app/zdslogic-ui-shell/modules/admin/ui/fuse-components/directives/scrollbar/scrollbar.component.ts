import { Component } from '@angular/core';
import { FuseComponentsComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/fuse-components/fuse-components.component';

@Component({
    selector   : 'scrollbar',
    templateUrl: './scrollbar.component.html'
})
export class ScrollbarComponent
{
    /**
     * Constructor
     */
    constructor(private _fuseComponentsComponent: FuseComponentsComponent)
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
        this._fuseComponentsComponent.matDrawer.toggle();
    }
}
