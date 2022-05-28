import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.secondary.main,
	},
	// Common Faqs
	faqTitle: {
		margin: 20,
		fontWeight: 700,
	},
	root: {
		width: '100%',
		margin: theme.spacing(2, 'auto'),
	},
	avatarIcon: {
		background: theme.palette.primary.main,
	},
}));
