import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	// MUI Contact
	contact: {
		// boxShadow: '0 0 30px rgb(214 215 216 / 60%)',
		padding: '20px 0 30px 0',
		textAlign: 'center',
		margin: theme.spacing(3, 0),
		height: 175,
		[theme.breakpoints.down('xs')]: {
			margin: theme.spacing(2, 0, 1),
			height: 'auto',
		},
		'& > svg': {
			fontSize: 36,
		},
		'& > h3': {
			fontSize: 24,
			color: '#2c4964',
			fontWeight: 700,
			margin: '10px 0',
		},
		'& > a': {
			color: '#2c4964',
		},
		'& > p': {
			lineHeight: '24px',
			fontSize: 14,
		},
	},

	// Contact Form
	paper: {
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(2),
		},
	},
	formRoot: {
		padding: theme.spacing(2, 2, 5),
		marginBottom: theme.spacing(5),
	},
	successMsg: {
		display: 'none',
	},
	faliureMsg: {
		display: 'block',
	},
	subHead: {
		padding: '20px 0 0 0',
		textAlign: 'center',
		// margin: theme.spacing(3, 0),
		'& > h3': {
			fontSize: 24,
			color: '#2c4964',
			fontWeight: 700,
		},
	},
}));
