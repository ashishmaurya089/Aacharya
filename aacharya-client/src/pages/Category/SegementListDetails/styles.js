import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		// margin: 20,
		maxWidth: 300,
		borderRadius: 10,
		[theme.breakpoints.down('sm')]: {
			margin: theme.spacing(1, 'auto'),
		},
	},
	media: {
		height: 140,
	},

	slectedListName: {
		margin: 20,
		textAlign: 'center',
	},
}));
