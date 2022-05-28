import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.secondary.main,
	},
	root: {},
	// Workshop Info
	cardMedia: {
		[theme.breakpoints.down('sm')]: {
			display: 'block',
		},
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
		[theme.breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	price: {
		display: 'flex',
		alignItems: 'center',
	},
	priceStrike: {
		marginLeft: 8,
		marginRight: 8,
		textDecoration: 'line-through',
	},
	galleryMedia: {
		borderRadius: 25,
		// maxWidth: 300,
		height: 200,
		padding: theme.spacing(2),
	},
	media: {
		borderRadius: 5,
		maxWidth: 300,
		margin: '16px 16px 16px 0',
	},
	chips: {
		margin: '8px 8px 8px 0',
	},
	span: {
		fontSize: '16px',
		fontWeight: 600,
		// color: '#FAA906',
	},
	fontIcon: {
		color: '#FAA906',
		marginRight: 20,
		fontSize: 26,
	},
	workshopDetails: {
		display: 'flex',
		alignItems: 'center',
	},
	workshopDates: {
		display: 'flex',
		flexDirection: 'column',
		// alignItems: 'center',
		margin: 20,
	},
	// Responsive Header
	header: {
		// background: '#FEF0EF',
		margin: theme.spacing(2, 'auto'),
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
		[theme.breakpoints.up('md')]: {
			display: 'block',
		},
		[theme.breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	// Registered Workshops
	registeredTitle: {
		margin: 20,
		fontWeight: 700,
	},
}));
