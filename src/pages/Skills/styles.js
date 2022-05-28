import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.secondary.main,
	},
	root: {},
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
	overlay: {
		position: 'absolute',
		display: 'none',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		zIndex: 2,
		cursor: 'pointer',
		content: '',
		opacity: '0.7',
	},
	// Skill Info
	price: {
		display: 'flex',
		alignItems: 'center',
	},
	priceStrike: {
		marginLeft: 8,
		marginRight: 8,
		textDecoration: 'line-through',
	},
	media: {
		borderRadius: 20,
		height: 200,
		maxWidth: 290,
		padding: 16,
	},
	chips: {
		margin: '8px 8px 8px 0',
	},
	flexItem: {
		display: 'flex',
		alignItems: 'center',
	},
	span: {
		fontSize: '16px',
		fontWeight: 600,
		// color: '#FAA906',
	},
	fontIcon: {
		// fontSize: 26,
		color: '#FAA906',
		marginRight: 20,
		fontSize: 26,
	},
	skillDetails: {
		display: 'flex',
		alignItems: 'center',
	},
	skillDates: {
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
	// Registered Skills
	registeredTitle: {
		margin: 20,
		fontWeight: 700,
	},
}));
