import { Route } from '@angular/router';
import { NotesComponent } from 'app/zdslogic-shell/modules/admin/apps/notes/notes.component';
import { NotesListComponent } from 'app/zdslogic-shell/modules/admin/apps/notes/list/list.component';

export const notesRoutes: Route[] = [
    {
        path     : '',
        component: NotesComponent,
        children : [
            {
                path     : '',
                component: NotesListComponent
            }
        ]
    }
];
