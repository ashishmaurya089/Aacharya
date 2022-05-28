import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInstitutes } from '../../actions/tutorActions';
import CustomBreadCrumbs from '../../components/CustomBreadCrumbs';
import InstituteCard from '../../components/CustomCard/InstituteCard';

function Institutes() {
	const { institutes, loading } = useSelector((state) => state.tutorsData);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllInstitutes());
	}, []);
	//console.log('institutes', institutes);
	return (
		<div>
			<CustomBreadCrumbs
				heading='Top Coaching Centers'
				subHeading='Coaching Centers'
			/>
			<InstituteCard
				loading={loading}
				data={institutes}
				basePath='/institutes'
			/>
		</div>
	);
}

export default Institutes;
