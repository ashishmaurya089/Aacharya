import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkshops } from '../../actions/workshopActions';
import CSWCarouselCard from '../CarouselCard/CSWCarouselCard';

function WorkshopsScroll({ color }) {
	const { workshops, loading } = useSelector((state) => state.workshopsData);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getWorkshops());
	}, []);
	return (
		<div style={{ background: color }}>
			<Container maxWidth="lg">
				<CSWCarouselCard
					data={workshops}
					loading={loading}
					type='workshop'
					heading="Learning-by-doing workshops"
					tagline='Cultivate the habit of hands-on learning and develop practical knowledge with our workshops'
					basePath='/workshops'
				/>
			</Container>
		</div>
	);
}

export default WorkshopsScroll;
