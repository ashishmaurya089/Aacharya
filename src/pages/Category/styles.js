import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		borderRadius: 10,
		margin: '20px auto',
		maxWidth: 300,
	},
	media: {
		// height: 140,
	},
	height: {
		height: '200px !important',
	},
	// Provider Level
	providerlevel: {
		margin: 20,
		maxWidth: 300,
		borderRadius: 10,
		[theme.breakpoints.down('sm')]: {
			margin: '0 auto',
		},
	},
	providerlevelMedia: {
		height: 140,
	},
	// Provider Subjects
	providerSubjectsRoot: {
		// width: '100%',
		// maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	divider: {
		height: 1,
		background: '#808080',
	},
	addSubjectButton: {
		display: 'flex',
		width: '50%',
		margin: '20px auto',
		padding: 10,
	},
	// Common Search
	search: {
		margin: '20px auto 2px',
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		// backgroundColor: alpha(theme.palette.common.white, 0.15),
		// '&:hover': {
		// 	backgroundColor: alpha(theme.palette.common.white, 0.25),
		// },
		// marginRight: theme.spacing(2),
		// marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			// marginLeft: theme.spacing(3),
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
	// Search Result
	cardList: {
		padding: 20,
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
		padding: theme.spacing(1),
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
}));
