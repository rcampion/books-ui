import { FuseNavigationItem } from 'app/zdslogic-shell/@fuse/components/navigation';

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
				id: 'apps.books',
				title: 'Books',
				type: 'basic',
				icon: 'heroicons_outline:academic-cap',
				link: '/books'
			}
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
				id: 'apps.books',
				title: 'Books',
				type: 'basic',
				icon: 'heroicons_outline:academic-cap',
				link: '/books'
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
				id: 'apps.books',
				title: 'Books',
				type: 'basic',
				icon: 'heroicons_outline:academic-cap',
				link: '/books'
			}
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
				id: 'systems.books.admin',
				title: 'Books Admin',
				type: 'basic',
				icon: 'heroicons_outline:table',
				link: '/books-admin'
			},
		]
	}
];

