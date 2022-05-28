import { Cancel, CheckCircle } from '@material-ui/icons';

export const tableOptions = [
	{
		id: 1,
		option: 'Subscription Value',
		bronze: 'Free',
		silver: '499/-',
		gold: '1499/-',
	},
	{
		id: 2,
		option: 'Profile listing in Aacharya',
		bronze: 'Life time',
		silver: 'Life time',
		gold: 'Life time',
	},
	{
		id: 3,
		option: 'Free credits',
		bronze: '0',
		silver: '1500',
		gold: '1500',
	},
	{
		id: 4,
		option: 'Validity of credits',
		bronze: 'NA',
		silver: 'One Year',
		gold: 'One Year',
	},
	{
		id: 5,
		option: 'Credits per contact (call / msg)*',
		bronze: '25',
		silver: '25',
		gold: '25',
	},
	{
		id: 6,
		option: 'Student Can Msg You',
		bronze: <CheckCircle style={{ color: '#008000' }} />,
		silver: <CheckCircle style={{ color: '#008000' }} />,
		gold: <CheckCircle style={{ color: '#008000' }} />,
	},
	{
		id: 7,
		option: 'STudent Can Call You',
		bronze: <Cancel color='error' />,
		silver: <CheckCircle style={{ color: '#008000' }} />,
		gold: <CheckCircle style={{ color: '#008000' }} />,
	},
	{
		id: 8,
		option: 'Listing in Top Tutor',
		bronze: <Cancel color='error' />,
		silver: <Cancel color='error' />,
		gold: <CheckCircle style={{ color: '#008000' }} />,
	},
];
