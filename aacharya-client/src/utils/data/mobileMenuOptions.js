import { Dashboard, Home, MenuBook } from '@material-ui/icons';

// Tutor Hamberger Options
export const tutorMobileMenuOptions = [
	{
		id: 27,
		option: 'Home',
		icon: <Home />,
		route: '/tutor',
	},
	{
		id: 28,
		option: 'Subjects',
		icon: <MenuBook />,
		route: '/tutor-subjects',
	},
	{
		id: 29,
		option: 'Dashboard',
		icon: <Dashboard />,
		route: '/tutor-dashboard',
	},
];

// Institute Hamberger Options
export const instituteMobileMenuOptions = [
	{
		id: 30,
		option: 'Home',
		icon: <Home />,
		route: '/institute',
	},
	{
		id: 31,
		option: 'Courses',
		icon: <MenuBook />,
		route: '/institute-courses',
	},
	{
		id: 32,
		option: 'Dashboard',
		icon: <Dashboard />,
		route: '/institute-dashboard',
	},
];
