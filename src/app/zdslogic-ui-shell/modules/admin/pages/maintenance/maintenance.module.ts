import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaintenanceComponent } from 'app/zdslogic-ui-shell/modules/admin/pages/maintenance/maintenance.component';
import { maintenanceRoutes } from 'app/zdslogic-ui-shell/modules/admin/pages/maintenance/maintenance.routing';

@NgModule({
    declarations: [
        MaintenanceComponent
    ],
    imports     : [
        RouterModule.forChild(maintenanceRoutes)
    ]
})
export class MaintenanceModule
{
}
