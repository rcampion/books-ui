import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from 'app/zdslogic-shell/@fuse/components/card/card.module';
import { FuseAlertModule } from 'app/zdslogic-shell/@fuse/components/alert/alert.module';
import { AuthUnlockSessionComponent } from './unlock-session.component';
//import { SharedModule } from 'primeng/api';
//import { FuseCardModule } from 'app/zdslogic-shell/@fuse/components/card';
//import { FuseAlertModule } from 'app/zdslogic-shell/@fuse/components/alert';
import { SharedModule } from 'app/zdslogic-shell/shared/shared.module';
//import { AuthUnlockSessionComponent } from 'app/zdslogic-shell/modules/auth/unlock-session/unlock-session.component';
import { authUnlockSessionRoutes } from './unlock-session.routing';

@NgModule({
	declarations: [
		AuthUnlockSessionComponent
	],
	imports: [
		RouterModule.forChild(authUnlockSessionRoutes),
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatProgressSpinnerModule,
		FuseCardModule,
		FuseAlertModule,
		SharedModule
	]
})
export class AuthUnlockSessionModule {
}
