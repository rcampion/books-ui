import { FuseNavigationItem } from 'app/zdslogic-ui-shell/@fuse/components/navigation';

export const menuItems: FuseNavigationItem[] = [
	{
		id: 'home',
		title: '',
		type: 'basic',
		icon: 'heroicons_outline:home',
		link: '/'
	},
	{
		id: 'about',
		title: '',
		type: 'basic',
		icon: 'heroicons_outline:question-mark-circle',
		link: '/about'
	},
	{
		id: 'contact',
		title: '',
		type: 'basic',
		icon: 'heroicons_outline:mail',
		link: '/contact'
	},
	{
		id: 'resources',
		title: '',
		type: 'group',
		icon: 'heroicons_outline:document-duplicate',
		narrow: true,
		open: false,
		children: [
			{
				id: 'resources.careers',
				title: 'Careers',
				type: 'group',
				icon: 'heroicons_outline:user-group',
				children: [
					{
						id: 'resources.careers.jobs',
						title: 'Jobs',
						type: 'basic',
						icon: 'heroicons_outline:clipboard-check',
						link: '/jobs'
					},
					{
						id: 'resources.careers.resumes',
						title: 'Resumes',
						type: 'basic',
						icon: 'heroicons_outline:academic-cap',
						link: '/resumes'
					}
				]
			},
			{
				id: 'resources.content',
				title: 'Content',
				type: 'group',
				icon: 'heroicons_outline:menu',
				children: [
					{
						id: 'resources.content.articles',
						title: 'Articles',
						type: 'basic',
						icon: 'heroicons_outline:clipboard-check',
						link: '/articles'
					},
					{
						id: 'resources.content.knowledge_base',
						title: 'Knowledge Base',
						type: 'basic',
						icon: 'heroicons_outline:pencil-alt',
						link: '/topics'
					},
					{
						id: 'resources.content.training',
						title: 'Training',
						type: 'basic',
						icon: 'heroicons_outline:academic-cap',
						link: '/training'
					}
				]
			},
			{
				id: 'resources.profiles',
				title: 'Profiles',
				type: 'basic',
				icon: 'heroicons_outline:user-group',
				link: '/profiles'
			}
		]
	},
	{
		id: 'dash',
		title: 'Dash',
		type: 'aside',
		icon: 'heroicons_outline:truck',
		open: false,
		children: [
			{
				id: 'dash.about',
				title: 'About',
				type: 'basic',
				icon: 'heroicons_outline:question-mark-circle',
				link: '/dash/about'
			},
			{
				id: 'dash.rides',
				title: 'Rides',
				type: 'basic',
				icon: 'heroicons_outline:truck',
				link: '/dash/rides'
			}
		]
	},
	{
		id: 'studio',
		title: 'Studio',
		type: 'aside',
		icon: 'heroicons_outline:cog',
		open: false,
		children: [
			{
				id: 'studio.about',
				title: 'About',
				type: 'basic',
				icon: 'heroicons_outline:question-mark-circle',
				link: '/studio/about'
			},
			{
				id: 'studio.systems',
				title: 'Systems',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/studio/system-list'
			},
			{
				id: 'studio.projects',
				title: 'Projects',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/studio/project-list'
			},
		]
	}
];

