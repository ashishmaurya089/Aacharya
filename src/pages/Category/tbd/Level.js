import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLevels } from '../../../actions/subjectActions';
import { heirarchy } from '../heirarchy';
import CategoryList from '../CategoryList';

function Level() {
	const { levels, loading } = useSelector((state) => state.subjectsData);
	const dispatch = useDispatch();
	const { segmentId } = useParams(); // need to change this to id
	useEffect(() => {
		if (segmentId) {
			dispatch(getLevels(segmentId));
		}
	}, []);
	return (
		<>
			<CategoryList
				breadCrumbs={heirarchy(segmentId).slice(0, 2)}
				data={levels}
				loading={loading}
				basePath={`/segments/${segmentId}/levels`}
			/>
		</>
	);
}

export default Level;
