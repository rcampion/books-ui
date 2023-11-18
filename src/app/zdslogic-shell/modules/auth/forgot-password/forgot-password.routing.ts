import { Route } from '@angular/router';
import { AuthForgotPasswordComponent } from 'app/zdslogic-shell/modules/auth/forgot-password/forgot-password.component';

export const authForgotPasswordRoutes: Route[] = [
    {
        path     : '',
        component: AuthForgotPasswordComponent
    }
];