export const authMenuItems: FuseNavigationItem[] = [
	{
		id: 'home',
		title: '',
		type: 'basic',
		icon: 'heroicons_outline:home',
		link: '/'
	},
	{
		id: 'about',
		title: '',
		type: 'basic',
		icon: 'heroicons_outline:question-mark-circle',
		link: '/about'
	},
	{
		id: 'contact',
		title: '',
		type: 'basic',
		icon: 'heroicons_outline:mail',
		link: '/contact'
	},
	{
		id: 'resources',
		title: '',
		type: 'group',
		icon: 'heroicons_outline:document-duplicate',
		narrow: true,
		open: false,
		children: [
			{
				id: 'resources.careers',
				title: 'Careers',
				type: 'group',
				icon: 'heroicons_outline:user-group',
				children: [
					{
						id: 'resources.careers.jobs',
						title: 'Jobs',
						type: 'basic',
						icon: 'heroicons_outline:clipboard-check',
						link: '/jobs'
					},
					{
						id: 'resources.careers.resumes',
						title: 'Resumes',
						type: 'basic',
						icon: 'heroicons_outline:academic-cap',
						link: '/resumes'
					}
				]
			},
			{
				id: 'resources.content',
				title: 'Content',
				type: 'group',
				icon: 'heroicons_outline:menu',
				children: [
					{
						id: 'resources.content.articles',
						title: 'Articles',
						type: 'basic',
						icon: 'heroicons_outline:clipboard-check',
						link: '/articles'
					},
					{
						id: 'resources.content.knowledge_base',
						title: 'Knowledge Base',
						type: 'basic',
						icon: 'heroicons_outline:pencil-alt',
						link: '/topics'
					},
					{
						id: 'resources.content.training',
						title: 'Training',
						type: 'basic',
						icon: 'heroicons_outline:academic-cap',
						link: '/training'
					}
				]
			},
			{
				id: 'resources.contacts',
				title: 'Contacts',
				type: 'group',
				icon: 'heroicons_outline:mail',
				children: [
					{
						id: 'resources.contacts.connections',
						title: 'Connections',
						type: 'basic',
						icon: 'heroicons_outline:link',
						link: 'contacts/connections'
					},
					{
						id: 'resources.contacts.contacts',
						title: 'Contacts',
						type: 'basic',
						icon: 'heroicons_outline:mail',
						link: '/contacts'
					},
					{
						id: 'resources.contacts.groups',
						title: 'Groups',
						type: 'basic',
						icon: 'heroicons_outline:user-group',
						link: 'contacts/groups'
					},
					{
						id: 'resources.contacts.organizations',
						title: 'Organizations',
						type: 'basic',
						icon: 'heroicons_outline:office-building',
						link: 'contacts/organizations'
					}
				]
			},
			{
				id: 'resources.files',
				title: 'Files',
				type: 'group',
				icon: 'heroicons_outline:folder',
				children: [
					{
						id: 'resources.files.myFiles',
						title: 'My Files',
						type: 'basic',
						icon: 'heroicons_outline:folder',
						link: '/my-files'
					},
				]
			},
			{
				id: 'resources.profiles',
				title: 'Profiles',
				type: 'basic',
				icon: 'heroicons_outline:user-group',
				link: '/profiles'
			}
		]
	},
	{
		id: 'dash',
		title: 'Dash',
		type: 'aside',
		icon: 'heroicons_outline:truck',
		open: false,
		children: [
			{
				id: 'dash.about',
				title: 'About',
				type: 'basic',
				icon: 'heroicons_outline:question-mark-circle',
				link: '/dash/about'
			},
			{
				id: 'dash.rides',
				title: 'Rides',
				type: 'basic',
				icon: 'heroicons_outline:truck',
				link: '/dash/rides'
			}
		]
	},
	{
		id: 'studio',
		title: 'Studio',
		type: 'aside',
		icon: 'heroicons_outline:cog',
		open: false,
		children: [
			{
				id: 'studio.about',
				title: 'About',
				type: 'basic',
				icon: 'heroicons_outline:question-mark-circle',
				link: '/studio/about'
			},
			{
				id: 'studio.systems',
				title: 'Systems',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/studio/system-list'
			},
			{
				id: 'studio.projects',
				title: 'Projects',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/studio/project-list'
			},
		]
	}
];

