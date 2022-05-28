// Bearer Token Needed for axios
import axios from '../axios';
import { toast } from 'react-toastify';
import {
	BOOK_A_DEMO,
	GET_SKILLS,
	GET_SKILL_BY_ID,
	GET_SUBSCRIBED_SKILLS,
	SEARCH_SKILL,
	SKILL_REGISTRATION,
} from '../constants/skillConstants';

export const getSkills = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/skills/getSkills`);
		dispatch({
			type: GET_SKILLS,
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

export const skillRegistration =
	(courseId, paymentId, courseName) => async (dispatch, getState) => {
		//console.log(courseId, paymentId);
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`/api/skills/registerToSkill`, {
				courseId: courseId,
				paymentId: paymentId,
			});
			toast.success(`Succesfully registered for ${courseName}`);
			//console.log(data.data);
			dispatch({
				type: SKILL_REGISTRATION,
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

export const bookADemo =
	(courseId, courseName) => async (dispatch, getState) => {
		//console.log(courseId);
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`/api/skills/bookDemo`, {
				courseId: courseId,
			});
			//console.log(data);
			if (data.status === 'success') {
				toast.success(
					`A demo session for ${courseName} has been booked. You will be contacted for demo class details`
				);
			}
			dispatch({
				type: BOOK_A_DEMO,
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
export const searchSkills =
	(searchTerm, level, type) => async (dispatch, getState) => {
		//console.log(searchTerm, level, type);
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`/api/skills/searchSkills`, {
				searchTerm: searchTerm,
				level: level,
				type: type,
			});
			//console.log(data);
			dispatch({
				type: SEARCH_SKILL,
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
export const getSubscribedSkills = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/skills/getRegisteredSkills`);
		//console.log(data);
		dispatch({
			type: GET_SUBSCRIBED_SKILLS,
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
export const getSkillById = (courseId) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/skills/getSkillById`, {
			courseId: courseId,
		});
		//console.log(data);
		dispatch({
			type: GET_SKILL_BY_ID,
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
