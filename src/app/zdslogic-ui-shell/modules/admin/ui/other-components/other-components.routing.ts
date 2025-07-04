import { Route } from '@angular/router';
import { OtherComponentsComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/other-components.component';
import { OverviewComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/overview/overview.component';
import { LanguagesComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/languages/languages.component';
import { MessagesComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/messages/messages.component';
import { NotificationsComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/notifications/notifications.component';
//import { QuickChatComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/quick-chat/quick-chat.component';
import { SearchComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/search/search.component';
import { ShortcutsComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/shortcuts/shortcuts.component';
import { UserComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/common/user/user.component';
import { ApexChartsComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/third-party/apex-charts/apex-charts.component';
import { NgxMarkdownComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/third-party/ngx-markdown/ngx-markdown.component';
import { QuillEditorComponent } from 'app/zdslogic-ui-shell/modules/admin/ui/other-components/third-party/quill-editor/quill-editor.component';

export const otherComponentsRoutes: Route[] = [
    {
        path     : '',
        component: OtherComponentsComponent,
        children : [
            {
                path      : '',
                pathMatch : 'full',
                redirectTo: 'common/overview'
            },
            {
                path    : 'common',
                children: [
                    {
                        path      : '',
                        pathMatch : 'full',
                        redirectTo: 'overview'
                    },
                    {
                        path     : 'overview',
                        component: OverviewComponent
                    },
                    {
                        path     : 'languages',
                        component: LanguagesComponent
                    },
                    {
                        path     : 'messages',
                        component: MessagesComponent
                    },
                    {
                        path     : 'notifications',
                        component: NotificationsComponent
                    },
                    {
                        path     : 'search',
                        component: SearchComponent
                    },
                    {
                        path     : 'shortcuts',
                        component: ShortcutsComponent
                    },
                    {
                        path     : 'user',
                        component: UserComponent
                    }
                ]
            },
            {
                path    : 'third-party',
                children: [
                    {
                        path      : '',
                        pathMatch : 'full',
                        redirectTo: 'apex-charts'
                    },
                    {
                        path     : 'apex-charts',
                        component: ApexChartsComponent
                    },
                    {
                        path     : 'ngx-markdown',
                        component: NgxMarkdownComponent
                    },
                    {
                        path     : 'quill-editor',
                        component: QuillEditorComponent
                    }
                ]
            }
        ]
    }
];
