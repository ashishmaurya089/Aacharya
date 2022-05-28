import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInstitutes } from '../../actions/tutorActions';
import InstituteCarouselCard from '../CarouselCard/InstituteCarouselCard';

export default function InstitutesScroll({ color }) {
	const { institutes, loading } = useSelector((state) => state.tutorsData);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllInstitutes());
	}, []);

	return (
		<div style={{ background: `${color}` }}>
			<Container maxWidth="lg">
				<InstituteCarouselCard
					data={institutes}
					loading={loading}
					heading='Top Coaching Centers'
					tagline='Seek coaching from the best & verified coaching centers nearby'
					basePath='/institutes'
				/>
			</Container>
		</div>
	);
}
