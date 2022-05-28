import { alpha, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	appBar: {
		width: '100%',
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	toolbar: {
		background: '#fff',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
	grow: {
		flexGrow: 1,
	},
	searchIconOpened: {
		right: theme.spacing(1.25),
	},
	searchFocused: {
		backgroundColor: alpha(theme.palette.common.black, 0.08),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
	},
	headerIcon: {
		fontSize: 28,
		// color: 'rgba(255, 255, 255, 0.35)',
	},
	headerMenu: {
		marginTop: theme.spacing(7),
	},
	headerMenuItem: {
		'&:hover, &:focus': {
			backgroundColor: theme.palette.primary.main,
			color: 'white',
		},
	},
	headerMenuButton: {
		marginLeft: theme.spacing(2),
		padding: theme.spacing(0.5),
	},
	profileMenu: {
		minWidth: 265,
	},
	profileMenuUser: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(2, 2, 0, 2),
	},
	divider: {
		height: 1,
		background: '#808080',
		marginTop: theme.spacing(1),
	},
	profileMenuItem: {
		color: theme.palette.text.hint,
	},
	profileMenuIcon: {
		marginRight: theme.spacing(2),
		color: theme.palette.text.hint,
	},
	profileMenuLink: {
		fontSize: 16,
		textDecoration: 'none',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 0, 0, 1),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		border: '1px solid #ffc107',
		borderRadius: 50,
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		// [theme.breakpoints.up('md')]: {
		// 	width: '80ch',
		// 	'&:focus': {
		// 		width: '80ch',
		// 	},
		// },
		[theme.breakpoints.down('sm')]: {
			width: '20ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));
