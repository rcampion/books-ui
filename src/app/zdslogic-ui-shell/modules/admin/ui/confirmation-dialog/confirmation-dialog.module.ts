import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseHighlightModule } from 'app/zdslogic-ui-shell/@fuse/components/highlight';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { ConfirmationDialogComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/confirmation-dialog/confirmation-dialog.component';

export const routes: Route[] = [
    {
        path     : '',
        component: ConfirmationDialogComponent
    }
];

@NgModule({
    declarations: [
        ConfirmationDialogComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FuseHighlightModule,
        SharedModule
    ]
})
export class ConfirmationDialogModule
{
}
