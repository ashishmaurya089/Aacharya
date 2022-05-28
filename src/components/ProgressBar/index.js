import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '80vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		// position: 'fixed',
		// top: '50%',
		// left: '50%',
		// transform: 'translate(-50%, -50%)',
	},
}));

function ProgressBar() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<CircularProgress color='secondary' />
		</div>
	);
}

export default ProgressBar;
