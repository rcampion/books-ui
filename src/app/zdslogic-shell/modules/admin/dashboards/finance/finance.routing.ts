import { Route } from '@angular/router';
import { FinanceComponent } from 'app/zdslogic-shell/modules/admin/dashboards/finance/finance.component';
import { FinanceResolver } from 'app/zdslogic-shell/modules/admin/dashboards/finance/finance.resolvers';

export const financeRoutes: Route[] = [
    {
        path     : '',
        component: FinanceComponent,
        resolve  : {
            data: FinanceResolver
        }
    }
];
