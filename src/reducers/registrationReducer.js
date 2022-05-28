// import { toast } from 'react-toastify';

import {
	EMAIL_LOGIN,
	GET_TOKEN,
	LOGIN_WITH_PHONE,
	OTP_VERIFY,
	USER_LOGOUT,
	USER_SIGNUP,
} from '../constants/registrationConstants';

let TOKEN = localStorage.getItem('accessToken');
const initialState = {
	accessToken: localStorage.getItem('token'),
	user: null,
	isAuthenticated: TOKEN ? true : false,
	loading: false,
};

export const registrationReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_WITH_PHONE:
			//console.log(payload);
			return {
				...state,
				user: payload,
			};
		case EMAIL_LOGIN:
			//console.log(payload);
			return {
				...state,
				user: payload,
				providerProfile: null,
				learnerProfile: null,
			};
		case USER_SIGNUP:
			//console.log(payload);
			return {
				...state,
				user: payload,
				providerProfile: null,
				learnerProfile: null,
			};
		case OTP_VERIFY:
			//console.log(payload);
			return {
				...state,
				user: payload,
			};
		case GET_TOKEN:
			//console.log(payload);
			localStorage.setItem('accessToken', payload);
			return {
				...state,
				accessToken: payload,
				isAuthenticated: true,
			};
		case USER_LOGOUT:
			localStorage.removeItem('accessToken');
			localStorage.removeItem('id_token');
			return {
				...state,
				accessToken: null,
				user: null,
				providerProfile: null,
				learnerProfile: null,
				isAuthenticated: false,
			};

		case 'SET_LOADING':
			return {
				...state,
				loading: payload,
			};

		default:
			return state;
	}
};
