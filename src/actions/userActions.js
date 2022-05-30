// Bearer Token Not Needed for Registration API's
import axios from '../axios';
import { toast } from 'react-toastify';
import {
	ADD_ORGANISATION,
	ADD_RATING,
	ADD_SERVICES,
	GET_PROFILE,
	GET_RATING,
	GET_TUTOR_FAQS,
	GET_USER_FAQS,
	REMOVE_SUBJECT,
	SEARCH_ORGANISATION,
	UPDATE_LEARNER_PROFILE,
	UPDATE_PROFILE,
	GET_FORGOT_PASS,
	GET_FORGOT_CHANGE_PASS,
} from '../constants/userConstants';
import { getTutorById } from './tutorActions';

export const addRating =
	(rating, ratedTo, msg) => async (dispatch, getState) => {
		//console.log(rating, ratedTo, msg);
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`/api/users/addRating`, {
				rating: rating,
				ratedTo: ratedTo,
				msg: msg,
			});
			//console.log(data);
			dispatch({
				type: ADD_RATING,
				payload: data.data,
			});
			await dispatch(getRating(ratedTo));
			await dispatch(getTutorById(ratedTo));
			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);

		} catch (error) {
			// //console.log('>>>',error.response);

			toast.error(error.response.data);


			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};

export const getRating = (tutorId) => async (dispatch, getState) => {
	//console.log(tutorId);
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/users/getRating`, {
			tutorId,
		});
		console.log(data);
		dispatch({
			type: GET_RATING,
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
		// toast.error(`Failed with error : ${error}`);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};
export const addingOrganisation =
	(name, locality, city, district, mandal, state) =>
		async (dispatch, getState) => {
			//console.log(name, locality, city, district, mandal, state);
			dispatch({
				type: 'SET_LOADING',
				payload: true,
			});
			try {
				const { data } = await axios.post(`/api/users/addOrganisation`, {
					name,
					locality,
					city,
					district,
					mandal,
					state,
				});
				//console.log(data.data);
				dispatch({
					type: ADD_ORGANISATION,
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
				// toast.error(`Failed with error : ${error}`);
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}
		};
export const searchingOrganisation =
	(searchTerm) => async (dispatch, getState) => {
		//console.log(searchTerm);
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`/api/users/searchOrganisation`, {
				searchTerm: searchTerm,
			});
			//console.log(data.data);
			dispatch({
				type: SEARCH_ORGANISATION,
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
			// toast.error(`Failed with error : ${error}`);
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};
export const updateProfile =
	(body, homeRoute) => async (dispatch, getState) => {
		debugger
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`/api/users/updateProfile`, body);
			//console.log(data);
			dispatch({
				type: UPDATE_PROFILE,
				payload: data.user,
			});
			homeRoute('/');
			setTimeout(() => {
				dispatch({
					type: 'SET_LOADING',
					payload: false,
				});
			}, 600);
		} catch (error) {
			if (error?.response?.data) {
				toast.error(error?.response?.data);
			} else {
				toast.error(error);
			}
			// toast.error(`Failed with error : ${error}`);
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};
export const getProfile = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/users/getProfile`);
		//console.log('%%%%%%%%',data.data);
		dispatch({
			type: GET_PROFILE,
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

export const ForgotPassword = (email) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/forgotPassword`,email);
		console.log('%%%%%%%%',data);
		dispatch({
			type: GET_FORGOT_PASS,
			payload: data,
		});
		setTimeout(() => {
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}, 600);
		return data;
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

export const ForgotChangePassword = (body) => async (dispatch, getState) => {
	debugger
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/changePassword`,body);
		console.log('%%%%%%%%',data);
		dispatch({
			type: GET_FORGOT_CHANGE_PASS,
			payload: data,
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

export const removeSubject = (subjects) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post('/api/tutors/removeSubject', {
			subjects: subjects,
		});
		toast.success('Removed subjects from your portfolio');
		//console.log('Removed subjects', data);
		dispatch({
			type: REMOVE_SUBJECT,
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
		// toast.error(`Failed with error : ${error}`);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};
export const addServices =
	(subjects, homeRouting) => async (dispatch, getState) => {
		//console.log(subjects);
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		try {
			const { data } = await axios.post('/api/tutors/addServices', {
				subjects: subjects,
			});
			toast.success('Requested subjects are added to your portfolio');
			//console.log(data);
			homeRouting(`${data.data.providerType}`);
			dispatch({
				type: ADD_SERVICES,
				payload: data.data,
			});
			dispatch({
				type: 'MSG',
				payload: data.data.providerType,
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
			// toast.error(`Failed with error : ${error}`);
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};
export const updateLearnerProfile = (body) => async (dispatch, getState) => {
	//console.log(body);
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});

	try {
		const { data } = await axios.post('/api/users/updateLearnerProfile', body);
		//console.log('updateLearnerProfile', data);
		dispatch({
			type: UPDATE_LEARNER_PROFILE,
			payload: data.data,
		});
		toast.success(data.msg);
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
		// toast.error(`Failed with error : ${error}`);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};
export const getUserFaqs = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});

	try {
		const { data } = await axios.post('/api/users/getUserFaqs');
		//console.log('getUserFaqs', data);
		dispatch({
			type: GET_USER_FAQS,
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
		// toast.error(`Failed with error : ${error}`);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};
export const getTutorFaqs = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});

	try {
		const { data } = await axios.post('/api/users/getTutorFaqs');
		//console.log('getTutorFaqs', data);
		dispatch({
			type: GET_TUTOR_FAQS,
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
		// toast.error(`Failed with error : ${error}`);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};
