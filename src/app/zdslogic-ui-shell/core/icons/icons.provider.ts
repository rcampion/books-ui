import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider } from '@angular/core';
import { IconsService } from 'app/zdslogic-ui-shell/core/icons/icons.service';

export const provideIcons = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(IconsService),
            multi   : true,
        },
    ];
};
