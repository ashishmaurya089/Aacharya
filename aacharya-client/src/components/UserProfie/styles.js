import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	list: {
		width: 300,
	},
	listItem: {
		padding: theme.spacing(1, 2),
	},
	fullList: {
		width: 'auto',
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	userDetailsBox: {
		padding: '20px',
		background: theme.palette.primary.main,
	},
	userDetails: {
		margin: '16px 0',
		'& > h6': {
			fontWeight: 600,
		},
	},
	link: {
		color: 'gray',
		textDecoration: 'none',
	},
	listIcon: {
		'& > svg': {
			fontSize: 36,
		},
		// '& > i': {
		// 	fontSize: 36,
		// },
	},
	listOption: {
		'& > span': {
			fontSize: 16,
			fontWeight: 600,
		},
	},
	avatatButton: {
		padding: 0,
		margin: '5px 0 0 5px',
	},
	// Profile Edit
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.secondary.main,
	},
	subGreeting: {
		fontWeight: 600,
		textAlign: 'center',
		margin: theme.spacing(2, 'auto'),
	},
	input: {
		display: 'none',
	},
	avatar: {
		display: 'flex',
		justifyContent: 'center',
	},
	avatarImg: {
		height: 100,
		width: 100,
	},
	updateButton: {
		margin: theme.spacing(2, 'auto', 5),
	},
}));
