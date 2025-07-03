import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from 'app/zdslogic-ui-shell/@fuse/components/card';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { PricingSingleComponent } from 'app/zdslogic-ui-shell/modules/admin/pages/pricing/single/single.component';
import { pricingSingleRoutes } from 'app/zdslogic-ui-shell/modules/admin/pages/pricing/single/single.routing';

@NgModule({
    declarations: [
        PricingSingleComponent
    ],
    imports     : [
        RouterModule.forChild(pricingSingleRoutes),
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        SharedModule
    ]
})
export class PricingSingleModule
{
}
