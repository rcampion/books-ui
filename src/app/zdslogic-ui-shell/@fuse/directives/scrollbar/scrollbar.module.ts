import { NgModule } from '@angular/core';
import { FuseScrollbarDirective } from 'app/zdslogic-ui-shell/@fuse/directives/scrollbar/scrollbar.directive';

@NgModule({
    declarations: [
        FuseScrollbarDirective
    ],
    exports     : [
        FuseScrollbarDirective
    ]
})
export class FuseScrollbarModule
{
}
