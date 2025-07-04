import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from 'app/zdslogic-ui-shell/@fuse/lib/mock-api';
import { feather, heroicons, material } from 'app/zdslogic-ui-shell/mock-api/ui/icons/data';

@Injectable({
    providedIn: 'root'
})
export class IconsMockApi
{
    private readonly _feather: any = feather;
    private readonly _heroicons: any = heroicons;
    private readonly _material: any = material;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Feather icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ui/icons/feather')
            .reply(() => [
                200,
                {
                    namespace: 'feather',
                    name     : 'Feather',
                    grid     : 'icon-size-6',
                    list     : cloneDeep(this._feather)
                }
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Heroicons outline icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ui/icons/heroicons-outline')
            .reply(() => [
                200,
                {
                    namespace: 'heroicons_outline',
                    name     : 'Heroicons Outline',
                    grid     : 'icon-size-6',
                    list     : cloneDeep(this._heroicons)
                }
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Heroicons solid icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ui/icons/heroicons-solid')
            .reply(() => [
                200,
                {
                    namespace: 'heroicons_solid',
                    name     : 'Heroicons Solid',
                    grid     : 'icon-size-5',
                    list     : cloneDeep(this._heroicons)
                }
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Material solid icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ui/icons/material-solid')
            .reply(() => [
                200,
                {
                    namespace: 'mat_solid',
                    name     : 'Material Solid',
                    grid     : 'icon-size-6',
                    list     : cloneDeep(this._material)
                }
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Material outline icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ui/icons/material-outline')
            .reply(() => [
                200,
                {
                    namespace: 'mat_outline',
                    name     : 'Material Outline',
                    grid     : 'icon-size-6',
                    list     : cloneDeep(this._material)
                }
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Material twotone icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ui/icons/material-twotone')
            .reply(() => [
                200,
                {
                    namespace: '',
                    name     : 'Material Twotone',
                    grid     : 'icon-size-6',
                    list     : cloneDeep(this._material)
                }
            ]);
    }
}
