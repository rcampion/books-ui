import { Route } from '@angular/router';
import { AuthForgotPasswordComponent } from 'app/zdslogic-ui-shell/modules/auth/forgot-password/forgot-password.component';

export const authForgotPasswordRoutes: Route[] = [
    {
        path     : '',
        component: AuthForgotPasswordComponent
    }
];
