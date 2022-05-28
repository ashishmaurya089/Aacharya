import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompetitions } from '../../actions/competitionAction';

import CustomBreadCrumbs from '../../components/CustomBreadCrumbs';
import CompWorkSkillCard from '../../components/CustomCard/CompWorkSkillCard';

import useStyles from './styles';

function Competition() {
	const dispatch = useDispatch();

	const { competitions, loading } = useSelector(
		(state) => state.competitionsData
	);

	useEffect(() => {
		dispatch(getCompetitions());
	}, []);
	return (
		<>
			<CustomBreadCrumbs heading='Our Events' subHeading='Competitions' />
			<CompWorkSkillCard
				data={competitions}
				loading={loading}
				type='competition'
				basePath='/competitions'
			/>
		</>
	);
}

export default Competition;