export const sideMenuItems: FuseNavigationItem[] = [
	{
		id: 'home',
		title: 'Home',
		type: 'basic',
		icon: 'heroicons_outline:home',
		link: '/home'
	},
	{
		id: 'about',
		title: 'About',
		type: 'basic',
		icon: 'heroicons_outline:question-mark-circle',
		link: '/about'
	},
	{
		id: 'apps',
		title: 'Apps',
		type: 'aside',
		icon: 'heroicons_outline:qrcode',
		open: false,
		children: [
			{
				id: 'apps.articles',
				title: 'Articles',
				type: 'basic',
				icon: 'heroicons_outline:clipboard-check',
				link: '/articles'
			},
			{
				id: 'apps.blog',
				title: 'Blog',
				type: 'basic',
				icon: 'heroicons_outline:academic-cap',
				link: '/blog'
			},
			{
				id: 'apps.books',
				title: 'Books',
				type: 'basic',
				icon: 'heroicons_outline:academic-cap',
				link: '/books'
			},
			{
				id: 'apps.games',
				title: 'Games',
				type: 'basic',
				icon: 'heroicons_outline:puzzle',
				link: '/external-games'
			},
			{
				id: 'apps.knowledge',
				title: 'Knowledge Base',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/topics'
			},
			{
				id: 'apps.map',
				title: 'Map',
				type: 'basic',
				icon: 'heroicons_outline:map',
				link: '/map'
			},
			{
				id: 'apps.shop',
				title: 'Shop',
				type: 'basic',
				icon: 'heroicons_outline:shopping-bag',
				link: '/shop'
			},
			{
				id: 'apps.slideshow',
				title: 'Slideshow',
				type: 'basic',
				icon: 'heroicons_outline:photograph',
				link: '/slideshow'
			},
			{
				id: 'apps.webchat',
				title: 'WebChat',
				type: 'basic',
				icon: 'heroicons_outline:chat-alt',
				link: '/external-web-chat'
			},
			{
				id: 'apps.webphone',
				title: 'WebPhone',
				type: 'basic',
				icon: 'heroicons_outline:phone',
				link: '/external-web-phone'
			},
			{
				id: 'apps.weather',
				title: 'Weather',
				type: 'basic',
				icon: 'heroicons_outline:cloud',
				link: '/weather'
			},
			{
				id: 'apps.wiki',
				title: 'Wiki',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/topics'
			},
			{
				id: 'visualizations',
				title: 'Visualizations',
				type: 'collapsable',
				icon: '',
				open: false,
				children: [
					{
						id: 'visualizations.bar_chart',
						title: 'Bar Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-bar',
						link: '/visualizations/bar-chart'
					},
					{
						id: 'visualizations.pie_chart',
						title: 'Pie Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-pie',
						link: '/visualizations/pie-chart'
					},
					{
						id: 'visualizations.scatter_chart',
						title: 'Scatter Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-square-bar',
						link: '/visualizations/scatter-chart'
					},
					{
						id: 'visualizations.nodes_chart',
						title: 'Nodes Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-bar',
						link: '/visualizations/nodes-chart'
					},
					{
						id: 'visualizations.http_access_log_chart',
						title: 'Http Access Log Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-square-bar',
						link: '/visualizations/log-chart'
					},
					{
						id: 'visualizations.http_access_location_chart',
						title: 'Http Access Location Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-square-bar',
						link: '/visualizations/globe-chart'
					},
					{
						id: 'visualizations.timeseries',
						title: 'TimeSeries',
						type: 'basic',
						icon: 'heroicons_outline:clock',
						link: '/visualizations/timeseries-chart'
					},
					{
						id: 'visualizations.sinewave',
						title: 'SineWave',
						type: 'basic',
						icon: 'heroicons_outline:speakerphone',
						link: '/visualizations/line-chart'
					},
					{
						id: 'visualizations.disk_usage',
						title: 'Disk Usage',
						type: 'basic',
						icon: 'heroicons_outline:chart-pie',
						link: '/visualizations/systemdisk-chart'
					},
					{
						id: 'visualizations.memory_usage',
						title: 'Memory Usage',
						type: 'basic',
						icon: 'heroicons_outline:chart-pie',
						link: '/visualizations/systemmemory-chart'
					},
					{
						id: 'visualizations.cube',
						title: 'Cube',
						type: 'basic',
						icon: 'heroicons_outline:chart-pie',
						link: '/visualizations/cube-chart'
					},
					{
						id: 'visualizations.background',
						title: 'Background',
						type: 'basic',
						icon: 'heroicons_outline:folder',
						link: '/visualizations/background-chart'
					},
					{
						id: 'visualizations.usa',
						title: 'USA',
						type: 'basic',
						icon: 'heroicons_outline:globe',
						link: '/visualizations/usa-chart'
					},
				]
			},
			{
				id: 'whois',
				title: 'WHOIS',
				type: 'basic',
				icon: 'heroicons_outline:search',
				link: '/whois'
			}
		]
	},
	{
		id: 'contact',
		title: 'Contact',
		type: 'basic',
		icon: 'heroicons_outline:mail',
		link: '/contact'
	},
	{
		id: 'resources',
		title: 'Resources',
		type: 'aside',
		icon: 'heroicons_outline:document-duplicate',
		narrow: true,
		open: false,
		children: [
			{
				id: 'resources.careers',
				title: 'Careers',
				type: 'collapsable',
				icon: 'heroicons_outline:user-group',
				children: [
					{
						id: 'resources.careers.jobs',
						title: 'Jobs',
						type: 'basic',
						icon: 'heroicons_outline:clipboard-check',
						link: '/jobs'
					},
					{
						id: 'resources.careers.resumes',
						title: 'Resumes',
						type: 'basic',
						icon: 'heroicons_outline:academic-cap',
						link: '/resumes'
					}
				]
			},
			{
				id: 'resources.content',
				title: 'Content',
				type: 'collapsable',
				icon: 'heroicons_outline:menu',
				children: [
					{
						id: 'resources.content.articles',
						title: 'Articles',
						type: 'basic',
						icon: 'heroicons_outline:clipboard-check',
						link: '/articles'
					},
					{
						id: 'resources.content.knowledge_base',
						title: 'Knowledge Base',
						type: 'basic',
						icon: 'heroicons_outline:pencil-alt',
						link: '/topics'
					},
					{
						id: 'resources.content.training',
						title: 'Training',
						type: 'basic',
						icon: 'heroicons_outline:academic-cap',
						link: '/training'
					}
				]
			},
			{
				id: 'resources.profiles',
				title: 'Profiles',
				type: 'basic',
				icon: 'heroicons_outline:users',
				link: '/profiles'
			}
		]
	},
	{
		id: 'dash',
		title: 'Dash',
		type: 'aside',
		icon: 'heroicons_outline:truck',
		open: false,
		children: [
			{
				id: 'dash.about',
				title: 'About',
				type: 'basic',
				icon: 'heroicons_outline:question-mark-circle',
				link: '/dash/about'
			},
			{
				id: 'dash.rides',
				title: 'Rides',
				type: 'basic',
				icon: 'heroicons_outline:truck',
				link: '/dash/rides'
			}
		]
	},
	{
		id: 'studio',
		title: 'Studio',
		type: 'aside',
		icon: 'heroicons_outline:cog',
		open: false,
		children: [
			{
				id: 'studio.about',
				title: 'About',
				type: 'basic',
				icon: 'heroicons_outline:question-mark-circle',
				link: '/studio/about'
			},
			{
				id: 'studio.systems',
				title: 'Systems',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/studio/system-list'
			},
			{
				id: 'studio.projects',
				title: 'Projects',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/studio/project-list'
			},
		]
	}
];

