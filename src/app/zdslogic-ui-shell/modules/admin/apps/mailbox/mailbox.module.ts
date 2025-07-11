import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { QuillModule } from 'ngx-quill';
import { FuseFindByKeyPipeModule } from 'app/zdslogic-ui-shell/@fuse/pipes/find-by-key';
import { FuseNavigationModule } from 'app/zdslogic-ui-shell/@fuse/components/navigation';
import { FuseScrollbarModule } from 'app/zdslogic-ui-shell/@fuse/directives/scrollbar';
import { FuseScrollResetModule } from 'app/zdslogic-ui-shell/@fuse/directives/scroll-reset';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { MailboxComponent } from 'app/zdslogic-ui-shell/modules/admin/apps/mailbox/mailbox.component';
import { MailboxComposeComponent } from 'app/zdslogic-ui-shell/modules/admin/apps/mailbox/compose/compose.component';
import { MailboxDetailsComponent } from 'app/zdslogic-ui-shell/modules/admin/apps/mailbox/details/details.component';
import { MailboxEmptyDetailsComponent } from 'app/zdslogic-ui-shell/modules/admin/apps/mailbox/empty-details/empty-details.component';
import { MailboxListComponent } from 'app/zdslogic-ui-shell/modules/admin/apps/mailbox/list/list.component';
import { MailboxSettingsComponent } from 'app/zdslogic-ui-shell/modules/admin/apps/mailbox/settings/settings.component';
import { MailboxSidebarComponent } from 'app/zdslogic-ui-shell/modules/admin/apps/mailbox/sidebar/sidebar.component';
import { mailboxRoutes } from 'app/zdslogic-ui-shell/modules/admin/apps/mailbox/mailbox.routing';

@NgModule({
    declarations: [
        MailboxComponent,
        MailboxComposeComponent,
        MailboxDetailsComponent,
        MailboxEmptyDetailsComponent,
        MailboxListComponent,
        MailboxSettingsComponent,
        MailboxSidebarComponent
    ],
    imports     : [
        RouterModule.forChild(mailboxRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        QuillModule.forRoot(),
        FuseFindByKeyPipeModule,
        FuseNavigationModule,
        FuseScrollbarModule,
        FuseScrollResetModule,
        SharedModule
    ]
})
export class MailboxModule
{
}
