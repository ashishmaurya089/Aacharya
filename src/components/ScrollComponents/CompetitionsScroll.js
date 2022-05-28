import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompetitions } from '../../actions/competitionAction';
import CSWCarouselCard from '../CarouselCard/CSWCarouselCard';

function CompetitionsScroll({ color }) {
	const { competitions, loading } = useSelector(
		(state) => state.competitionsData
	);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCompetitions());
	}, []);
	return (
		<div style={{ background: color }}>
			<Container maxWidth="lg">
				<CSWCarouselCard
					data={competitions}
					loading={loading}
					type='competition'
					heading="Competitions"
					tagline='Let your child compete and realize the competitive world'
					basePath='/competitions'
				/>
			</Container>
		</div>
	);
}

export default CompetitionsScroll;
