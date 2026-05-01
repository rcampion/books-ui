import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoJitsiStartComponent } from '../collaboration-video-start/video-jitsi-start.component';
import { VideoJitsiEnterComponent } from '../collaboration-video-enter/video-jitsi-enter.component';
import { VideoJitsiPublicComponent } from '../collaboration-video-public/video-jitsi-public.component';

import { ChatComponent } from '../collaboration-chat/chat.component';
import { CallComponent } from '../collaboration-phone/call/call.component';
import { TabsComponent } from '../collaboration-phone/tabs/tabs.component';
import { ContactEMailComponent } from '../collaboration-email/contact-email.component';
import { CollaborationContainerComponent } from '../collaboration-container/collaboration-container.component';

const routes: Routes = [
	{ path: '',
		component: CollaborationContainerComponent,
		children: [
				{ path: '', component: TabsComponent },
				{ path: 'call', component: TabsComponent },
				{ path: 'chat', component: ChatComponent },
				{ path: 'email', component: ContactEMailComponent },
				{ path: 'email/:id', component: ContactEMailComponent },
		]
	},
	{ path: 'collaboration-video-start', component: VideoJitsiStartComponent },
	{ path: 'collaboration-video-enter', component: VideoJitsiEnterComponent },
	{ path: 'collaboration-video-enter/video/:id', component: VideoJitsiEnterComponent },
	{ path: 'collaboration-video-public', component: VideoJitsiPublicComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaborationRoutingModule { }
