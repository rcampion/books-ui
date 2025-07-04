import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthModule } from 'app/zdslogic-ui-shell/core/auth/auth.module';
import { IconsModule } from 'app/zdslogic-ui-shell/core/icons/icons.module';
import { TranslocoCoreModule } from 'app/zdslogic-ui-shell/core/transloco/transloco.module';

@NgModule({
    imports: [
        AuthModule,
        IconsModule,
        TranslocoCoreModule
    ]
})
export class CoreModule
{
    /**
     * Constructor
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    )
    {
        // Do not allow multiple injections
        if ( parentModule )
        {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
