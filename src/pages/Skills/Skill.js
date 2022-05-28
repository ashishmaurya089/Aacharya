import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSkills, searchSkills } from '../../actions/skillActions';

import CustomBreadCrumbs from '../../components/CustomBreadCrumbs';
import CompWorkSkillCard from '../../components/CustomCard/CompWorkSkillCard';
import SearchFilterBar from '../../components/SearchFilterBar/SearchFilterBar';

import useStyles from './styles';

function Skill() {
	const classes = useStyles();
	const { skills, loading, searchedSkills } = useSelector(
		(state) => state.skillsData
	);
	const dispatch = useDispatch();
	const [searchTerm, setsearchTerm] = useState('');
	const [level, setlevel] = useState(null);
	const [type, settype] = useState(null);
	const [filter, setfilter] = useState(false);

	//console.log(searchedSkills);
	//console.log(searchTerm);
	//console.log('level', level);
	//console.log('type', type);

	useEffect(() => {
		dispatch(getSkills());
	}, []);

	useEffect(() => {
		// TODO: Implement and pass level and type
		if (searchTerm) {
			dispatch(searchSkills(searchTerm, level, type));
			setlevel(null);
			settype(null);
			setfilter(true);
		} else if (level) {
			dispatch(searchSkills(searchTerm, level, type));
			setsearchTerm(null);
			settype(null);
			setfilter(true);
		} else {
			dispatch(searchSkills(searchTerm, level, type));
			setsearchTerm(null);
			setlevel(null);
			setfilter(true);
		}
	}, [searchTerm, level, type, dispatch]);

	return (
		<>
			<CustomBreadCrumbs heading='Our Skills' subHeading='Skills' />
			<SearchFilterBar
				searchTerm={searchTerm}
				setsearchTerm={setsearchTerm}
				setlevel={setlevel}
				settype={settype}
				searchType={'skill'}
			/>
			<CompWorkSkillCard
				data={!filter ? skills : searchedSkills}
				loading={loading}
				type='skill'
				basePath='/skills'
			/>
		</>
	);
}

export default Skill;
