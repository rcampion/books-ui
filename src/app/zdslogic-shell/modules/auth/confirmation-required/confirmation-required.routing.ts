import { Route } from '@angular/router';
import { AuthConfirmationRequiredComponent } from 'app/zdslogic-shell/modules/auth/confirmation-required/confirmation-required.component';

export const authConfirmationRequiredRoutes: Route[] = [
    {
        path     : '',
        component: AuthConfirmationRequiredComponent
    }
];
