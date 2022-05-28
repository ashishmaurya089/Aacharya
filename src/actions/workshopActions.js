// Bearer Token Needed for axios
import axios from '../axios';
import { toast } from 'react-toastify';
import {
	GET_SUBSCRIBED_WORKSHOPS,
	GET_WORKSHOPS,
	GET_WORKSHOP_BY_ID,
	SEARCH_WORKSHOP,
	WORKSHOP_REGISTRATION,
} from '../constants/workshopConstants';

export const getWorkshops = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/workshops/getWorkshops`);
		dispatch({
			type: GET_WORKSHOPS,
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

export const workshopRegistration =
	(workshopId, paymentId, workshopName) => async (dispatch, getState) => {
		//console.log(workshopId, paymentId);
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`/api/workshops/registerToWorkShop`, {
				workshopId: workshopId,
				paymentId: paymentId,
			});
			toast.success(`Succesfully registered for ${workshopName}`);
			dispatch({
				type: WORKSHOP_REGISTRATION,
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
export const searchWorkshop =
	(searchTerm, level, type) => async (dispatch, getState) => {
		//console.log(searchTerm, level, type);
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`/api/workshops/searchWorkshops`, {
				searchTerm: searchTerm,
				level: level,
				type: type,
			});
			//console.log(data);
			dispatch({
				type: SEARCH_WORKSHOP,
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
export const getSubscribedWorkshops = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/workshops/getRegisteredWorkshops`);
		//console.log(data);
		dispatch({
			type: GET_SUBSCRIBED_WORKSHOPS,
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
export const getWorkshopById = (workshopId) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/workshops/getWorkshopById`, {
			workshopId: workshopId,
		});
		//console.log(data);
		dispatch({
			type: GET_WORKSHOP_BY_ID,
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
