import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Segment from '../pages/Category/SegmentsList/Segment';
import Level from '../pages/Category/SegmentsList/Level';
import Stream from '../pages/Category/SegmentsList/Stream';
import Category from '../pages/Category/SegmentsList/Category';
import Subjects from '../pages/Category/SegmentsList/Subjects';

function SegmentsList() {
	return (
		<>
			<Switch>
				<Route exact path='/segments' component={Segment} />
				<Route exact path='/segments/:segmentId' component={Level} />
				<Route
					exact
					path='/segments/:segmentId/levels/:levelId'
					component={Stream}
				/>
				<Route
					exact
					path='/segments/:segmentId/levels/:levelId/streams/:streamId'
					component={Category}
				/>

				<Route
					exact
					path='/segments/:segmentId/levels/:levelId/streams/:streamId/categories/:categoryId'
					component={Subjects}
				/>
			</Switch>
		</>
	);
}

export default SegmentsList;
