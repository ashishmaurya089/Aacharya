import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(2, 'auto'),
		textAlign: 'center',
		color: theme.palette.primary.main,
	},
}));

function NoItemsFound({ dialogline }) {
	const classes = useStyles();
	return (
		<>
			<h1 className={classes.root}>
				<i className='fas fa-exclamation-triangle'></i> {dialogline}
			</h1>
		</>
	);
}

export default NoItemsFound;
