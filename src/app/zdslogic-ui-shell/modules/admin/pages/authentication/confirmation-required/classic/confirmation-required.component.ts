import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from 'app/zdslogic-ui-shell/@fuse/animations/public-api';

@Component({
    selector     : 'confirmation-required-classic',
    templateUrl  : './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ConfirmationRequiredClassicComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
