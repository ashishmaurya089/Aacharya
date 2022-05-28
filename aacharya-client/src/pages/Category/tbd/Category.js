import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../actions/subjectActions';
import { heirarchy } from '../heirarchy';
import CategoryList from '../CategoryList';

function Category() {
	const { categories, loading } = useSelector((state) => state.subjectsData);
	const dispatch = useDispatch();
	const { segmentId, levelId, streamId } = useParams();

	useEffect(() => {
		if (streamId) {
			dispatch(getCategories(streamId));
		}
	}, []);
	return (
		<>
			<CategoryList
				breadCrumbs={heirarchy(segmentId, levelId, streamId).slice(0, 4)}
				data={categories}
				loading={loading}
				basePath={`/segments/${segmentId}/levels/${levelId}/streams/${streamId}/categories`}
			/>
		</>
	);
}

export default Category;
