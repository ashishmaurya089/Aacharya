import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import { ArrowRightAltRounded } from '@material-ui/icons';

import useStyles from './styles';

function SeeMoreCard({ type }) {
	const classes = useStyles();
	const history = useHistory();
	const handleLinks = () => {
		if (type === 'tutors') {
			history.push('/tutors');
		} else if (type === 'institutes') {
			history.push('/institutes');
		} else if (type === 'skill') {
			history.push('/skills');
		} else if (type === 'workshop') {
			history.push('/workshops');
		} else {
			history.push('/competitions');
		}
	};
	return (
		<div className={`${classes.rightbox} ${classes.seemorebox}`}>
			<Button
				variant='contained'
				color='primary'
				className={classes.button}
				onClick={() => handleLinks()}
				endIcon={<ArrowRightAltRounded />}
			>
				See More
			</Button>
		</div>
	);
}

export default SeeMoreCard;
