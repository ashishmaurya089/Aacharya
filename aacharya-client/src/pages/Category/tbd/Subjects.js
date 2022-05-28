import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubjects } from '../../../actions/subjectActions';
import { heirarchy } from '../heirarchy';
import CategoryList from '../CategoryList';

function Subjects() {
	const { subjects, loading } = useSelector((state) => state.subjectsData);
	const dispatch = useDispatch();
	const { segmentId, levelId, streamId, categoryId } = useParams();

	useEffect(() => {
		if (streamId) {
			dispatch(getAllSubjects(levelId, streamId, categoryId));
		}
	}, []);
	return (
		<>
			<CategoryList
				breadCrumbs={heirarchy(segmentId, levelId, streamId, categoryId).slice(
					0,
					5
				)}
				data={subjects}
				loading={loading}
				basePath={`/segments/${segmentId}/levels/${levelId}/streams/${streamId}/categories/${categoryId}/subjects`}
			/>
		</>
	);
}

export default Subjects;
