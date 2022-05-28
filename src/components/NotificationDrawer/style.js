import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;
export default makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'space-between',
	},
	drawer: {
		// width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,

	list: {
		width: '100%',
		maxWidth: '36ch',
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
}));
