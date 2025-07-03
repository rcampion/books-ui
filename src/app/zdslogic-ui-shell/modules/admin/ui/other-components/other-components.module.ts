import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseHighlightModule } from 'app/zdslogic-ui-shell/@fuse/components/highlight';
import { FuseAlertModule } from 'app/zdslogic-ui-shell/@fuse/components/alert';
import { FuseNavigationModule } from 'app/zdslogic-ui-shell/@fuse/components/navigation';
import { FuseScrollResetModule } from 'app/zdslogic-ui-shell/@fuse/directives/scroll-reset';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { OtherComponentsComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/other-components.component';
import { OverviewComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/overview/overview.component';
import { LanguagesComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/languages/languages.component';
import { MessagesComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/messages/messages.component';
import { NotificationsComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/notifications/notifications.component';
import { QuickChatComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/quick-chat/quick-chat.component';
import { SearchComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/search/search.component';
import { ShortcutsComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/shortcuts/shortcuts.component';
import { UserComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/user/user.component';
import { ApexChartsComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/third-party/apex-charts/apex-charts.component';
import { NgxMarkdownComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/third-party/ngx-markdown/ngx-markdown.component';
import { QuillEditorComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/third-party/quill-editor/quill-editor.component';
import { otherComponentsRoutes } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/other-components.routing';

@NgModule({
    declarations: [
        OtherComponentsComponent,
        OverviewComponent,
        LanguagesComponent,
        MessagesComponent,
        NotificationsComponent,
        QuickChatComponent,
        SearchComponent,
        ShortcutsComponent,
        UserComponent,
        ApexChartsComponent,
        NgxMarkdownComponent,
        QuillEditorComponent
    ],
    imports     : [
        RouterModule.forChild(otherComponentsRoutes),
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        FuseHighlightModule,
        FuseAlertModule,
        FuseNavigationModule,
        FuseScrollResetModule,
        SharedModule
    ]
})
export class OtherComponentsModule
{
}
