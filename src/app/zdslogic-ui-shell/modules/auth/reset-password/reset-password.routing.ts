import { Route } from '@angular/router';
import { AuthResetPasswordComponent } from 'app/zdslogic-ui-shell/modules/auth/reset-password/reset-password.component';

export const authResetPasswordRoutes: Route[] = [
    {
        path     : '',
        component: AuthResetPasswordComponent
    }
];
