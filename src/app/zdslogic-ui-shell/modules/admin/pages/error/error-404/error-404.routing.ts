import { Route } from '@angular/router';
import { Error404Component } from 'app/zdslogic-ui-shell/modules/admin/pages/error/error-404/error-404.component';

export const error404Routes: Route[] = [
    {
        path     : '',
        component: Error404Component
    }
];
