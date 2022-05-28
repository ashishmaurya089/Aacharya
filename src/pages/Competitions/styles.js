import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.secondary.main,
	},
	root: {},
	// Competition Info
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
	sponsor: {
		display: 'flex',
		alignItems: 'center',
	},
	sponsorCard: {
		maxWidth: 200,
		borderRadius: 16,
		marginRight: 16,
	},
	sponsorMedia: {
		width: 120,
		padding: 20,
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
	media: {
		borderRadius: 5,
		maxWidth: 300,
		margin: '16px 16px 16px 0',
	},
	galleryMedia: {
		borderRadius: 25,
		// maxWidth: 300,
		height: 200,
		padding: theme.spacing(2),
	},
	chips: {
		margin: '8px 8px 8px 0',
	},
	span: {
		fontSize: '16px',
		fontWeight: 600,
		// color: '#FAA906',
	},
	eventDetails: {
		display: 'flex',
		alignItems: 'center',
	},
	fontIcon: {
		marginRight: 20,
		fontSize: 36,
		color: '#FAA906',
	},
	eventDates: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: 20,
	},
	subEventList: {
		cursor: 'pointer',
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
	// Registered Competitions
	registeredContainer: {},
	registeredRoot: {
		borderLeft: `10px solid ${theme.palette.primary.main}`,
		margin: theme.spacing(2, 'auto'),
	},
	registeredInfo: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	registeredName: {
		'& > h5': {
			fontWeight: 700,
		},
		'& > p': {
			fontWeight: 700,
			color: '#000',
		},
	},
	registeredTitle: {
		margin: 20,
		fontWeight: 700,
	},
	registeredStage: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		// margin: 20,
		'& > h5': {
			fontWeight: 700,
			fontSize: 50,
		},
		'& > p': {
			color: '#000',
		},
	},
	input: {
		display: 'none',
	},
}));
