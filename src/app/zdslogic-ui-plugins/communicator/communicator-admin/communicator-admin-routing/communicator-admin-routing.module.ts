import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CommunicatorAdminContainerComponent } from '../communicator-admin-container/communicator-admin-container.component';

import { ChatChannelListComponent } from '../communicator-admin-container/entities/chat-channel/chat-channel-list/chat-channel-list.component';
import { ChatChannelDetailsComponent } from '../communicator-admin-container/entities/chat-channel/chat-channel-details/chat-channel-details.component';
import { ChatChannelCreateComponent } from '../communicator-admin-container/entities/chat-channel/chat-channel-create/chat-channel-create.component';
import { ChatChannelUpdateComponent } from '../communicator-admin-container/entities/chat-channel/chat-channel-update/chat-channel-update.component';

//import { ChatChannelEMailComponent } from '../book-email/book-email.component';

const routes: Routes = [
	{
		path: 'channel/create',
		component: ChatChannelCreateComponent,
	},
	{
		path: 'channel/details/:id',
		component: ChatChannelDetailsComponent,
	},
	{
		path: 'channel/update/:id',
		component: ChatChannelUpdateComponent,
	},
	{
		path: '',
		component: CommunicatorAdminContainerComponent,
		children: [
			{
				path: 'channel',
				component: ChatChannelListComponent,
				children: [
					{
						path: 'create',
						component: ChatChannelCreateComponent,
					},
					{
						path: 'details/:id',
						component: ChatChannelDetailsComponent,
					},
					{
						path: 'update/:id',
						component: ChatChannelUpdateComponent,
					}
				]
			},
		]
	}
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
export class CommunicatorAdminRoutingModule { }
