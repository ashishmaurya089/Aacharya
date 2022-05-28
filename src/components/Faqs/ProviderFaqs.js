import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTutorFaqs } from '../../actions/userActions';

import CommonFaqs from './CommonFaqs';

function ProviderFaqs() {
	const dispatch = useDispatch();
	const { tutorFaqs, loading } = useSelector((state) => state.usersData);
	useEffect(() => {
		dispatch(getTutorFaqs());
	}, []);
	return (
		<>
			<CommonFaqs data={tutorFaqs} loading={loading} />
		</>
	);
}

export default ProviderFaqs;
