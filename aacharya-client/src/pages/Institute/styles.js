import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	instituteBackdrop: {
		opacity: '0.6',
		// height: 600,
	},
	logoImg: {
		display: 'absolute',
	},
	logo: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	grid: {
		margin: theme.spacing(2, 'auto'),
	},
	profileImg: {
		borderRadius: 10,
		border: '8px solid #fff',
		height: 200,
	},
	fontProperties: {
		fontWeight: 700,
		fontSize: '35px',
	},
	button: {
		padding: theme.spacing(2),
		marginRight: theme.spacing(2),
	},
	subHeading: {
		fontSize: '22px',
		fontWeight: 600,
		// color: '#FAA906',
	},
	reviewButton: {
		margin: '16px auto',
		display: 'flex',
	},
	span: {
		fontSize: '16px',
		fontWeight: 600,
		// color: '#FAA906',
	},
	chips: {
		margin: '8px 8px 8px 0',
	},
	// Institute Header
	paper: {
		padding: 20,
		background: theme.palette.background.default,
		cursor: 'pointer',
	},
	providerRoot: {
		// display: 'flex',
		borderRadius: 10,
		margin: 20,
		[theme.breakpoints.up('lg')]: {
			borderRight: `16px solid ${theme.palette.primary.main}`,
		},
		[theme.breakpoints.up('md')]: {
			borderRight: `16px solid ${theme.palette.primary.main}`,
		},
		[theme.breakpoints.down('sm')]: {
			borderBottom: `16px solid ${theme.palette.primary.main}`,
		},

		// background:
		// 	'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
	},
	verified: {
		color: '#008000',
	},
	notVerified: {
		color: '#DC143C',
	},
	providerDetails: {
		display: 'flex',
		// flexDirection: 'column',
	},
	providerContent: {
		flex: '1 0 auto',
		'& > h5': {
			margin: theme.spacing(2, 'auto'),
			fontWeight: 700,
			fontSize: 30,
		},
		'& > h6': {
			margin: theme.spacing(2, 'auto'),
			fontSize: 26,
		},
	},
	providerCover: {
		// width: 151,
		height: 'auto',
		maxWidth: 350,
		padding: 20,
		borderTopLeftRadius: 30,
		borderBottomLeftRadius: 30,
	},
	providerControls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	providerPlayIcon: {
		height: 38,
		width: 38,
	},
	providerAccount: {
		display: 'flex',
	},
	providerAccountValidity: {
		marginRight: 'auto',
	},
	addCourseButton: {
		margin: 20,
	},
	credit: {
		position: 'absolute',
		bottom: 0,
		width: 350,
		background: theme.palette.background.default,
		padding: 20,
		opacity: 0.6,
		textAlign: 'center',
		fontSize: 30,
	},
	premium: {
		textTransform: 'capitalize',
	},
	// INstitute Subscriptions
	tableRoot: {
		margin: '20px auto',
		borderRadius: 5,
		background: '#ffffff',
	},
	bronze: {
		backgroundColor: '#772f1a',
		backgroundImage: ' linear-gradient(315deg, #772f1a 0%, #f2a65a 74%)',
		textAlign: 'center',
	},
	silver: {
		backgroundColor: '#2d3436',
		backgroundImage: 'linear-gradient(315deg, #2d3436 0%, #d3d3d3 74%)',
		textAlign: 'center',
	},
	gold: {
		background:
			'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
		textAlign: 'center',
	},
	thRow: {
		fontSize: '16px !important',
	},
	optionRow: {
		'& > td': {
			fontSize: 20,
			textAlign: 'center',
		},
	},
	cardRoot: {
		textAlign: 'center',
		margin: '20px auto',
		paddingTop: 20,
		borderRadius: 6,
		'& > h2': {
			fontWeight: 700,
		},
	},
	cardGold: {
		border: '6px solid',
		borderImage:
			'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c) 1',
	},
	cardSilver: {
		border: '6px solid',
		borderImage:
			'linear-gradient(to right, #2d3436, #d3d3d3, #2d3436, #d3d3d3, #2d3436 ) 1',
	},
	title: {
		fontSize: 20,
	},
	tap: {
		padding: 10,
		background: theme.palette.background.default,
		// opacity: 0.6,
	},

	// Institute Profile
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.secondary.main,
	},
	input: {
		display: 'none',
	},
	avatar: {
		display: 'flex',
		justifyContent: 'center',
	},
	avatarImg: {
		height: 125,
		width: 125,
	},
	// selectYear: {
	// 	marginTop: -5,
	// 	'& > *': {
	// 		width: '100%',
	// 		padding: 20,
	// 	},
	// },
	gender: {
		flexDirection: 'row',
	},
	estimateAmount: {
		display: 'flex',
		alignItems: 'center',
	},

	providerProfile: {
		// background: theme.palette.primary.main,
		padding: 20,
		borderRadius: 10,
	},
	providerProfileSubHeading: {
		fontWeight: 600,
		margin: theme.spacing(2, 0, 0),
	},
	providerProfileDivider: {
		height: 1,
		background: '#000000',
	},
	providerProfileInfo: {
		margin: '20px auto',
		textAlign: 'center',
		'& > h6': {
			color: '#fff',
		},
	},
	providerProfileTitle: {
		color: '#fff',
		textShadow: '2px 2px 4px #000000',
	},
	uploadMedia: {
		height: 140,
	},
	uploadMediaHeader: {
		padding: 0,
	},
}));
