import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	grid: {
		margin: theme.spacing(2, 'auto'),
	},
	// [theme.breakpoints.down('sm')]: {
	// 	fontProperties: {
	// 		fontWeight: 500,
	// 		fontSize: '35px',
	// 	},
	// },
	titleFontProp:{
		[theme.breakpoints.down('sm')]:{
			fontSize:'2.5vh',
		},
	},
	fontProperties: {
		fontWeight: 700,
		fontSize: '35px',
		[theme.breakpoints.down('sm')]:{
			fontWeight:600,
			fontSize:'4vh',
		}
	},
	profileImg: {
		borderRadius: 10,
		height: 200,
		[theme.breakpoints.down('sm')]:{
			height:'20vh',
			borderRadius:5,
		}
	},
	subHeading: {
		fontSize: '22px',
		fontWeight: 600,
		// color: '#FAA906',
	},
	sideHeading: {
		margin: theme.spacing(1),
		'& > p': {
			marginLeft: theme.spacing(3),
		},
	},
	table: {
		// minWidth: 650,
	},
	button: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.down('sm')]:{
			marginBottom:theme.spacing(1),
		}
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
	// Tutor Header
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
	// Tutor Subscriptions
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

	// Tutor Subjects
	tutorSubjectsRoot: {
		margin: 20,
		maxWidth: 300,
		borderRadius: 10,
		[theme.breakpoints.down('sm')]: {
			margin: '0 auto',
		},
	},
	tutorSubjectsMedia: {
		height: 140,
	},
	tutorSubjectsLevels: {
		margin: theme.spacing(2, 'auto', 0, '20px'),
	},
	divider: {
		height: 1,
		background: '#808080',
		margin: '0 20px',
	},
	search: {
		margin: '20px auto 2px',
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		// backgroundColor: alpha(theme.palette.common.white, 0.15),
		// '&:hover': {
		// 	backgroundColor: alpha(theme.palette.common.white, 0.25),
		// },
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
		border: `2px solid ${theme.palette.primary.main}`,
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '80ch',
			'&:focus': {
				width: '80ch',
			},
		},
		[theme.breakpoints.down('sm')]: {
			width: '20ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
	cardList: {
		// position: 'absolute',
		// zIndex: 1,
		padding: 20,
		margin: '2px 20px',
	},
	dataResult: {
		height: 'auto',
		maxHeight: 300,
		overflow: 'hidden',
		overflowY: 'auto',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
	},
	dataItem: {
		'&:hover': {
			color: '#ffc300',
		},
	},
	dataItemList: {
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		marginBottom: 20,
		'& > div': {
			marginLeft: 20,
		},
		'& > div > p': {
			color: '#343434 !important',
			marginBottom: 0,
		},
		'& > div > small': {
			color: '#B2B1B9',
		},
	},

	// Tutor Dashbaord
	cardLeadRoot: {
		padding: 20,
		backgroundColor: '#2a2a72',
		backgroundImage: 'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)',
	},
	cardMsgRoot: {
		padding: 20,
		backgroundColor: '#2a2a72',
		backgroundImage: 'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)',
	},
	leadRoot: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		'& > svg': {
			fontSize: 120,
		},
	},
	leads: {
		color: '#fff',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		zIndex: 1,
		'& > p': {
			fontWeight: 700,
			color: '#fff',
		},
		'& > h2': {
			fontWeight: 700,
			color: '#fff',
			fontSize: 50,
		},
	},

	// Tutor Profile
	uploadMedia: {
		height: 140,
	},
	uploadMediaHeader: {
		padding: 0,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.secondary.main,
	},
	tutorProfile: {
		background: theme.palette.primary.main,
		padding: 20,
		borderRadius: 10,
	},
	tutorProfileInfo: {
		margin: '20px auto',
		textAlign: 'center',
		'& > h6': {
			color: '#fff',
		},
	},
	tutorProfileTitle: {
		color: '#fff',
		textShadow: '2px 2px 4px #000000',
	},
	tutorProfileSubHeading: {
		fontWeight: 600,
		margin: theme.spacing(2, 0, 0),
	},
	tutorProfileDivider: {
		height: 1,
		background: '#000000',
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
