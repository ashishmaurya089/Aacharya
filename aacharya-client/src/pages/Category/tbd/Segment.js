import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSegments } from '../../../actions/subjectActions';
import CategoryList from '../CategoryList';
import { heirarchy } from '../heirarchy';

function Segment() {
	const { segments, loading } = useSelector((state) => state.subjectsData);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSegments());
	}, []);
	return (
		<>
			<CategoryList
				breadCrumbs={heirarchy().slice(0, 1)}
				data={segments}
				loading={loading}
				basePath={`/segments`}
			/>
		</>
	);
}

export default Segment;
