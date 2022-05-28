import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	// Hover Rating
	hoverRatingRoot: {
		width: 200,
		display: 'flex',
		alignItems: 'center',
		margin: '0 auto',
	},
	// GetRating
	getRatingRoot: {
		width: '100%',
		// maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
		margin: theme.spacing(2, 'auto'),
	},
	ratingText: {
		'& > span': {
			fontWeight: 600,
		},
	},
}));
