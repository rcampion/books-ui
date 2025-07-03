import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from 'app/zdslogic-ui-shell/@fuse/components/card';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { PricingTableComponent } from 'app/zdslogic-ui-shell/modules/admin/pages/pricing/table/table.component';
import { pricingTableRoutes } from 'app/zdslogic-ui-shell/modules/admin/pages/pricing/table/table.routing';

@NgModule({
    declarations: [
        PricingTableComponent
    ],
    imports     : [
        RouterModule.forChild(pricingTableRoutes),
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        SharedModule
    ]
})
export class PricingTableModule
{
}
