import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MainFooterComponent } from './footer.component';
import { SharedModule } from 'app/zdslogic-shell/shared/shared.module';

@NgModule({
    declarations: [
      MainFooterComponent
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        SharedModule
    ],
    exports     : [
      MainFooterComponent
    ]
})
export class FooterModule
{
}
