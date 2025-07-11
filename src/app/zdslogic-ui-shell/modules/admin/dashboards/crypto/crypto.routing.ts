import { Route } from '@angular/router';
import { CryptoComponent } from 'app/zdslogic-ui-shell/modules/admin/dashboards/crypto/crypto.component';
import { CryptoResolver } from 'app/zdslogic-ui-shell/modules/admin/dashboards/crypto/crypto.resolvers';

export const cryptoRoutes: Route[] = [
    {
        path     : '',
        component: CryptoComponent,
        resolve  : {
            data: CryptoResolver
        }
    }
];
