import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	postButton: {
		maxWidth: 250,
		color: 'white',
		marginTop: theme.spacing(2),
		background: theme.palette.primary.main,
		padding: '10px 20px',
		textTransform: 'none',
		fontSize: '18px',
	},
	LocationButton: {
		color: 'white',
		textTransform: 'none',
		marginBottom: '10px',
		display: 'block',
		width: '200px',
	},
	searchResultDiv: {
		zIndex: 9,
		backgroundColor: 'white',
		position: 'absolute',
		width: '73%',
		height: '280px',
		boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
		overflowY: 'scroll',
		fontSize: '13px',
	},
	locationSearchResult: {
		zIndex: 9,
		position: 'relative',
		overflowY: 'scroll',
		width: '73%',
		boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
		backgroundColor: 'white',
	},
	searchResultOption: {
		fontSize: '10px',
	},
	resultCard: {
		display: 'block',
		'& > h6': {
			marginBottom: '0',
		},
	},
	mutedText: {
		color: '#999',
	},
	Stepper: {
		width: '100%',
	},
	DialogContent: {
		width: '100%',
	},
	displayBlock: {
		display: 'block',
	},
	tagline: {
		[theme.breakpoints.up('sm')]: {
			fontSize: 24
		},
		fontWeight: 500,
		color: "#373636"
	},
	pyr: {
		fontSize: 48,
		color: '#3c2aa1',
		fontWeight: 900
	},
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));
