import React from 'react';
import { Suspense, lazy } from 'react';
import { Container } from '@material-ui/core';

// Components
import Hero from '../../components/Hero/Hero';
import CourseSearch from '../../components/Search/CourseSearch';
import Services from '../../components/Services/Services';
import Testimonials from '../../components/Testimonials/Testimonials';

import CompetitionsScroll from '../../components/ScrollComponents/CompetitionsScroll';
import SkillsScroll from '../../components/ScrollComponents/SkillsScroll';
import WorkshopsScroll from '../../components/ScrollComponents/WorkshopsScroll';
import TutorsScroll from '../../components/ScrollComponents/TutorsScroll';
import InstitutesScroll from '../../components/ScrollComponents/InstitutesScroll';
import Experience from '../../components/Experience/Experience';
import CompetitionBanner from '../Competitions/CompetitionBanner';
import SkillBanner from '../Skills/SkillBanner';
import WorkshopBanner from '../Workshop/WorkshopBanner';
import DownloadBanner from '../../components/CustomCard/DownloadBanner';
import WorkFlow from '../../components/WorkFlow';
import Requirement from '../../components/Requirement';
import SignupTutorBanner from '../../components/SignupTutorBanner';
// const Experience = lazy(() => import('../../components/Experience/Experience'));

function Home() {
	let color = '#fff';
	return (
		<>

			<Hero />
			<CourseSearch />

			<Services color={color} />
			{/* <Suspense fallback={<>Loading...</>}>
				<Experience />
			</Suspense> */}
			<Experience />
			<TutorsScroll color={color} />
			<Requirement color={color} />
			<InstitutesScroll color={color} />
			<CompetitionBanner />
			<CompetitionsScroll color={color} />
			{/* <SkillBanner /> */}
			<SkillsScroll />
			{/* <WorkshopBanner /> */}
			<WorkshopsScroll color={color} />
			<Testimonials />
			<WorkFlow />
			<DownloadBanner color={color} />
			<SignupTutorBanner />
		</>
	);
}

export default Home;
