import { NgModule } from '@angular/core';
import { SignInModule } from 'app/zdslogic-ui-shell/modules/admin/pages/authentication/sign-in/sign-in.module';
import { SignUpModule } from 'app/zdslogic-ui-shell/modules/admin/pages/authentication/sign-up/sign-up.module';
import { SignOutModule } from 'app/zdslogic-ui-shell/modules/admin/pages/authentication/sign-out/sign-out.module';
import { ForgotPasswordModule } from 'app/zdslogic-ui-shell/modules/admin/pages/authentication/forgot-password/forgot-password.module';
import { ResetPasswordModule } from 'app/zdslogic-ui-shell/modules/admin/pages/authentication/reset-password/reset-password.module';
import { UnlockSessionModule } from 'app/zdslogic-ui-shell/modules/admin/pages/authentication/unlock-session/unlock-session.module';
import { ConfirmationRequiredModule } from 'app/zdslogic-ui-shell/modules/admin/pages/authentication/confirmation-required/confirmation-required.module';

@NgModule({
    imports: [
        SignInModule,
        SignUpModule,
        SignOutModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        UnlockSessionModule,
        ConfirmationRequiredModule
    ],
    exports: [
        SignInModule,
        SignUpModule,
        SignOutModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        UnlockSessionModule,
        ConfirmationRequiredModule
    ]
})
export class AuthenticationModule
{
}
