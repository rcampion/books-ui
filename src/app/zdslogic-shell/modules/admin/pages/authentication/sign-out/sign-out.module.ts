import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'app/zdslogic-shell/shared/shared.module';
import { SignOutClassicComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/sign-out/classic/sign-out.component';
import { SignOutModernComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/sign-out/modern/sign-out.component';
import { SignOutModernReversedComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/sign-out/modern-reversed/sign-out.component';
import { SignOutFullscreenComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/sign-out/fullscreen/sign-out.component';
import { SignOutFullscreenReversedComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/sign-out/fullscreen-reversed/sign-out.component';
import { SignOutSplitScreenComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/sign-out/split-screen/sign-out.component';
import { SignOutSplitScreenReversedComponent } from 'app/zdslogic-shell/modules/admin/pages/authentication/sign-out/split-screen-reversed/sign-out.component';

const routes: Routes = [
    {
        path    : 'sign-out',
        children: [
            {
                path     : 'classic',
                component: SignOutClassicComponent
            },
            {
                path     : 'modern',
                component: SignOutModernComponent
            },
            {
                path     : 'modern-reversed',
                component: SignOutModernReversedComponent
            },
            {
                path     : 'split-screen',
                component: SignOutSplitScreenComponent
            },
            {
                path     : 'split-screen-reversed',
                component: SignOutSplitScreenReversedComponent
            },
            {
                path     : 'fullscreen',
                component: SignOutFullscreenComponent
            },
            {
                path     : 'fullscreen-reversed',
                component: SignOutFullscreenReversedComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        SignOutClassicComponent,
        SignOutModernComponent,
        SignOutModernReversedComponent,
        SignOutFullscreenComponent,
        SignOutFullscreenReversedComponent,
        SignOutSplitScreenComponent,
        SignOutSplitScreenReversedComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatInputModule,
        SharedModule
    ]
})
export class SignOutModule
{
}
