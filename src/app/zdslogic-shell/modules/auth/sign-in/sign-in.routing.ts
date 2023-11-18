import { Route } from '@angular/router';
import { AuthSignInComponent } from 'app/zdslogic-shell/modules/auth/sign-in/sign-in.component';

export const authSignInRoutes: Route[] = [
    {
        path     : '',
        component: AuthSignInComponent
    }
];
