import { NgModule } from '@angular/core';
//import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'app/zdslogic-ui-shell/core/auth/auth.service';
//import { AuthInterceptor } from 'app/zdslogic-ui-shell/core/auth/auth.interceptor';

@NgModule({
    imports  : [
        //HttpClientModule
    ],
    providers: [
        AuthService,
        /*
        {
            provide : HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi   : true
        }
       */
    ]
})
export class AuthModule
{
}
