import { Route } from '@angular/router';
import { AnalyticsComponent } from 'app/zdslogic-shell/modules/admin/dashboards/analytics/analytics.component';
import { AnalyticsResolver } from 'app/zdslogic-shell/modules/admin/dashboards/analytics/analytics.resolvers';

export const analyticsRoutes: Route[] = [
    {
        path     : '',
        component: AnalyticsComponent,
        resolve  : {
            data: AnalyticsResolver
        }
    }
];
