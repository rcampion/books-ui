import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseHighlightModule } from 'app/zdslogic-ui-shell/@fuse/components/highlight';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { ColorsComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/colors/colors.component';

export const routes: Route[] = [
    {
        path     : '',
        component: ColorsComponent
    }
];

@NgModule({
    declarations: [
        ColorsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatIconModule,
        MatRippleModule,
        MatTabsModule,
        FuseHighlightModule,
        SharedModule
    ]
})
export class ColorsModule
{
}
