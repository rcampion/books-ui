import { Route } from '@angular/router';
//import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { LayoutComponent } from 'app/zdslogic-shell/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

//zdslogic components
//import { AboutComponent } from './plugins/about/about.component';

//import { CollaborationContainerComponent } from './plugins/collaboration/collaboration-container/collaboration-container.component';
//import { WikiTopicListComponent } from './plugins/wiki/wiki-topic-list/wiki-topic-list.component';
//import { VideoJitsiPublicComponent } from './plugins/collaboration/collaboration-video-public/video-jitsi-public.component';
//import { ContactsLayoutComponent } from './plugins/contacts/contacts-layout/contacts-layout.component';
//import { TeamsAboutComponent } from './plugins/teams/about/about.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

	// Redirect empty path to '/home'
	{ path: '', pathMatch: 'full', redirectTo: 'home' },

	// Redirect signed in user to the '/dashboards/project'
	//
	// After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
	// path. Below is another redirection for that path to redirect the user to the desired
	// location. This is a small convenience to keep all main routes together here on this file.
	{ path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'home' },

	// Landing routes
	{
		path: '',
		component: LayoutComponent,
		children: [
			{ path: '', loadChildren: () => import('app/zdslogic-shell/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
			{ path: 'home', loadChildren: () => import('app/zdslogic-shell/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
			{ path: 'about', loadChildren: () => import('app/zdslogic-plugins/about/about.module').then(m => m.AboutModule) },
/*
			{
				path: 'articles',
				loadChildren: () => import('./plugins/articles/articles.module').then(m => m.ArticlesModule)
			},
			{
				path: 'trainings',
				loadChildren: () => import('./plugins/trainings/trainings.module').then(m => m.TrainingsModule)
			},
			{
				path: 'blog',
				loadChildren: () => import('./plugins/articles/articles.module').then(m => m.ArticlesModule)
			},
*/
			{
				path: 'books',
				loadChildren: () => import('./zdslogic-plugins/books/books-shop-site/books-shop-site.module').then(m => m.BooksShopSiteModule)
			},
			{
				path: 'books-admin',
				loadChildren: () => import('./zdslogic-plugins/books/books-admin/books-admin.module').then(m => m.BooksAdminModule)
			},
/*
			{
				path: 'collaboration',
				loadChildren: () => import('./plugins/collaboration/collaboration.module').then(m => m.CollaborationModule)
			},
			{
				path: 'meet', component: VideoJitsiPublicComponent
			},
			{
				path: 'profiles',
				loadChildren: () => import('./plugins/profiles/profiles.module').then(m => m.ProfilesModule)
			},
			{
				path: 'jobs',
				loadChildren: () => import('./plugins/jobs/jobs.module').then(m => m.JobsModule)
			},
			{
				path: 'resumes',
				loadChildren: () => import('./plugins/resumes/resumes.module').then(m => m.ResumesModule)
			},
			{
				path: 'teams/about',
				component: TeamsAboutComponent
			},
			{
				path: 'shop',
				loadChildren: () => import('./plugins/shop/shop-site/shop-site.module').then(m => m.ShopSiteModule)
			},
			{
				path: 'topics',
				loadChildren: () => import('./plugins/wiki/wiki.module').then(m => m.WikiModule)
			},
			{
				path: 'projects',
				loadChildren: () => import('./plugins/projects/projects.module').then(m => m.ProjectsModule)
			},
			{
				path: 'my-emails',
				loadChildren: () => import('./plugins/emails/my-emails/my-emails.module').then(m => m.MyEMailsModule)
			},
			{
				path: 'map',
				loadChildren: () => import('./plugins/map/map.module').then(m => m.MapModule)
			},
			{
				path: 'logs',
				loadChildren: () => import('./plugins/logs/logs.module').then(m => m.LogsModule)
			},
			{
				path: 'whois',
				loadChildren: () => import('./plugins/whois/whois.module').then(m => m.WhoisModule)
			},
			{
				path: 'weather',
				loadChildren: () => import('./plugins/weather/weather.module').then(m => m.WeatherModule)
			},
			{
				path: 'visualizations',
				loadChildren: () => import('./plugins/visualizations/visualizations.module').then(m => m.VisualizationsModule)
			},

			{
				path: 'contact',
				loadChildren: () => import('./plugins/collaboration/collaboration.module').then(m => m.CollaborationModule)
			},

			{ path: 'meet', component: VideoJitsiPublicComponent },

			{ path: 'confirmation-required', loadChildren: () => import('app/zdslogic-shell/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
			{ path: 'forgot-password', loadChildren: () => import('app/zdslogic-shell/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
			{ path: 'reset-password', loadChildren: () => import('app/zdslogic-shell/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
			{ path: 'sign-in', loadChildren: () => import('app/zdslogic-shell/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
			{ path: 'sign-up', loadChildren: () => import('app/zdslogic-base/registration/registration.routing/registration-routing.module').then(m => m.RegistrationRoutingModule) },
*/
		]
	},

	// Auth routes for authenticated users
	{
		path: '',
		//canActivate: [AuthGuard],
		//canActivateChild: [AuthGuard],
		component: LayoutComponent,
		data: {
			layout: 'empty'
		},
		children: [
			{ path: 'sign-out', loadChildren: () => import('app/zdslogic-shell/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
			{ path: 'unlock-session', loadChildren: () => import('app/zdslogic-shell/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) },
/*
			{
				path: 'contacts',
				component: ContactsLayoutComponent,
				loadChildren: () => import('./plugins/contacts/routing/contacts-routing.module').then(m => m.ContactsRoutingModule)
			},
			{
				path: 'teams',
				loadChildren: () => import('./plugins/teams/teams.module').then(m => m.TeamsModule)
			},

			{
				path: 'calendar',
				loadChildren: () => import('./plugins/calendar/calendar.module').then(m => m.CalendarViewModule)
			},

			{
				path: 'apikeys',
				loadChildren: () => import('./plugins/apikeys/apikey.module').then(m => m.ApiKeyModule)
			},

			{
				path: 'inventory',
				loadChildren: () => import('./plugins/inventory/inventory.module').then(m => m.InventoryModule)
			},

			{
				path: 'subscriptions',
				loadChildren: () => import('./plugins/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)
			},

			{
				path: 'users',
				loadChildren: () => import('./zdslogic-base/users/users.module').then(m => m.UsersModule)
			},

			{
				path: 'my-files',
				loadChildren: () => import('./plugins/system/my-files/myfiles.module').then(m => m.MyFilesModule)
			},
			{
				path: 'user-files',
				loadChildren: () => import('./plugins/system/user-files/files.module').then(m => m.FilesModule)
			},
			{
				path: 'system',
				loadChildren: () => import('./plugins/system/system-routing/system-routing.module').then(m => m.SystemRoutingModule)
			},
*/
		]
	},

	// Admin routes
	{
		path: '',
		//canActivate: [AuthGuard],
		//canActivateChild: [AuthGuard],
		component: LayoutComponent,
		resolve: {
			initialData: InitialDataResolver,
		},
		children: [
			{
				path: 'pages', children: [
					{ path: 'coming-soon', loadChildren: () => import('app/zdslogic-shell/modules/admin/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule) },
					{
						path: 'error', children: [
							{ path: '404', loadChildren: () => import('app/zdslogic-shell/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
							{ path: '500', loadChildren: () => import('app/zdslogic-shell/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module) }
						]
					},
					// Maintenance
					{ path: 'maintenance', loadChildren: () => import('app/zdslogic-shell/modules/admin/pages/maintenance/maintenance.module').then(m => m.MaintenanceModule) }
				]
			},
			// 404 & Catch all
			{ path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/zdslogic-shell/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
			{ path: '**', redirectTo: '404-not-found' },

		]
	}
];
