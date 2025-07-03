import { Route } from '@angular/router';
import { ProjectComponent } from 'app/zdslogic-ui-shell/modules/admin/dashboards/project/project.component';
import { ProjectResolver } from 'app/zdslogic-ui-shell/modules/admin/dashboards/project/project.resolvers';

export const projectRoutes: Route[] = [
    {
        path     : '',
        component: ProjectComponent,
        resolve  : {
            data: ProjectResolver
        }
    }
];
