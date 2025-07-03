import { NgModule } from '@angular/core';
import { FuseSplashScreenService } from 'app/zdslogic-ui-shell/@fuse/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [
        FuseSplashScreenService
    ]
})
export class FuseSplashScreenModule
{
    /**
     * Constructor
     */
    constructor(private _fuseSplashScreenService: FuseSplashScreenService)
    {
    }
}
