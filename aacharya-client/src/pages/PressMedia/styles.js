import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.secondary.main,
	},
	pressMediaGalleryRoot: {
		// maxHeight: 250,
		borderRadius: 10,
		margin: theme.spacing(1),
		[theme.breakpoints.down('sm')]: {
			maxWidth: 345,
		},
	},
	pressMediaGalleryZoom: {
		'-webkit-transform': 'scale(1)',
		transform: 'scale(1)',
		'-webkit-transition': '.3s ease-in-out',
		transition: '.3s ease-in-out',
		'&:hover > img': {
			'-webkit-transform': 'scale(1.2)',
			transform: 'scale(1.2)',
			transition: '.3s ease-in',
		},
	},
	pressMediaCaption: {
		background: '#000',
		opacity: '0.6',
		'& > h2': {
			color: theme.palette.primary.main,
		},
	},
	exploreButton: {
		padding: '10px 40px',
		display: 'block',
		margin: '20px auto',
	},
}));
