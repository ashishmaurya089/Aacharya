import { Container, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscribedSkills } from '../../actions/skillActions';
import RegisteredSWCard from '../../components/CustomCard/RegisteredSWCard';

import useStyles from './styles';

function RegisteredSkills() {
	const classes = useStyles();
	const { subscribedSkills, loading } = useSelector(
		(state) => state.skillsData
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSubscribedSkills());
	}, []);
	return (
		<>
			<Container maxWidth='lg' fixed>
				<Typography
					component='h5'
					variant='h5'
					align='center'
					className={classes.registeredTitle}
				>
					Registered Skills
				</Typography>
				<RegisteredSWCard
					loading={loading}
					data={subscribedSkills}
					type='skill'
					dialogline='No Skills Registered Yet!'
				/>
			</Container>
		</>
	);
}

export default RegisteredSkills;
