import { NgModule } from '@angular/core';
import { FuseScrollResetDirective } from 'app/zdslogic-ui-shell/@fuse/directives/scroll-reset/scroll-reset.directive';

@NgModule({
    declarations: [
        FuseScrollResetDirective
    ],
    exports     : [
        FuseScrollResetDirective
    ]
})
export class FuseScrollResetModule
{
}
