import { Container } from '@material-ui/core';
import React from 'react';
import TutorFiled from '../../components/Provider/TutorFiled';

function TutorProfile() {
	return (
		<Container maxWidth='sm' fixed>
			<TutorFiled updating={true} />
		</Container>
	);
}

export default TutorProfile;
