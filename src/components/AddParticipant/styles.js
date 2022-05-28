import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	logo: {
		height: 100,
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	truncate: {
		display: '-webkit-box',
		'-webkit-line-clamp': 2,
		'-webkit-box-orient': 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	// Add Organisation
	organisationPaper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	// Search Organistation
	searchRoot: {
		display: 'flex',
		alignItems: 'baseline',
	},
	searchCard: {
		marginTop: theme.spacing(1),
	},
	searchButton: {
		borderRadius: 4,
		padding: 17,
		background: theme.palette.primary.main,
		color: '#fff',
		marginLeft: 10,
		fontSize: '2rem',
		'&:hover': {
			background: theme.palette.primary.main,
			color: '#fff',
		},
	},
	searchList: {
		padding: 20,
	},
	searchResult: {
		height: 'auto',
		maxHeight: 300,
		overflow: 'hidden',
		overflowY: 'auto',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
	},
	searchItem: {
		'&:hover': {
			color: '#ffc300',
		},
	},
	searchItemList: {
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		padding: 10,
		'& > div': {
			marginLeft: 20,
		},
		'& > div > p': {
			color: '#343434',
			marginBottom: 0,
		},
		'& > div > small': {
			fontSize: 14,
			color: '#B2B1B9',
		},
	},
}));
