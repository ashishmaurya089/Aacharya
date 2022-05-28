import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		margin: 20,
	},
	locationInput: {
		display: 'flex',
		alignItems: 'center',
		'& > button': {
			marginLeft: theme.spacing(3),
		},
	},
	locationResultTrue: {
		backgroundColor: '#ccc',
		cursor: 'pointer',
		margin: 10,
	},
	locationResultFalse: {
		backgroundColor: '#ffffff',
		cursor: 'pointer',
		margin: 10,
	},
	locationDesc: {
		padding: '0 10px',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.secondary.main,
	},
}));
