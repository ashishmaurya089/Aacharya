import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	formControl: {
		borderRadius: 0,
		width: '50%',
		'&:focus': {
			outline: 'none',
		},
	},
	searchIcon: {
		width: '100px',
		background: '#ffc300',
		border: '1px solid #ffc300',
		color: '#fff',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
	},
	cardList: {
		position: 'absolute',
		zIndex: 1,
		padding: 20,
		// width: 'auto',
		// [theme.breakpoints.down('sm')]: {
		// 	maxWidth: 425,
		// },
		// [theme.breakpoints.down('xs')]: {
		// 	maxWidth: 335,
		// },
		// [theme.breakpoints.down('md')]: {
		// 	width: '86%',
		// },
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
	button: {
		// background: '#ffc300',
		width: '50%',
		color: '#fff !important',
		fontWeight: 700,
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	findButton: {
		color: '#fff !important',
		background: theme.palette.primary.main,
		border: 'none !important',
		paddingTop: '0.5rem !important',
		paddingBottom: '0.5rem !important',
		paddingLeft: '20px',
		paddingRight: '20px',
		marginTop: '6px !important',
		borderRadius: '30px',
	},
	searchWrap: {
		margin: theme.spacing(5),
		padding: theme.spacing(3),
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(2),
			margin: theme.spacing(0),
		}
	},
	searchBar: {
		display: 'flex',
		alignItems: 'center',
		background: '#fff',
		padding: 10,
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		// backgroundColor: alpha(theme.palette.common.white, 0.15),
		// '&:hover': {
		// 	backgroundColor: alpha(theme.palette.common.white, 0.25),
		// },
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			// marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchBarIcon: {
		padding: theme.spacing('6px', 2),
		// height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: theme.spacing(1),
		transition: theme.transitions.create('width'),
		width: '100%',


		[theme.breakpoints.up('sm')]: {
			fontSize: "1.1vw",

		},
		[theme.breakpoints.down('sm')]: {
			fontSize: "2.5vw",

		},
		[theme.breakpoints.down('xs')]: {
			fontSize: "3.4vw",

		},
	},
	findButtons: {
		height: '100%',
		display: 'flex',
		'& > button': {
			margin: '0 10px',
			[theme.breakpoints.down('lg')]: {
				padding: theme.spacing(2),
			},
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1),
			},
			[theme.breakpoints.down('sm')]: {
				display: 'block',
				marginTop: theme.spacing(1),
				marginLeft: theme.spacing(0),
				marginRight: theme.spacing(0),
				padding: theme.spacing(1),

			},
		},
		[theme.breakpoints.down('sm')]: {
			display: 'block',
		},
	},
	showButtons: {
		[theme.breakpoints.down('sm')]: {
			display: 'block',
		},
	},

}));
