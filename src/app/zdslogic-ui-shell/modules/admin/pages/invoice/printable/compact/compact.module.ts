import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CompactComponent } from 'app/zdslogic-ui-shell/modules/admin/pages/invoice/printable/compact/compact.component';
import { compactRoutes } from 'app/zdslogic-ui-shell/modules/admin/pages/invoice/printable/compact/compact.routing';

@NgModule({
    declarations: [
        CompactComponent
    ],
    imports     : [
        RouterModule.forChild(compactRoutes),
        CdkScrollableModule
    ]
})
export class CompactModule
{
}
