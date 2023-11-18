import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertModule } from 'app/zdslogic-shell/@fuse/components/alert';
import { SharedModule } from 'app/zdslogic-shell/shared/shared.module';
import { ResetPasswordClassicComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/reset-password/classic/reset-password.component';
import { ResetPasswordModernComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/reset-password/modern/reset-password.component';
import { ResetPasswordModernReversedComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/reset-password/modern-reversed/reset-password.component';
import { ResetPasswordFullscreenComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/reset-password/fullscreen/reset-password.component';
import { ResetPasswordFullscreenReversedComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/reset-password/fullscreen-reversed/reset-password.component';
import { ResetPasswordSplitScreenComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/reset-password/split-screen/reset-password.component';
import { ResetPasswordSplitScreenReversedComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/reset-password/split-screen-reversed/reset-password.component';

const routes: Routes = [
    {
        path    : 'reset-password',
        children: [
            {
                path     : 'classic',
                component: ResetPasswordClassicComponent
            },
            {
                path     : 'modern',
                component: ResetPasswordModernComponent
            },
            {
                path     : 'modern-reversed',
                component: ResetPasswordModernReversedComponent
            },
            {
                path     : 'split-screen',
                component: ResetPasswordSplitScreenComponent
            },
            {
                path     : 'split-screen-reversed',
                component: ResetPasswordSplitScreenReversedComponent
            },
            {
                path     : 'fullscreen',
                component: ResetPasswordFullscreenComponent
            },
            {
                path     : 'fullscreen-reversed',
                component: ResetPasswordFullscreenReversedComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        ResetPasswordClassicComponent,
        ResetPasswordModernComponent,
        ResetPasswordModernReversedComponent,
        ResetPasswordFullscreenComponent,
        ResetPasswordFullscreenReversedComponent,
        ResetPasswordSplitScreenComponent,
        ResetPasswordSplitScreenReversedComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseAlertModule,
        SharedModule
    ]
})
export class ResetPasswordModule
{
}
