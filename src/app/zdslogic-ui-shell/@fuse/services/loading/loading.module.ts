import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FuseLoadingInterceptor } from 'app/zdslogic-ui-shell/@fuse/services/loading/loading.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: FuseLoadingInterceptor,
            multi   : true
        }
    ]
})
export class FuseLoadingModule
{
}
