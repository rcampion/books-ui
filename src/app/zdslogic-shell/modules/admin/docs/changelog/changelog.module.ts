import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/zdslogic-shell/shared/shared.module';
import { ChangelogComponent } from 'app/zdslogic-shell/modules/admin/docs/changelog/changelog';
import { changelogRoutes } from 'app/zdslogic-shell/modules/admin/docs/changelog/changelog.routing';

@NgModule({
    declarations: [
        ChangelogComponent
    ],
    imports     : [
        RouterModule.forChild(changelogRoutes),
        SharedModule
    ]
})
export class ChangelogModule
{
}
