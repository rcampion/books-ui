import { Route } from '@angular/router';
import { CanDeactivateTasksDetails } from 'app/zdslogic-ui-shell/modules/admin/apps/tasks/tasks.guards';
import { TasksResolver, TasksTagsResolver, TasksTaskResolver } from 'app/zdslogic-ui-shell/modules/admin/apps/tasks/tasks.resolvers';
import { TasksComponent } from 'app/zdslogic-ui-shell/modules/admin/apps/tasks/tasks.component';
import { TasksListComponent } from 'app/zdslogic-ui-shell/modules/admin/apps/tasks/list/list.component';
import { TasksDetailsComponent } from 'app/zdslogic-ui-shell/modules/admin/apps/tasks/details/details.component';

export const tasksRoutes: Route[] = [
    {
        path     : '',
        component: TasksComponent,
        resolve  : {
            tags: TasksTagsResolver
        },
        children : [
            {
                path     : '',
                component: TasksListComponent,
                resolve  : {
                    tasks: TasksResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : TasksDetailsComponent,
                        resolve      : {
                            task: TasksTaskResolver
                        },
                        canDeactivate: [CanDeactivateTasksDetails]
                    }
                ]
            }
        ]
    }
];