export const authSideMenuItems: FuseNavigationItem[] = [
	{
		id: 'home',
		title: 'Home',
		type: 'basic',
		icon: 'heroicons_outline:home',
		link: '/home'
	},
	{
		id: 'about',
		title: 'About',
		type: 'basic',
		icon: 'heroicons_outline:question-mark-circle',
		link: '/about'
	},
	{
		id: 'apps',
		title: 'Apps',
		type: 'aside',
		icon: 'heroicons_outline:qrcode',
		open: false,
		children: [
			{
				id: 'apps.articles',
				title: 'Articles',
				type: 'basic',
				icon: 'heroicons_outline:clipboard-check',
				link: '/articles'
			},
			{
				id: 'apps.blog',
				title: 'Blog',
				type: 'basic',
				icon: 'heroicons_outline:academic-cap',
				link: '/blog'
			},
			{
				id: 'apps.books',
				title: 'Books',
				type: 'basic',
				icon: 'heroicons_outline:academic-cap',
				link: '/books'
			},
			{
				id: 'apps.contacts',
				title: 'Contacts',
				type: 'basic',
				icon: 'heroicons_outline:mail',
				link: '/contacts'
			},
			{
				id: 'apps.games',
				title: 'Games',
				type: 'basic',
				icon: 'heroicons_outline:puzzle',
				link: '/external-games'
			},
			{
				id: 'apps.knowledge',
				title: 'Knowledge Base',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/topics'
			},
			{
				id: 'apps.map',
				title: 'Map',
				type: 'basic',
				icon: 'heroicons_outline:map',
				link: '/map'
			},
			{
				id: 'apps.shop',
				title: 'Shop',
				type: 'basic',
				icon: 'heroicons_outline:shopping-bag',
				link: '/shop'
			},
			{
				id: 'apps.slideshow',
				title: 'Slideshow',
				type: 'basic',
				icon: 'heroicons_outline:photograph',
				link: '/slideshow'
			},
			{
				id: 'apps.webchat',
				title: 'WebChat',
				type: 'basic',
				icon: 'heroicons_outline:chat-alt',
				link: '/external-web-chat'
			},
			{
				id: 'apps.webphone',
				title: 'WebPhone',
				type: 'basic',
				icon: 'heroicons_outline:phone',
				link: '/external-web-phone'
			},
			{
				id: 'apps.weather',
				title: 'Weather',
				type: 'basic',
				icon: 'heroicons_outline:cloud',
				link: '/weather'
			},
			{
				id: 'apps.wiki',
				title: 'Wiki',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/topics'
			},
			{
				id: 'visualizations',
				title: 'Visualizations',
				type: 'collapsable',
				icon: 'heroicons_outline:presentation-chart-bar',
				open: false,
				children: [
					{
						id: 'visualizations.bar_chart',
						title: 'Bar Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-bar',
						link: '/visualizations/bar-chart'
					},
					{
						id: 'visualizations.pie_chart',
						title: 'Pie Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-pie',
						link: '/visualizations/pie-chart'
					},
					{
						id: 'visualizations.scatter_chart',
						title: 'Scatter Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-square-bar',
						link: '/visualizations/scatter-chart'
					},
					{
						id: 'visualizations.nodes_chart',
						title: 'Nodes Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-bar',
						link: '/visualizations/nodes-chart'
					},
					{
						id: 'visualizations.http_access_log_chart',
						title: 'Http Access Log Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-square-bar',
						link: '/visualizations/log-chart'
					},
					{
						id: 'visualizations.http_access_location_chart',
						title: 'Http Access Location Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-square-bar',
						link: '/visualizations/globe-chart'
					},
					{
						id: 'visualizations.timeseries',
						title: 'TimeSeries',
						type: 'basic',
						icon: 'heroicons_outline:clock',
						link: '/visualizations/timeseries-chart'
					},
					{
						id: 'visualizations.sinewave',
						title: 'SineWave',
						type: 'basic',
						icon: 'heroicons_outline:speakerphone',
						link: '/visualizations/line-chart'
					},
					{
						id: 'visualizations.disk_usage',
						title: 'Disk Usage',
						type: 'basic',
						icon: 'heroicons_outline:chart-pie',
						link: '/visualizations/systemdisk-chart'
					},
					{
						id: 'visualizations.memory_usage',
						title: 'Memory Usage',
						type: 'basic',
						icon: 'heroicons_outline:chart-pie',
						link: '/visualizations/systemmemory-chart'
					},
					{
						id: 'visualizations.cube',
						title: 'Cube',
						type: 'basic',
						icon: 'heroicons_outline:chart-pie',
						link: '/visualizations/cube-chart'
					},
					{
						id: 'visualizations.background',
						title: 'Background',
						type: 'basic',
						icon: 'heroicons_outline:folder',
						link: '/visualizations/background-chart'
					},
					{
						id: 'visualizations.usa',
						title: 'USA',
						type: 'basic',
						icon: 'heroicons_outline:globe',
						link: '/visualizations/usa-chart'
					},
				]
			},
			{
				id: 'whois',
				title: 'WHOIS',
				type: 'basic',
				icon: 'heroicons_outline:search',
				link: '/whois'
			}
		]
	},
	{
		id: 'contact',
		title: 'Contact',
		type: 'basic',
		icon: 'heroicons_outline:mail',
		link: '/contact'
	},

	{
		id: 'messaging',
		title: 'Messaging',
		type: 'basic',
		icon: 'heroicons_outline:chat',
		link: '/messaging'
	},

	{
		id: 'resources',
		title: 'Resources',
		type: 'aside',
		icon: 'heroicons_outline:document-duplicate',
		narrow: true,
		open: false,
		children: [
			{
				id: 'resources.careers',
				title: 'Careers',
				type: 'collapsable',
				icon: 'heroicons_outline:user-group',
				children: [
					{
						id: 'resources.careers.jobs',
						title: 'Jobs',
						type: 'basic',
						icon: 'heroicons_outline:clipboard-check',
						link: '/jobs'
					},
					{
						id: 'resources.careers.resumes',
						title: 'Resumes',
						type: 'basic',
						icon: 'heroicons_outline:academic-cap',
						link: '/resumes'
					}
				]
			},
			{
				id: 'resources.content',
				title: 'Content',
				type: 'collapsable',
				icon: 'heroicons_outline:menu',
				children: [
					{
						id: 'resources.content.articles',
						title: 'Articles',
						type: 'basic',
						icon: 'heroicons_outline:clipboard-check',
						link: '/articles'
					},
					{
						id: 'resources.content.knowledge_base',
						title: 'Knowledge Base',
						type: 'basic',
						icon: 'heroicons_outline:pencil-alt',
						link: '/topics'
					},
					{
						id: 'resources.content.training',
						title: 'Training',
						type: 'basic',
						icon: 'heroicons_outline:academic-cap',
						link: '/training'
					}
				]
			},
			{
				id: 'resources.contacts',
				title: 'Contacts',
				type: 'collapsable',
				icon: 'heroicons_outline:mail',
				children: [
					{
						id: 'resources.contacts.connections',
						title: 'Connections',
						type: 'basic',
						icon: 'heroicons_outline:link',
						link: 'contacts/connections'
					},
					{
						id: 'resources.contacts.contacts',
						title: 'Contacts',
						type: 'basic',
						icon: 'heroicons_outline:mail',
						link: '/contacts'
					},
					{
						id: 'resources.contacts.groups',
						title: 'Groups',
						type: 'basic',
						icon: 'heroicons_outline:user-group',
						link: 'contacts/groups'
					},
					{
						id: 'resources.contacts.organizations',
						title: 'Organizations',
						type: 'basic',
						icon: 'heroicons_outline:office-building',
						link: 'contacts/organizations'
					}
				]
			},
			{
				id: 'resources.files',
				title: 'Files',
				type: 'collapsable',
				icon: 'heroicons_outline:folder',
				children: [
					{
						id: 'resources.files.myFiles',
						title: 'My Files',
						type: 'basic',
						icon: 'heroicons_outline:folder',
						link: '/my-files'
					},
				]
			},
			{
				id: 'resources.profiles',
				title: 'Profiles',
				type: 'basic',
				icon: 'heroicons_outline:users',
				link: '/profiles'
			}
		]
	},
	{
		id: 'studio',
		title: 'Studio',
		type: 'aside',
		icon: 'heroicons_outline:cog',
		open: false,
		children: [
			{
				id: 'studio.about',
				title: 'About',
				type: 'basic',
				icon: 'heroicons_outline:question-mark-circle',
				link: '/studio/about'
			},
			{
				id: 'studio.systems',
				title: 'Systems',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/studio/system-list'
			},
			{
				id: 'studio.projects',
				title: 'Projects',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/studio/project-list'
			},
		]
	},
	{
		id: 'teams',
		title: 'Teams',
		type: 'aside',
		icon: 'heroicons_outline:user-group',
		open: false,
		children: [
			{
				id: 'teams.about',
				title: 'About',
				type: 'basic',
				icon: 'heroicons_outline:question-mark-circle',
				link: '/teams/about'
			},
			{
				id: 'teams.calendar',
				title: 'Calendar',
				type: 'basic',
				icon: 'heroicons_outline:calendar',
				link: '/calendar/view'
			},
			{
				id: 'teams.calendar.list',
				title: 'Calendar Meeting List',
				type: 'basic',
				icon: 'heroicons_outline:desktop-computer',
				link: '/calendar/list'
			},
			{
				id: 'teams.emails',
				title: 'EMail',
				type: 'basic',
				icon: 'heroicons_outline:mail',
				link: '/my-emails'
			},
			{
				id: 'teams.projects',
				title: 'Projects',
				type: 'basic',
				icon: 'heroicons_outline:clipboard-list',
				link: '/projects'
			},
			{
				id: 'teams.list',
				title: 'Teams List',
				type: 'basic',
				icon: 'heroicons_outline:view-list',
				link: '/teams/list'
			},
			{
				id: 'teams.workbench',
				title: 'Teams Workbench',
				type: 'basic',
				icon: 'heroicons_outline:desktop-computer',
				link: 'external-teams-ide'
			}

		]
	}
];

