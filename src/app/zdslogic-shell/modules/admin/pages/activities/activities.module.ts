import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/zdslogic-shell/shared/shared.module';
import { ActivitiesComponent } from 'app/zdslogic-shell/modules/admin/pages/activities/activities.component';
import { activitiesRoutes } from 'app/zdslogic-shell/modules/admin/pages/activities/activities.routing';

@NgModule({
    declarations: [
        ActivitiesComponent
    ],
    imports     : [
        RouterModule.forChild(activitiesRoutes),
        MatIconModule,
        SharedModule
    ]
})
export class ActivitiesModule
{
}
