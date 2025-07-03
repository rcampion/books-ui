import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseDrawerModule } from 'app/zdslogic-ui-shell/@fuse/components/drawer';
import { FuseScrollbarModule } from 'app/zdslogic-ui-shell/@fuse/directives/scrollbar';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';
import { QuickChatComponent } from 'app/zdslogic-ui-shell/layout/common/quick-chat/quick-chat.component';
import { MaterialModule } from 'app/zdslogic-ui-base/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        QuickChatComponent
    ],
    imports     : [
        RouterModule,
        MaterialModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseDrawerModule,
        FuseScrollbarModule,
        SharedModule
    ],
    exports     : [
        QuickChatComponent
    ]
})
export class QuickChatModule
{
}