export const adminSideMenuItems: FuseNavigationItem[] = [
	{
		id: 'home',
		title: 'Home',
		type: 'basic',
		icon: 'heroicons_outline:home',
		link: '/home'
	},
	{
		id: 'about',
		title: 'About',
		type: 'basic',
		icon: 'heroicons_outline:question-mark-circle',
		link: '/about'
	},
	{
		id: 'apps',
		title: 'Apps',
		type: 'aside',
		icon: 'heroicons_outline:qrcode',
		open: false,
		children: [
			{
				id: 'apps.articles',
				title: 'Articles',
				type: 'basic',
				icon: 'heroicons_outline:clipboard-check',
				link: '/articles'
			},
			{
				id: 'apps.blog',
				title: 'Blog',
				type: 'basic',
				icon: 'heroicons_outline:academic-cap',
				link: '/blog'
			},
			{
				id: 'apps.books',
				title: 'Books',
				type: 'basic',
				icon: 'heroicons_outline:academic-cap',
				link: '/books'
			},
			{
				id: 'apps.contacts',
				title: 'Contacts',
				type: 'basic',
				icon: 'heroicons_outline:mail',
				link: '/contacts'
			},
			{
				id: 'apps.games',
				title: 'Games',
				type: 'basic',
				icon: 'heroicons_outline:puzzle',
				link: '/external-games'
			},
			{
				id: 'apps.knowledge',
				title: 'Knowledge Base',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/topics'
			},
			{
				id: 'apps.map',
				title: 'Map',
				type: 'basic',
				icon: 'heroicons_outline:map',
				link: '/map'
			},
			{
				id: 'apps.shop',
				title: 'Shop',
				type: 'basic',
				icon: 'heroicons_outline:shopping-bag',
				link: '/shop'
			},
			{
				id: 'apps.slideshow',
				title: 'Slideshow',
				type: 'basic',
				icon: 'heroicons_outline:photograph',
				link: '/slideshow'
			},
			{
				id: 'apps.webchat',
				title: 'WebChat',
				type: 'basic',
				icon: 'heroicons_outline:chat-alt',
				link: '/external-web-chat'
			},
			{
				id: 'apps.webphone',
				title: 'WebPhone',
				type: 'basic',
				icon: 'heroicons_outline:phone',
				link: '/external-web-phone'
			},
			{
				id: 'apps.weather',
				title: 'Weather',
				type: 'basic',
				icon: 'heroicons_outline:cloud',
				link: '/weather'
			},
			{
				id: 'apps.wiki',
				title: 'Wiki',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/topics'
			},
			{
				id: 'visualizations',
				title: 'Visualizations',
				type: 'collapsable',
				icon: 'heroicons_outline:presentation-chart-bar',
				open: false,
				children: [
					{
						id: 'visualizations.bar_chart',
						title: 'Bar Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-bar',
						link: '/visualizations/bar-chart'
					},
					{
						id: 'visualizations.pie_chart',
						title: 'Pie Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-pie',
						link: '/visualizations/pie-chart'
					},
					{
						id: 'visualizations.scatter_chart',
						title: 'Scatter Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-square-bar',
						link: '/visualizations/scatter-chart'
					},
					{
						id: 'visualizations.nodes_chart',
						title: 'Nodes Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-bar',
						link: '/visualizations/nodes-chart'
					},
					{
						id: 'visualizations.http_access_log_chart',
						title: 'Http Access Log Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-square-bar',
						link: '/visualizations/log-chart'
					},
					{
						id: 'visualizations.http_access_location_chart',
						title: 'Http Access Location Chart',
						type: 'basic',
						icon: 'heroicons_outline:chart-square-bar',
						link: '/visualizations/globe-chart'
					},
					{
						id: 'visualizations.timeseries',
						title: 'TimeSeries',
						type: 'basic',
						icon: 'heroicons_outline:clock',
						link: '/visualizations/timeseries-chart'
					},
					{
						id: 'visualizations.sinewave',
						title: 'SineWave',
						type: 'basic',
						icon: 'heroicons_outline:speakerphone',
						link: '/visualizations/line-chart'
					},
					{
						id: 'visualizations.disk_usage',
						title: 'Disk Usage',
						type: 'basic',
						icon: 'heroicons_outline:chart-pie',
						link: '/visualizations/systemdisk-chart'
					},
					{
						id: 'visualizations.memory_usage',
						title: 'Memory Usage',
						type: 'basic',
						icon: 'heroicons_outline:chart-pie',
						link: '/visualizations/systemmemory-chart'
					},
					{
						id: 'visualizations.cube',
						title: 'Cube',
						type: 'basic',
						icon: 'heroicons_outline:chart-pie',
						link: '/visualizations/cube-chart'
					},
					{
						id: 'visualizations.background',
						title: 'Background',
						type: 'basic',
						icon: 'heroicons_outline:folder',
						link: '/visualizations/background-chart'
					},
					{
						id: 'visualizations.usa',
						title: 'USA',
						type: 'basic',
						icon: 'heroicons_outline:globe',
						link: '/visualizations/usa-chart'
					},
				]
			},
			{
				id: 'whois',
				title: 'WHOIS',
				type: 'basic',
				icon: 'heroicons_outline:search',
				link: '/whois'
			}
		]
	},
	{
		id: 'contact',
		title: 'Contact',
		type: 'basic',
		icon: 'heroicons_outline:mail',
		link: '/contact'
	},

	{
		id: 'messaging',
		title: 'Messaging',
		type: 'basic',
		icon: 'heroicons_outline:chat',
		link: '/messaging'
	},

	{
		id: 'resources',
		title: 'Resources',
		type: 'aside',
		icon: 'heroicons_outline:document-duplicate',
		narrow: true,
		open: false,
		children: [
			{
				id: 'resources.careers',
				title: 'Careers',
				type: 'collapsable',
				icon: 'heroicons_outline:user-group',
				children: [
					{
						id: 'resources.careers.jobs',
						title: 'Jobs',
						type: 'basic',
						icon: 'heroicons_outline:clipboard-check',
						link: '/jobs'
					},
					{
						id: 'resources.careers.resumes',
						title: 'Resumes',
						type: 'basic',
						icon: 'heroicons_outline:academic-cap',
						link: '/resumes'
					}
				]
			},
			{
				id: 'resources.content',
				title: 'Content',
				type: 'collapsable',
				icon: 'heroicons_outline:menu',
				children: [
					{
						id: 'resources.content.articles',
						title: 'Articles',
						type: 'basic',
						icon: 'heroicons_outline:clipboard-check',
						link: '/articles'
					},
					{
						id: 'resources.content.knowledge_base',
						title: 'Knowledge Base',
						type: 'basic',
						icon: 'heroicons_outline:pencil-alt',
						link: '/topics'
					},
					{
						id: 'resources.content.training',
						title: 'Training',
						type: 'basic',
						icon: 'heroicons_outline:academic-cap',
						link: '/training'
					}
				]
			},
			{
				id: 'resources.contacts',
				title: 'Contacts',
				type: 'collapsable',
				icon: 'heroicons_outline:mail',
				children: [
					{
						id: 'resources.contacts.connections',
						title: 'Connections',
						type: 'basic',
						icon: 'heroicons_outline:link',
						link: 'contacts/connections'
					},
					{
						id: 'resources.contacts.contacts',
						title: 'Contacts',
						type: 'basic',
						icon: 'heroicons_outline:mail',
						link: '/contacts'
					},
					{
						id: 'resources.contacts.groups',
						title: 'Groups',
						type: 'basic',
						icon: 'heroicons_outline:user-group',
						link: 'contacts/groups'
					},
					{
						id: 'resources.contacts.organizations',
						title: 'Organizations',
						type: 'basic',
						icon: 'heroicons_outline:office-building',
						link: 'contacts/organizations'
					}
				]
			},
			{
				id: 'resources.files',
				title: 'Files',
				type: 'collapsable',
				icon: 'heroicons_outline:folder',
				children: [
					{
						id: 'resources.files.myFiles',
						title: 'My Files',
						type: 'basic',
						icon: 'heroicons_outline:folder',
						link: '/my-files'
					},
				]
			},
			{
				id: 'resources.profiles',
				title: 'Profiles',
				type: 'basic',
				icon: 'heroicons_outline:users',
				link: '/profiles'
			}
		]
	},
	{
		id: 'dash',
		title: 'Dash',
		type: 'aside',
		icon: 'heroicons_outline:cog',
		open: false,
		children: [
			{
				id: 'dash.about',
				title: 'About',
				type: 'basic',
				icon: 'heroicons_outline:question-mark-circle',
				link: '/dash/about'
			},
			{
				id: 'dash.rides',
				title: 'Rides',
				type: 'basic',
				icon: 'heroicons_outline:truck',
				link: '/dash/rides'
			}
		]
	},
	{
		id: 'studio',
		title: 'Studio',
		type: 'aside',
		icon: 'heroicons_outline:cog',
		open: false,
		children: [
			{
				id: 'studio.about',
				title: 'About',
				type: 'basic',
				icon: 'heroicons_outline:question-mark-circle',
				link: '/studio/about'
			},
			{
				id: 'studio.systems',
				title: 'Systems',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/studio/system-list'
			},
			{
				id: 'studio.projects',
				title: 'Projects',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/studio/project-list'
			},
		]
	},
	{
		id: 'system',
		title: 'System',
		type: 'aside',
		icon: 'heroicons_outline:cog',
		open: false,
		children: [
			{
				id: 'systems.apikeys',
				title: 'Api Keys',
				type: 'basic',
				icon: 'heroicons_outline:key',
				link: '/apikeys'
			},
			{
				id: 'systems.books.admin',
				title: 'Books Admin',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/books-admin'
			},
			{
				id: 'systems.communicator.admin',
				title: 'Communicator Admin',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/communicator-admin'
			},
			{
				id: 'systems.inventory',
				title: 'Inventory',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/inventory'
			},
			{
				id: 'systems.logs',
				title: 'Logs',
				type: 'basic',
				icon: 'heroicons_outline:menu-alt-2',
				link: '/logs'
			},
			{
				id: 'systems.send.email',
				title: 'Send Email to Users',
				type: 'basic',
				icon: 'heroicons_outline:mail-open',
				link: '/system/system-email'
			},
			{
				id: 'systems.send.message',
				title: 'Send Message to Users',
				type: 'basic',
				icon: 'heroicons_outline:chat',
				link: '/system/system-message'
			},
			{
				id: 'systems.send.notification',
				title: 'Send Notification to Users',
				type: 'basic',
				icon: 'heroicons_outline:chat',
				link: '/system/system-notification'
			},
			{
				id: 'systems.shop.admin',
				title: 'Shop Admin',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/shop-admin'
			},
			{
				id: 'systems.subscriptions',
				title: 'Subscriptions',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/subscriptions'
			},
			{
				id: 'systems.users',
				title: 'Users',
				type: 'basic',
				icon: 'heroicons_outline:users',
				link: '/users'
			},
			{
				id: 'systems.user.files',
				title: 'User Files',
				type: 'basic',
				icon: 'heroicons_outline:folder',
				link: '/user-files'
			},
		]
	},
	{
		id: 'teams',
		title: 'Teams',
		type: 'aside',
		icon: 'heroicons_outline:user-group',
		open: false,
		children: [
			{
				id: 'teams.about',
				title: 'About',
				type: 'basic',
				icon: 'heroicons_outline:question-mark-circle',
				link: '/teams/about'
			},
			{
				id: 'teams.calendar',
				title: 'Calendar',
				type: 'basic',
				icon: 'heroicons_outline:calendar',
				link: '/calendar/view'
			},
			{
				id: 'teams.calendar.list',
				title: 'Calendar Meeting List',
				type: 'basic',
				icon: 'heroicons_outline:desktop-computer',
				link: '/calendar/list'
			},
			{
				id: 'teams.emails',
				title: 'EMail',
				type: 'basic',
				icon: 'heroicons_outline:mail',
				link: '/my-emails'
			},
			{
				id: 'teams.projects',
				title: 'Projects',
				type: 'basic',
				icon: 'heroicons_outline:clipboard-list',
				link: '/projects'
			},
			{
				id: 'teams.list',
				title: 'Teams List',
				type: 'basic',
				icon: 'heroicons_outline:view-list',
				link: '/teams/list'
			},
			{
				id: 'teams.workbench',
				title: 'Teams Workbench',
				type: 'basic',
				icon: 'heroicons_outline:desktop-computer',
				link: 'external-teams-ide'
			}
		]
	}
];

