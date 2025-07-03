import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from 'app/zdslogic-ui-shell/@fuse/components/card';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { PricingModernComponent } from 'app/zdslogic-ui-shell/modules/admin/pages/pricing/modern/modern.component';
import { pricingModernRoutes } from 'app/zdslogic-ui-shell/modules/admin/pages/pricing/modern/modern.routing';

@NgModule({
    declarations: [
        PricingModernComponent
    ],
    imports     : [
        RouterModule.forChild(pricingModernRoutes),
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        SharedModule
    ]
})
export class PricingModernModule
{
}
