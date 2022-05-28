import { Container } from '@material-ui/core';
import React from 'react';
import InstituteFiled from '../../components/Provider/InstituteFiled';

function InstituteProfile() {
	return (
		<Container maxWidth='sm' fixed>
			<InstituteFiled updating={true} />
		</Container>
	);
}

export default InstituteProfile;
