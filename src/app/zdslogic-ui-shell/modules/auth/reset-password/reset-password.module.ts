import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from 'app/zdslogic-ui-shell/@fuse/components/card';
import { FuseAlertModule } from 'app/zdslogic-ui-shell/@fuse/components/alert';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { AuthResetPasswordComponent } from 'app/zdslogic-ui-shell/modules/auth/reset-password/reset-password.component';
import { authResetPasswordRoutes } from 'app/zdslogic-ui-shell/modules/auth/reset-password/reset-password.routing';

@NgModule({
    declarations: [
        AuthResetPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(authResetPasswordRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule
    ]
})
export class AuthResetPasswordModule
{
}
