import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Box } from '@material-ui/core';

import useStyles from './styles';

const labels = {
	0.5: 'Useless',
	1: 'Useless+',
	1.5: 'Poor',
	2: 'Poor+',
	2.5: 'Ok',
	3: 'Ok+',
	3.5: 'Good',
	4: 'Good+',
	4.5: 'Excellent',
	5: 'Excellent+',
};

export default function HoverRating({ rating, setrating }) {
	const [hover, setHover] = React.useState(-1);
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Rating
				name='hover-feedback'
				value={rating}
				precision={0.5}
				onChange={(event, newValue) => {
					setrating(newValue);
				}}
				onChangeActive={(event, newHover) => {
					setHover(newHover);
				}}
			/>
			{rating !== null && (
				<Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>
			)}
		</div>
	);
}
