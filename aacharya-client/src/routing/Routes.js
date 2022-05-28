import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Error from '../pages/Error/Error';

const Routes = () => {
	return (
		<>
			<section className='container'>
				<Switch>
					<Route component={Error} />
				</Switch>
			</section>
		</>
	);
};

export default Routes;

// <section className='container'>
// 				<Alert />
// 				<Switch>
// 					<Route exact path='/register' component={Register} />
// 					<Route exact path='/login' component={Login} />
// 					<Route exact path='/profiles' component={Profiles} />
// 					<Route exact path='/profile/:id' component={Profile} />
// 					{/* <Route exact path='/login' component={SignIn} />
// 							<Route exact path='/register' component={Signup} /> */}
// 					<PrivateRoute exact path='/dashboard' component={Dashboard} />
// 					<PrivateRoute
// 						exact
// 						path='/create-profile'
// 						component={CreateProfile}
// 					/>
// 					<PrivateRoute exact path='/edit-profile' component={EditProfile} />
// 					<PrivateRoute
// 						exact
// 						path='/add-experience'
// 						component={AddExperience}
// 					/>
// 					<PrivateRoute exact path='/add-education' component={AddEducation} />
// 					<PrivateRoute exact path='/posts' component={Posts} />
// 					<PrivateRoute exact path='/posts/:id' component={Post} />

// 					<Route component={NotFound} />
// 				</Switch>
// 			</section>
