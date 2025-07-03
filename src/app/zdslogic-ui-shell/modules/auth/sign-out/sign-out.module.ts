import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from 'app/zdslogic-ui-shell/@fuse/components/card';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { AuthSignOutComponent } from 'app/zdslogic-ui-shell/modules/auth/sign-out/sign-out.component';
import { authSignOutRoutes } from 'app/zdslogic-ui-shell/modules/auth/sign-out/sign-out.routing';

@NgModule({
    declarations: [
        AuthSignOutComponent
    ],
    imports     : [
        RouterModule.forChild(authSignOutRoutes),
        MatButtonModule,
        FuseCardModule,
        SharedModule
    ]
})
export class AuthSignOutModule
{
}
