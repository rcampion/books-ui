import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxFileDetailsComponent } from '../email-inbox/inbox-file-details/inbox-file-details.component';
import { InboxFilesListComponent } from '../email-inbox/inbox-files-list/inbox-files-list.component';

import { SentFileDetailsComponent } from '../email-sent/sent-file-details/sent-file-details.component';
import { SentFilesListComponent } from '../email-sent/sent-files-list/sent-files-list.component';

import { JunkFileDetailsComponent } from '../email-junk/junk-file-details/junk-file-details.component';
import { JunkFilesListComponent } from '../email-junk/junk-files-list/junk-files-list.component';

import { FileUploadComponent } from '../email-file-upload/file-upload.component';
import { ComposeEMailComponent } from '../email-compose/compose-email.component';
import { ReplyEMailComponent } from '../email-reply/reply-email.component';
import { ForwardEMailComponent } from '../email-forward/forward-email.component';
import { BlacklistFilesListComponent } from '../email-blacklist/blacklist-files-list/blacklist-files-list.component';
import { BlacklistFileDetailsComponent } from '../email-blacklist/blacklist-file-details/blacklist-file-details.component';

import { AuthorizationRouteGuard } from 'app/zdslogic-ui-base/common/authorization.guard';
import { EMailWindowContainerComponent } from '../email-window-container/email-window-container.component';

const routes: Routes = [
	{
		path: '',
		component: EMailWindowContainerComponent,
		children: [

			{ path: '', component: InboxFilesListComponent },

			{
				path: 'inbox',
				component: InboxFilesListComponent,
				children: [
					{
						path: ':id',
						component: InboxFileDetailsComponent,
					}
				]
			},
			{
				path: 'sent',
				component: SentFilesListComponent,
				children: [
					{
						path: ':id',
						component: SentFileDetailsComponent,
					}
				]
			},
			{
				path: 'junk',
				component: JunkFilesListComponent,
				children: [
					{
						path: ':id',
						component: JunkFileDetailsComponent,
					}
				]
			},
			{
				path: 'blacklist',
				component: BlacklistFilesListComponent,
				canActivate: [AuthorizationRouteGuard],
				children: [
					{
						path: ':id',
						component: BlacklistFileDetailsComponent,
					}
				]
			},

			//    { path: 'create', component: UserCreateComponent },
			//    { path: 'update/:id', component: UserUpdateComponent }
			{ path: 'email-compose', component: ComposeEMailComponent },
			{ path: 'email-reply/:id', component: ReplyEMailComponent },
			{ path: 'email-forward/:id', component: ForwardEMailComponent },
			{ path: 'file-upload', component: FileUploadComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class EMailWindowRoutingModule { }

