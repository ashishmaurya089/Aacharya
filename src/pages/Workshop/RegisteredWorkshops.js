import { Container, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscribedWorkshops } from '../../actions/workshopActions';
import RegisteredSWCard from '../../components/CustomCard/RegisteredSWCard';

import useStyles from './styles';

function RegisteredWorkshops() {
	const classes = useStyles();

	const { subscribedWorkshops, loading } = useSelector(
		(state) => state.workshopsData
	);
	const dispatch = useDispatch();

	//console.log('subscribedWorkshops', subscribedWorkshops);
	useEffect(() => {
		dispatch(getSubscribedWorkshops());
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
					Registered Workshops
				</Typography>
				<RegisteredSWCard
					loading={loading}
					data={subscribedWorkshops}
					type='workshop'
					dialogline='No Workshops Registered Yet!'
				/>
			</Container>
		</>
	);
}

export default RegisteredWorkshops;
