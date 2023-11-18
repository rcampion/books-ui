import { Route } from '@angular/router';
import { AuthSignUpComponent } from 'app/zdslogic-shell/modules/auth/sign-up/sign-up.component';

export const authSignupRoutes: Route[] = [
    {
        path     : '',
        component: AuthSignUpComponent
    }
];
