import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	debugger
	const authReducer = useSelector((state) => state.authReducer);

	const { isAuthenticated, loading } = authReducer;

	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && loading ? (
					<Redirect to='/login' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PrivateRoute;
