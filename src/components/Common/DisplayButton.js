import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	displayButtonRoot: {
		display: 'flex',
	},
	span: {
		fontSize: '16px',
		fontWeight: 600,
	},
	chips: {
		margin: '8px 8px 8px 0',
	},
	button: {
		marginLeft: theme.spacing(2),
		textTransform: 'capitalize',
	},
}));

function DisplayButton({ title, setopenList }) {
	const classes = useStyles();
	return (
		<div className={classes.displayButtonRoot}>
			<Typography variant='h6' className='my-2'>
				<i className='fas fa-stream'></i>{' '}
				<span className={classes.span}>{title}</span>
			</Typography>
			<Button
				variant='contained'
				color='primary'
				className={classes.button}
				onClick={() => setopenList(true)}
			>
				Click to Display
			</Button>
		</div>
	);
}

export default DisplayButton;
