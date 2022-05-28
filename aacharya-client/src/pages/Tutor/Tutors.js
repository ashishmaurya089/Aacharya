import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomBreadCrumbs from '../../components/CustomBreadCrumbs';
import TutorCard from '../../components/CustomCard/TutorCard';

function Tutors() {
	const {  loading } = useSelector((state) => state.tutorsData);
	
	
	
	return (
		<>
			<CustomBreadCrumbs heading='Meet Our Top Tutors' subHeading='Tutors' />
			<TutorCard loading={loading}  basePath={'/tutors'} />
		</>
	);
}

export default Tutors;
