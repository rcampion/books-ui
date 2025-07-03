import { NgModule } from '@angular/core';
import { AppHeaderComponent } from './app-header.component';
import { SharedModule } from 'app/zdslogic-ui-shell/shared/shared.module';

@NgModule({
    declarations: [
      AppHeaderComponent
    ],
    imports     : [
        SharedModule,

    ],
    exports     : [
      AppHeaderComponent
    ]
})
export class AppHeaderModule
{
}
