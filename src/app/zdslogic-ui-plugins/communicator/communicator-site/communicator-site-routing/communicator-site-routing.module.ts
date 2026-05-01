import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CommunicatorSiteContainerComponent } from '../communicator-site-container/communicator-site-container.component';
//import { ChatWindowComponent } from '../communicator-site-container/components/chat-window-container/chat-window/chat-window.component';
import { WindowContainerComponent } from '../communicator-site-container/components/window-container/window-container.component';
import { ChatMessageDetailsComponent } from '../communicator-site-container/components/window-container/chat-window/chat-message/chat-message-details/chat-message-details.component';
import { ChatWindowContainerComponent } from '../communicator-site-container/components/window-container/chat-window/chat-window-container/chat-window-container.component';

import { InboxFileDetailsComponent } from '../communicator-site-container/components/window-container/email-window/email-inbox/inbox-file-details/inbox-file-details.component';
import { InboxFilesListComponent } from '../communicator-site-container/components/window-container/email-window/email-inbox/inbox-files-list/inbox-files-list.component';

import { SentFileDetailsComponent } from '../communicator-site-container/components/window-container/email-window/email-sent/sent-file-details/sent-file-details.component';
import { SentFilesListComponent } from '../communicator-site-container/components/window-container/email-window/email-sent/sent-files-list/sent-files-list.component';

import { JunkFileDetailsComponent } from '../communicator-site-container/components/window-container/email-window/email-junk/junk-file-details/junk-file-details.component';
import { JunkFilesListComponent } from '../communicator-site-container/components/window-container/email-window/email-junk/junk-files-list/junk-files-list.component';

import { FileUploadComponent } from '../communicator-site-container/components/window-container/email-window/email-file-upload/file-upload.component';
import { ComposeEMailComponent } from '../communicator-site-container/components/window-container/email-window/email-compose/compose-email.component';
import { ReplyEMailComponent } from '../communicator-site-container/components/window-container/email-window/email-reply/reply-email.component';
import { ForwardEMailComponent } from '../communicator-site-container/components/window-container/email-window/email-forward/forward-email.component';
import { BlacklistFilesListComponent } from '../communicator-site-container/components/window-container/email-window/email-blacklist/blacklist-files-list/blacklist-files-list.component';
import { BlacklistFileDetailsComponent } from '../communicator-site-container/components/window-container/email-window/email-blacklist/blacklist-file-details/blacklist-file-details.component';

import { AuthorizationRouteGuard } from 'app/zdslogic-ui-base/common/authorization.guard';
import { EMailWindowContainerComponent } from '../communicator-site-container/components/window-container/email-window/email-window-container/email-window-container.component';

//import { ChatChannelListComponent } from '../communicator-admin-container/entities/chat-channel/chat-channel-list/chat-channel-list.component';
//import { ChatChannelDetailsComponent } from '../communicator-admin-container/entities/chat-channel/chat-channel-details/chat-channel-details.component';
//import { ChatChannelCreateComponent } from '../communicator-admin-container/entities/chat-channel/chat-channel-create/chat-channel-create.component';
//import { ChatChannelEMailComponent } from '../book-email/book-email.component';
//import { ChatChannelUpdateComponent } from '../communicator-admin-container/entities/chat-channel/chat-channel-update/chat-channel-update.component';

const routes: Routes = [
	{
		path: '',
		component: CommunicatorSiteContainerComponent,
	},
	{
		path: ':contactId',
		component: CommunicatorSiteContainerComponent,
		children: [
			{
				path: 'chat', component: ChatWindowContainerComponent
			},
			{
				path: 'email',
				component: EMailWindowContainerComponent,
				children: [
					{
						path: 'inbox',
						component: EMailWindowContainerComponent,
						children: [
							{
								path: ':id',
								component: InboxFileDetailsComponent,
							}
						]
					}
				]
			},
			{
				path: 'sent',
				component: EMailWindowContainerComponent,
				children: [
					{
						path: '',
						component: SentFilesListComponent,
					},
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
			{
				path: 'message',
				component: ChatWindowContainerComponent,
				children: [
					{
						path: ':messageId',
						component: ChatMessageDetailsComponent,

					}

				]

			},


		]
	},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	],
	declarations: []
})
export class CommunicatorSiteRoutingModule { }


