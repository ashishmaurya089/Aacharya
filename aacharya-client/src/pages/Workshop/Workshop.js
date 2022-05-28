import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkshops, searchWorkshop } from '../../actions/workshopActions';

import CustomBreadCrumbs from '../../components/CustomBreadCrumbs';
import CompWorkSkillCard from '../../components/CustomCard/CompWorkSkillCard';
import SearchFilterBar from '../../components/SearchFilterBar/SearchFilterBar';

import useStyles from './styles';

function Workshop() {
	const classes = useStyles();

	const { workshops, loading, searchedWorkshops } = useSelector(
		(state) => state.workshopsData
	);
	const dispatch = useDispatch();
	const [searchTerm, setsearchTerm] = useState(null);
	const [level, setlevel] = useState(null);
	const [type, settype] = useState(null);
	const [filter, setfilter] = useState(false);

	//console.log(searchTerm);
	//console.log('level', level);
	//console.log('type', type);
	useEffect(() => {
		dispatch(getWorkshops());
	}, []);
	useEffect(() => {
		// TODO: Implement and pass level and type
		if (searchTerm) {
			dispatch(searchWorkshop(searchTerm, level, type));
			setlevel(null);
			settype(null);
			setfilter(true);
		} else if (level) {
			dispatch(searchWorkshop(searchTerm, level, type));
			setsearchTerm(null);
			settype(null);
			setfilter(true);
		} else {
			dispatch(searchWorkshop(searchTerm, level, type));
			setsearchTerm(null);
			setlevel(null);
			setfilter(true);
		}
	}, [searchTerm, level, type]);
	return (
		<>
			<CustomBreadCrumbs heading='Our Workshop' subHeading='Workshop' />
			<SearchFilterBar
				searchTerm={searchTerm}
				setsearchTerm={setsearchTerm}
				setlevel={setlevel}
				settype={settype}
			/>
			<CompWorkSkillCard
				data={!filter ? workshops : searchedWorkshops}
				loading={loading}
				type='workshop'
				basePath='/workshops'
			/>
		</>
	);
}

export default Workshop;
