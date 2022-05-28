import { Backdrop, CircularProgress, Container } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import CompetitionsScroll from '../../components/ScrollComponents/CompetitionsScroll';
import InstitutesScroll from '../../components/ScrollComponents/InstitutesScroll';
import SkillsScroll from '../../components/ScrollComponents/SkillsScroll';
import TutorsScroll from '../../components/ScrollComponents/TutorsScroll';
import WorkshopsScroll from '../../components/ScrollComponents/WorkshopsScroll';
import Services from '../../components/Services/Services';
import CompetitionBanner from '../Competitions/CompetitionBanner';
import SkillBanner from '../Skills/SkillBanner';
import WorkshopBanner from '../Workshop/WorkshopBanner';
import ProviderHeader from './Provider/ProviderHeader';

import useStyles from './styles';
function TutorHome() {
	const { loading } = useSelector((state) => state.usersData);
	const classes = useStyles();
	// let color = '#F6F5F5';
	let color = '#FFFFFF'

	return (
		<>
			{/* <Container maxWidth='lg'> */}
				{/* <Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop> */}
				<ProviderHeader provider='tutor' />
				{/* <TutorHeader /> */}
				<Services type='providerlevel' color={color} />
				<TutorsScroll />
				<InstitutesScroll color={color} />
				<div className='my-4'></div>
				<CompetitionBanner />
				<CompetitionsScroll color={color} />
				{/* <SkillBanner /> */}
				<SkillsScroll/>
				{/* <WorkshopBanner /> */}
				<WorkshopsScroll color={color} />
			{/* </Container> */}
		</>
	);
}

export default TutorHome;
