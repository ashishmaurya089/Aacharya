import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFaqs } from '../../actions/userActions';
import CommonFaqs from './CommonFaqs';

function UserFaqs() {
	const dispatch = useDispatch();
	const { userFaqs, loading } = useSelector((state) => state.usersData);

	useEffect(() => {
		dispatch(getUserFaqs());
	}, []);

	return (
		<>
			<CommonFaqs data={userFaqs} loading={loading} />
		</>
	);
}

export default UserFaqs;
