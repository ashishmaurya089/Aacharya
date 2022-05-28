import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTutors } from '../../actions/tutorActions';
import TutorCarouselCard from '../CarouselCard/TutorCarouselCard';

function TutorsScroll({ color }) {
	const { tutors, loading } = useSelector((state) => state.tutorsData);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllTutors(0));
	}, []);
	console.log('00',tutors);
	return (
		<div style={{ background: `${color}` }}>
			<TutorCarouselCard
				data={tutors}
				loading={loading}
				heading='Our Top Tutors'
				tagline='Learn from highly qualified, experienced and verified tutors'
				basePath='/tutors'
			/>
		</div>
	);
}

export default TutorsScroll;
