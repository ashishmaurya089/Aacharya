import React from 'react';
import { Chip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	span: {
		fontSize: '16px',
		fontWeight: 600,
	},
	chips: {
		margin: '8px 8px 8px 0',
	},
}));

function ChipListLevel({ data, title }) {
	const classes = useStyles();
	return (
		<div>
			<Typography variant='h6' className='my-2'>
				<i className='fas fa-stream'></i>{' '}
				<span className={classes.span}>{title}</span>
			</Typography>
			{data &&
				data.map((item) => (
					<Chip
						label={item.name}
						key={item._id}
						className={classes.chips}
						color='primary'
					/>
				))}
		</div>
	);
}

export default ChipListLevel;
