import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Slide,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import GoogleMap from './GoogleMap';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 0.5,
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function UpdateMapLocation({ open, handleClose }) {
	const classes = useStyles();
	return (
		<>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={handleClose}
							aria-label='close'
						>
							<Close />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							Update Location
						</Typography>
					</Toolbar>
				</AppBar>
				{/* Component */}
				<GoogleMap />
			</Dialog>
		</>
	);
}
