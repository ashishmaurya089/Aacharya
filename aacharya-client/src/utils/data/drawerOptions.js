import {
	DateRange,
	ExitToApp,
	HelpOutline,
	Info,
	MailOutline,
	Money,
	Person,
	Settings,
	Share,
	Subscriptions,
} from '@material-ui/icons';
import { useDispatch } from 'react-redux';

// User Options
export const menuOptionsTop = [
	{
		id: 1,
		option: 'Profile',
		icon: <Person />,
		route: '/profile-edit',
	},
	{
		id: 2,
		option: 'Registered Competitions',
		icon: <DateRange />,
		route: '/subscribed-competitions',
	},
	{
		id: 3,
		option: 'Registered Skills',
		icon: <DateRange />,
		route: '/subscribed-skills',
	},
	{
		id: 4,
		option: 'Registered Workshops',
		icon: <DateRange />,
		route: '/subscribed-workshops',
	},
	// {
	// 	option: 'Logout',
	// 	icon: <ExitToApp />,
	// 	route: '/',
	// },
];

export const menuOptionsBottom = [
	{ id: 5, option: 'FAQs', icon: <HelpOutline />, route: '/faqs' },
	{ id: 6, option: 'About', icon: <Info />, route: '/about' },
];
// TutorDrawer Options
export const tutorProfileOptions = [
	{
		id: 7,
		option: 'Share my profile',
		icon: <Share />,
		route: '/share',
	},
	{
		id: 8,
		option: 'Subscriptions',
		icon: <Subscriptions />,
		route: '/tutor-subscriptions',
	},
	{
		id: 9,
		option: 'Purchase Credits',
		// icon: <i className='fas fa-database'></i>,
		icon: <Money />,
		route: '/tutor-credits',
	},
	{
		id: 10,
		option: 'Refer and earn points',
		icon: <ExitToApp />,
		route: '/referral',
	},
	{
		id: 11,
		option: 'FAQs',
		icon: <HelpOutline />,
		route: '/tutor-faqs',
	},
	{
		id: 12,
		option: 'Support',
		icon: <MailOutline />,
		route: '/contact',
	},
	{
		id: 13,
		option: 'Profile Settings',
		icon: <Settings />,
		route: '/tutor-profile',
	},
	// {
	// 	id: 14,
	// 	option: 'Log Out',
	// 	icon: <ExitToApp />,
	// method: function () {
	// 	return dispatch({
	// 		type: 'LOG_OUT',
	// 	});
	// },
	// },
];
// Coaching Center Options
export const coachingCenterProfileOptions = [
	{
		id: 15,
		option: 'Share my profile',
		icon: <Share />,
		route: '/share',
	},
	{
		id: 16,
		option: 'Subscriptions',
		icon: <Subscriptions />,
		route: '/institute-subscriptions',
	},
	{
		id: 17,
		option: 'Purchase Credits',
		// icon: <i className='fas fa-database'></i>,
		icon: <Money />,
		route: '/institute-credits',
	},
	{
		id: 18,
		option: 'Refer and earn points',
		icon: <ExitToApp />,
		route: '/referral',
	},
	{
		id: 19,
		option: 'FAQs',
		icon: <HelpOutline />,
		route: '/institute-faqs',
	},
	{
		id: 20,
		option: 'Support',
		icon: <MailOutline />,
		route: '/contact',
	},
	{
		id: 21,
		option: 'Profile Settings',
		icon: <Settings />,
		route: '/institute-profile',
	},
	// {
	// 	id: 14,
	// 	option: 'Log Out',
	// 	icon: <ExitToApp />,
	// method: function () {
	// 	return dispatch({
	// 		type: 'LOG_OUT',
	// 	});
	// },
	// },
];
