// Bearer Token Needed for axios
import axios from '../axios';
import { toast } from 'react-toastify';
import {
	COMPETITION_REGISTRATION,
	COMPETITION_UPLOADS,
	GET_COMPETITION,
	GET_COMPETITION_BY_ID,
	GET_SUBSCRIBED_COMPETITIONS,
} from '../constants/competitionConstants';

export const getCompetitions = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/events/getCompetitions`);
		dispatch({
			type: GET_COMPETITION,
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
export const competitionRegistration =
	(
		subEventId,
		eventName,
		participantName,
		participantEmail,
		participantPhone,
		participantStandard,
		educationalLevel,
		insititute
	) =>
	async (dispatch, getState) => {
		//console.log(
		// 	subEventId,
		// 	eventName,
		// 	participantName,
		// 	participantEmail,
		// 	participantPhone,
		// 	participantStandard,
		// 	educationalLevel,
		// 	insititute
		// );

		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});

		try {
			const { data } = await axios.post(`/api/events/addParticipant`, {
				subEventId,
				participantName,
				participantEmail,
				participantPhone,
				participantStandard,
				educationalLevel,
				insititute,
			});
			//console.log(data);
			if (data.status === 'success') {
				toast.success(
					`Registred for ${eventName}. You will be get the details`
				);
			}
			dispatch({
				type: COMPETITION_REGISTRATION,
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

export const getSubscribedCompetitions = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/events/getSubscribedCompetitions`);
		//console.log(data.data);
		dispatch({
			type: GET_SUBSCRIBED_COMPETITIONS,
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

export const eventUploads = (body) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/events/eventUploads`, body);
		//console.log('eventUploads', data);
		toast.success('Sucessfully Uploaded');
		dispatch({
			type: COMPETITION_UPLOADS,
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
export const getCompetitionById =
	(competitionId) => async (dispatch, getState) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`/api/events/getCompetitionById`, {
				competitionId: competitionId,
			});
			dispatch({
				type: GET_COMPETITION_BY_ID,
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
