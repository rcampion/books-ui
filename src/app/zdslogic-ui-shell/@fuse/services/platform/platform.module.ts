import { NgModule } from '@angular/core';
import { FusePlatformService } from 'app/zdslogic-ui-shell/@fuse/services/platform/platform.service';

@NgModule({
    providers: [
        FusePlatformService
    ]
})
export class FusePlatformModule
{
    /**
     * Constructor
     */
    constructor(private _fusePlatformService: FusePlatformService)
    {
    }
}
