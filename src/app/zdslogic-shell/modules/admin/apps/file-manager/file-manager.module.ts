import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/zdslogic-shell/shared/shared.module';
import { fileManagerRoutes } from 'app/zdslogic-shell/modules/admin/apps/file-manager/file-manager.routing';
import { FileManagerComponent } from 'app/zdslogic-shell/modules/admin/apps/file-manager/file-manager.component';
import { FileManagerDetailsComponent } from 'app/zdslogic-shell/modules/admin/apps/file-manager/details/details.component';
import { FileManagerListComponent } from 'app/zdslogic-shell/modules/admin/apps/file-manager/list/list.component';

@NgModule({
    declarations: [
        FileManagerComponent,
        FileManagerDetailsComponent,
        FileManagerListComponent
    ],
    imports     : [
        RouterModule.forChild(fileManagerRoutes),
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatTooltipModule,
        SharedModule
    ]
})
export class FileManagerModule
{
}
