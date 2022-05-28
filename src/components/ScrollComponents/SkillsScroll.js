import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSkills } from '../../actions/skillActions';
import CSWCarouselCard from '../CarouselCard/CSWCarouselCard';

// Images
import CourseOne from '../../images/course-1.jpg';
import CourseTwo from '../../images/course-2.jpg';
import CourseThree from '../../images/course-3.jpg';
import { Container } from '@material-ui/core';

function SkillsScroll({ color }) {
	const { skills, loading } = useSelector((state) => state.skillsData);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSkills());
	}, []);
	return (
		<Container maxWidth="lg">
			<CSWCarouselCard
				data={skills}
				loading={loading}
				type='skill'
				heading="Skills from home"
				tagline='Learn core future skills from industry experts via live online training with industry experts'
				basePath='/skills'
			/>
		</Container>
	);
}

export default SkillsScroll;
