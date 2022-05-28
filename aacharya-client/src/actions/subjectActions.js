import axios from '../axios';
import { toast } from 'react-toastify';
import {
	FETCH_SEGMENTS,
	FETCH_LEVELS,
	FETCH_STREAMS,
	FETCH_CATEGORIES,
	FETCH_SUBJECTS,
	SUBJECT_MESSAGE,
	SEARCH_LEVEL,
	SEARCH_STREAM,
	SEARCH_CATEGORY,
	SEARCH_SUBJECTS,
} from '../constants/subjectConstants';

export const getSegments = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.get(`/api/subjects/getSegments`);
		dispatch({
			type: FETCH_SEGMENTS,
			payload: data.data,
		});
		setTimeout(() => {
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}, 600);
	} catch (error) {
		if (error.response.data.msg) {
			toast.error(error.response.data.msg);
		} else {
			toast.error(error);
		}
		// toast.error(error);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};

export const getLevels = (segmentId) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/subjects/getLevels`, {
			segment: segmentId,
		});
		dispatch({
			type: FETCH_LEVELS,
			payload: data.data,
		});

		setTimeout(() => {
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}, 600);
	} catch (error) {
		if (error.response.data.msg) {
			toast.error(error.response.data.msg);
		} else {
			toast.error(error);
		}
	}

	dispatch({
		type: 'SET_LOADING',
		payload: false,
	});
};

export const getStreams = (levelId) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});

	try {
		const { data } = await axios.post(`/api/subjects/getStreams`, {
			level: levelId,
		});
		dispatch({
			type: FETCH_STREAMS,
			payload: data.data,
		});
		setTimeout(() => {
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}, 600);
	} catch (error) {
		if (error.response) {
			toast.error(error.response);
		} else {
			toast.error(error);
		}
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};
export const getCategories = (streamId) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/subjects/getCategories`, {
			stream: streamId,
		});
		dispatch({
			type: FETCH_CATEGORIES,
			payload: data.data,
		});
		setTimeout(() => {
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}, 600);
	} catch (error) {
		if (error.response.data.msg) {
			toast.error(error.response.data.msg);
		} else {
			toast.error(error);
		}
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};
export const getAllSubjects =
	(levelId, streamId, categoryId) => async (dispatch, getState) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		try {
			const { data } = await axios.post(`/api/subjects/getSubjects`, {
				category: categoryId,
				stream: streamId,
				level: levelId,
			});
			dispatch({
				type: FETCH_SUBJECTS,
				payload: data.data,
			});
			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		} catch (error) {
			if (error.response.data.msg) {
				toast.error(error.response.data.msg);
			}
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};

// Search API'S
export const searchLevel =
	(searchTerm, segmentId, levelId, streamId, categoryId) =>
	async (dispatch, getState) => {
		// dispatch({
		// 	type: 'SET_LOADING',
		// 	payload: true,
		// });
		try {
			const { data } = await axios.post('/api/subjects/searchLevel', {
				searchTerm: searchTerm,
				segment: segmentId,
				level: levelId,
				stream: streamId,
				category: categoryId,
			});
			//console.log('searchLevel', data);
			dispatch({
				type: SEARCH_LEVEL,
				payload: data.data,
			});
			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		} catch (error) {
			if (error.response.data.msg) {
				toast.error(error.response.data.msg);
			} else {
				toast.error(error);
			}
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};
export const SearchStream =
	(searchTerm, segmentId, levelId, streamId, categoryId) =>
	async (dispatch, getState) => {
		// dispatch({
		// 	type: 'SET_LOADING',
		// 	payload: true,
		// });

		try {
			const { data } = await axios.post('/api/subjects/searchStream', {
				searchTerm: searchTerm,
				segment: segmentId,
				level: levelId,
				stream: streamId,
				category: categoryId,
			});
			dispatch({
				type: SEARCH_STREAM,
				payload: data.data,
			});

			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		} catch (error) {
			if (error?.response?.data?.msg) {
				toast.error(error?.response?.data?.msg);
			} else {
				toast.error(error);
			}
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};
export const searchCategory =
	(searchTerm, segmentId, levelId, streamId, categoryId) =>
	async (dispatch, getState) => {
		// dispatch({
		// 	type: 'SET_LOADING',
		// 	payload: true,
		// });

		try {
			const { data } = await axios.post('/api/subjects/searchCategory', {
				searchTerm: searchTerm,
				segment: segmentId,
				level: levelId,
				stream: streamId,
				category: categoryId,
			});
			dispatch({
				type: SEARCH_CATEGORY,
				payload: data.data,
			});

			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		} catch (error) {
			if (error.response.data.msg) {
				toast.error(error.response.data.msg);
			} else {
				toast.error(error);
			}
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};

export const searchSubjects =
	(searchTerm, segmentId, levelId, streamId, categoryId) =>
	async (dispatch, getState) => {
		// dispatch({
		// 	type: 'SET_LOADING',
		// 	payload: true,
		// });
		try {
			const { data } = await axios.post('/api/subjects/searchSubject', {
				searchTerm: searchTerm,
				segment: segmentId,
				level: levelId,
				stream: streamId,
				category: categoryId,
			});
			//console.log('SUBJECTS>>', data);
			dispatch({
				type: SEARCH_SUBJECTS,
				payload: data.data,
			});
			dispatch({
				type: SUBJECT_MESSAGE,
				payload: data.msg,
			});
			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		} catch (error) {
			if (error.response.data.msg) {
				toast.error(error.response.data.msg);
			} else {
				toast.error(error);
			}
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};

// export const getSubjects =
// 	(segment, level, stream, category, page, perPage) =>
// 	async (dispatch, getState) => {
// 		//console.log('Get Subjects>>>>', segment, level, stream, category);
// 		let body = {
// 			perPage: perPage,
// 			page: page,
// 		};

// 		if (segment) {
// 			body.segment = segment;
// 		}
// 		if (level) {
// 			body.level = level;
// 		}
// 		if (stream) {
// 			body.stream = stream;
// 		}
// 		if (category) {
// 			body.category = category;
// 		}
// 		dispatch({
// 			type: 'SET_LOADING',
// 			payload: true,
// 		});

// 		const { data } = await axios.post(`/api/admin/getSubjects`, body);

// 		//console.log('getSubjects', data);
// 		dispatch({
// 			type: FETCH_SUBJECTS,
// 			payload: data.data,
// 			hasNext: data.hasNext,
// 			page: page,
// 		});
// 		setTimeout(() => {
// 			dispatch({
// 				type: 'SET_LOADING',
// 				payload: false,
// 			});
// 		}, 100);
// 		try {
// 			let reduxPage = getState().tuitionSegments.page;
// 			if (page >= reduxPage) {
// 			} else {
// 				setTimeout(() => {
// 					dispatch({
// 						type: 'SET_LOADING',
// 						payload: false,
// 					});
// 				}, 100);
// 			}
// 		} catch (error) {
// 			toast.error(`Failed with error : ${error}`);
// 			dispatch({
// 				type: 'SET_LOADING',
// 				payload: false,
// 			});
// 		}
// 	};
