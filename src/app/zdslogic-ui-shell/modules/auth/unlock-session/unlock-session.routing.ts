import { Route } from '@angular/router';
import { AuthUnlockSessionComponent } from './unlock-session.component';
//import { AuthUnlockSessionComponent } from 'app/zdslogic-ui-shell/modules/auth/unlock-session/unlock-session.component';

export const authUnlockSessionRoutes: Route[] = [
    {
        path     : '',
        component: AuthUnlockSessionComponent
    }
];
