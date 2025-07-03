import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from 'app/zdslogic-ui-shell/@fuse/animations/public-api';

@Component({
    selector     : 'colors',
    templateUrl  : './colors.component.html',
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ColorsComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
