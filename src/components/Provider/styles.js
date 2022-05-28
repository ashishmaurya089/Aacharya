import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.secondary.main,
	},
	profiles: {
		display: 'flex',
		alignItems: 'center',
	},
	profileFigure: {
		'& > img': {
			height: 100,
			width: 100,
			margin: theme.spacing(0, 2),
			borderRadius: 50,
			background: '#fff',
			cursor: 'pointer',
			[theme.breakpoints.down('sm')]: {
				height: 60,
				width: 60,
			},
		},
		'& > figcaption': {
			textAlign: 'center',
			fontSize: 20,
			margin: theme.spacing(2, 'auto'),
		},
	},
	formContainer: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	tab: {
		fontWeight: 400,
		fontSize: 18,
	},
	greeting: {
		fontWeight: 500,
		textAlign: 'center',
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	subHeading: {
		fontWeight: 700,
		margin: theme.spacing(2, 0),
	},
	subGreeting: {
		fontWeight: 500,
		textAlign: 'center',
		marginTop: theme.spacing(2),
	},
	creatingButtonContainer: {
		margin: theme.spacing(2, 'auto'),
		height: 46,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	createAccountButton: {
		height: 46,
		textTransform: 'none',
		margin: theme.spacing(2, 0),
	},
	formDividerContainer: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
		display: 'flex',
		alignItems: 'center',
	},
	formDividerWord: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
	formDivider: {
		flexGrow: 1,
		height: 1,
		backgroundColor: theme.palette.text.hint + '40',
	},
	errorMessage: {
		textAlign: 'center',
	},
	textFieldUnderline: {
		'&:before': {
			borderBottomColor: theme.palette.primary.light,
		},
		'&:after': {
			borderBottomColor: theme.palette.primary.main,
		},
		'&:hover:before': {
			borderBottomColor: `${theme.palette.primary.light} !important`,
		},
	},
	textField: {
		borderBottomColor: theme.palette.background.light,
	},
	formButtons: {
		width: '100%',
		marginTop: theme.spacing(4),
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	forgetButton: {
		textTransform: 'none',
		fontWeight: 400,
	},
	loginLoader: {
		marginLeft: theme.spacing(4),
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
	chips: {
		margin: '8px 8px 8px 0',
	},
	// TutorFiled
	cardRoot: {
		padding: 10,
	},
	tutor: {
		height: 300,
		position: 'relative',
		borderRadius: 10,
		[theme.breakpoints.down('sm')]: {
			margin: '0 auto',
		},
		boxShadow: 'none',
		background: '#f6f5f5',
	},
	tutorBackdrop: {
		zIndex: 0,
		position: 'absolute',
		margin: '0 auto',
		top: 0,
		right: 0,
		left: 0,
		height: '200px !important',
		width: '100% !important',
		backgroundColor: '#fff',
		borderTopRightRadius: '10px',
		borderTopLeftRadius: '10px',
		border: "2px solid black",
		padding: "25px",
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% 100%",
	},
	tutorImg: {
		position: 'absolute',
		top: '100px',
		right: 0,
		left: 0,
		height: '200px !important',
		width: '200px !important',
		margin: '0  auto',
		border: '10px solid #f6f5f5',
		backgroundColor: '#fff',
	},
	instinput: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 20,
		'& > lable': {
			cursor: 'pointer',
		},
	},
	uploadMedia: {
		height: 140,
	},
	uploadMediaHeader: {
		padding: 0,
	},
	noMedia: {
		height: 180,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	// Institute Filed
	ProviderSegmentsListRoot: {
		padding: 0,
		'& > li': {
			padding: 0,
		},
	},
}));
