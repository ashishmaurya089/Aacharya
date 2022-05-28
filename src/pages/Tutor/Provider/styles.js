import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
	},
	borderBronze: {
		[theme.breakpoints.up('md')]: {
			borderRight: '16px solid',
			borderImage: 'linear-gradient(#772f1a,#f2a65a) 0 74%',
		},
		[theme.breakpoints.down('sm')]: {
			borderBottom: '16px solid',
			borderImage: 'linear-gradient(#f2a65a,#772f1a) 74% 0',
		},
	},
	borderSilver: {
		[theme.breakpoints.up('md')]: {
			borderRight: '16px solid',
			borderImage: 'linear-gradient(#2d3436,#d3d3d3) 0 74%',
		},
		[theme.breakpoints.down('sm')]: {
			borderBottom: '16px solid',
			borderImage: 'linear-gradient(#d3d3d3,#2d3436) 74% 0',
		},
	},
	borderGold: {
		[theme.breakpoints.up('md')]: {
			borderRight: '16px solid',
			borderImage: 'linear-gradient(#bf953f,#fcf6ba) 0 74%',
		},
		[theme.breakpoints.down('sm')]: {
			borderBottom: '16px solid',
			borderImage: 'linear-gradient(#fcf6ba,#bf953f) 74% 0',
		},
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
	providerProfileRoot: {
		position: 'relative',
		[theme.breakpoints.up('md')]: {
			marginLeft: 100,
		},
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
		height: 350,
		maxWidth: 350,
		padding: 20,
		// borderTopLeftRadius: 30,
		// borderBottomLeftRadius: 30,
		[theme.breakpoints.up('md')]: {
			borderRadius: '50%',
		},
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
		// margin: 20,
		maxWidth: 300,
		borderRadius: 10,
		[theme.breakpoints.down('sm')]: {
			margin: theme.spacing(1, 'auto'),
		},
	},
	tutorSubjectsMedia: {
		height: 140,
	},
	tutorSubjectsLevels: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},

	search: {
		margin: '20px auto',
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
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
		// margin: '2px 20px',
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
		backgroundColor: '#045de9',
		backgroundImage: 'linear-gradient(315deg, #045de9 0%, #09c6f9 74%)',
	},
	cardMsgRoot: {
		padding: 20,
		backgroundColor: '#bd4f6c',
		backgroundImage: 'linear-gradient(315deg, #bd4f6c 0%, #d7816a 74%)',
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
