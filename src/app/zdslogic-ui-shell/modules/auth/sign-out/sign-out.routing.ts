import { Route } from '@angular/router';
import { AuthSignOutComponent } from 'app/zdslogic-ui-shell/modules/auth/sign-out/sign-out.component';

export const authSignOutRoutes: Route[] = [
    {
        path     : '',
        component: AuthSignOutComponent
    }
];
