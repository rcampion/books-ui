import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from 'app/zdslogic-shell/@fuse/components/card';
import { SharedModule } from 'app/zdslogic-shell/shared/shared.module';
import { PricingSimpleComponent } from 'app/zdslogic-shell/modules/admin/pages/pricing/simple/simple.component';
import { pricingSimpleRoutes } from 'app/zdslogic-shell/modules/admin/pages/pricing/simple/simple.routing';

@NgModule({
    declarations: [
        PricingSimpleComponent
    ],
    imports     : [
        RouterModule.forChild(pricingSimpleRoutes),
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        SharedModule
    ]
})
export class PricingSimpleModule
{
}
