import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseMasonryComponent } from 'app/zdslogic-ui-shell/@fuse/components/masonry/masonry.component';

@NgModule({
    declarations: [
        FuseMasonryComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        FuseMasonryComponent
    ]
})
export class FuseMasonryModule
{
}
