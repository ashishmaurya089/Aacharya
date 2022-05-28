import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStreams } from '../../../actions/subjectActions';
import { heirarchy } from '../heirarchy';
import CategoryList from '../CategoryList';

function Stream() {
	const { streams, loading } = useSelector((state) => state.subjectsData);
	const dispatch = useDispatch();
	const { segmentId, levelId } = useParams();

	useEffect(() => {
		if (segmentId && levelId) {
			dispatch(getStreams(levelId));
		}
	}, []);
	return (
		<>
			<CategoryList
				breadCrumbs={heirarchy(segmentId, levelId).slice(0, 3)}
				data={streams}
				loading={loading}
				basePath={`/segments/${segmentId}/levels/${levelId}/streams`}
			/>
		</>
	);
}

export default Stream;
