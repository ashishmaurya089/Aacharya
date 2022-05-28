import React from 'react';
import TutorsScroll from '../../components/ScrollComponents/TutorsScroll';
import Services from '../../components/Services/Services';
import CompetitionsScroll from '../../components/ScrollComponents/CompetitionsScroll';
import InstitutesScroll from '../../components/ScrollComponents/InstitutesScroll';
import SkillsScroll from '../../components/ScrollComponents/SkillsScroll';
import WorkshopsScroll from '../../components/ScrollComponents/WorkshopsScroll';
import CompetitionBanner from '../Competitions/CompetitionBanner';
import SkillBanner from '../Skills/SkillBanner';
import WorkshopBanner from '../Workshop/WorkshopBanner';
import ProviderHeader from '../Tutor/Provider/ProviderHeader';

import useStyles from './styles';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

function InstituteHome() {
	const { loading } = useSelector((state) => state.usersData);
	const classes = useStyles();
	let color = '#F6F5F5';

	return (
		<>
			{/* <Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop> */}
			<ProviderHeader provider='institute' />
			<Services type='providerlevel' color={color} />
			<TutorsScroll />
			<InstitutesScroll color={color} />
			<div className='my-4'></div>
			<CompetitionBanner />
			<CompetitionsScroll />
			<SkillBanner />
			<SkillsScroll />
			<WorkshopBanner />
			<WorkshopsScroll />
		</>
	);
}

export default InstituteHome;
