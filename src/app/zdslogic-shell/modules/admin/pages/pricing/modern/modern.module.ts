import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from 'app/zdslogic-shell/@fuse/components/card';
import { SharedModule } from 'app/zdslogic-shell/shared/shared.module';
import { PricingModernComponent } from 'app/zdslogic-shell/modules/admin/pages/pricing/modern/modern.component';
import { pricingModernRoutes } from 'app/zdslogic-shell/modules/admin/pages/pricing/modern/modern.routing';

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
