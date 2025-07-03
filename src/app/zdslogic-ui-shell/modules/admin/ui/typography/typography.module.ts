import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseHighlightModule } from 'app/zdslogic-ui-shell/@fuse/components/highlight';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { TypographyComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/typography/typography.component';

export const routes: Route[] = [
    {
        path     : '',
        component: TypographyComponent
    }
];

@NgModule({
    declarations: [
        TypographyComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatTabsModule,
        FuseHighlightModule,
        SharedModule
    ]
})
export class TypographyModule
{
}
