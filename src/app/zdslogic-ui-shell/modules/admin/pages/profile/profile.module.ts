import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from 'app/zdslogic-ui-shell/@fuse/components/card';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { ProfileComponent } from 'app/zdslogic-ui-shell/modules/admin/pages/profile/profile.component';
import { profileRoutes } from 'app/zdslogic-ui-shell/modules/admin/pages/profile/profile.routing';

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports     : [
        RouterModule.forChild(profileRoutes),
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatTooltipModule,
        FuseCardModule,
        SharedModule
    ]
})
export class ProfileModule
{
}
