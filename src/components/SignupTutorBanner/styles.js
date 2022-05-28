import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		margin: theme.spacing(2, 0),
		'& > h2': {
			[theme.breakpoints.down('sm')]: {
				textAlign: 'center',
			},
		},
		'& > p': {
			[theme.breakpoints.up('sm')]: {
				fontSize: 18,
			},
			// fontSize: 18,
			margin: theme.spacing(3, 0),
			[theme.breakpoints.down('sm')]: {
				textAlign: 'center',
			},
		},
	},
	button: {
		// fontSize: 22,
		// border: `1px solid  ${theme.palette.primary.main}`,
		// background: theme.palette.primary.main,
		color: '#fff',
		paddingTop: '1rem',
		paddingBottom: '1rem',
		paddingLeft: '35px',
		paddingRight: '35px',
		borderRadius: '50px',
		[theme.breakpoints.down('sm')]: {
			display: 'block',
			margin: '0 auto',
		},
	},

	headingStyle: {
		// textAlign:"center",
		paddingBottom: "10px",
		textTransform: "uppercase",
		position: "relative",
		fontSize: 30,
		fontWeight: '900 !important',
		"&:after": {
			content: '""',
			background: "#FAA906",
			position: "absolute",
			bottom: 0,
			left: "calc(50% - 25px)",
			height: "4px",
			width: "50px",
		}
	}

}));
