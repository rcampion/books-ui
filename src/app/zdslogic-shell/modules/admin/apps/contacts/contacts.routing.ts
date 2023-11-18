import { Route } from '@angular/router';
import { CanDeactivateContactsDetails } from 'app/zdslogic-shell/modules/admin/apps/contacts/contacts.guards';
import { ContactsContactResolver, ContactsCountriesResolver, ContactsResolver, ContactsTagsResolver } from 'app/zdslogic-shell/modules/admin/apps/contacts/contacts.resolvers';
import { ContactsComponent } from 'app/zdslogic-shell/modules/admin/apps/contacts/contacts.component';
import { ContactsListComponent } from 'app/zdslogic-shell/modules/admin/apps/contacts/list/list.component';
import { ContactsDetailsComponent } from 'app/zdslogic-shell/modules/admin/apps/contacts/details/details.component';

export const contactsRoutes: Route[] = [
    {
        path     : '',
        component: ContactsComponent,
        resolve  : {
            tags: ContactsTagsResolver
        },
        children : [
            {
                path     : '',
                component: ContactsListComponent,
                resolve  : {
                    contacts : ContactsResolver,
                    countries: ContactsCountriesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : ContactsDetailsComponent,
                        resolve      : {
                            contact  : ContactsContactResolver,
                            countries: ContactsCountriesResolver
                        },
                        canDeactivate: [CanDeactivateContactsDetails]
                    }
                ]
            }
        ]
    }
];
