import { NgModule } from '@angular/core';
import { SharedModule } from 'app/zdslogic-shell/shared/shared.module';

//zdslogic modules
import { MaterialModule } from './../zdslogic-base/material/material.module';
//import { ApiKeyModule } from './system/system-admin/apikeys/apikey.module';
import { PluginsRoutingModule } from './plugins.routing.module';

import { BooksAdminModule } from './books/books-admin/books-admin.module';
import { BooksShopSiteModule } from './books/books-shop-site/books-shop-site.module';
/*
import { ProfilesModule } from './profiles/profiles.module';
import { CalendarViewModule } from './calendar/calendar.module';
import { ContactsModule } from './contacts/contacts.module';
import { DeviceModule } from './device/device.module';
import { JobsModule } from './jobs/jobs.module';
import { LogsModule } from './logs/logs.module';
import { MyEMailsModule } from './emails/my-emails/my-emails.module';
import { WikiModule } from './wiki/wiki.module';
import { PrivacyModule } from './privacy/privacy.module';
import { ProjectsModule } from './projects/projects.module';
import { ResumesModule } from './resumes/resumes.module';
import { ShopAdminModule } from './shop/shop-admin/shop-admin.module';
import { ShopSiteModule } from './shop/shop-site/shop-site.module';
import { SkillsModule } from './skills/skills.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
*/
//import { SystemModule } from './system/system.module';
/*
import { TeamsModule } from './teams/teams.module';
import { TeamsPricingModule } from './teamspricing/teamspricing.module';
import { VisualizationsModule } from './visualizations/visualizations.module';
import { WeatherModule } from './weather/weather.module';
import { WhoisModule } from './whois/whois.module';
import { WhoisPricingModule } from './whoispricing/whoispricing.module';
*/
@NgModule({
	declarations: [],
	imports: [
		//ApiKeyModule,

		BooksAdminModule,
		BooksShopSiteModule,

		//CalendarViewModule,
		//ContactsModule,
		//DeviceModule,
		//JobsModule,
		//LogsModule,
		MaterialModule,
		//MyEMailsModule,
		PluginsRoutingModule,
		//PrivacyModule,
		//ProfilesModule,
		//ProjectsModule,
		//ResumesModule,
		//ShopAdminModule,
		//ShopSiteModule,
		//SkillsModule,
		//SubscribeModule,
		//SubscriptionsModule,
		SharedModule,
		//SystemModule,
		//TeamsModule,
		//TeamsPricingModule,
		//VisualizationsModule,
		//WeatherModule,
		//WhoisModule,
		//WhoisPricingModule
	]
})
export class PluginsModule {
}
