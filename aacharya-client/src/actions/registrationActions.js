// Bearer Token Not Needed for Registration API's
import axios from 'axios';
import { toast } from 'react-toastify';
import {
	EMAIL_LOGIN,
	GET_TOKEN,
	LOGIN_WITH_PHONE,
	OTP_VERIFY,
	USER_SIGNUP,
} from '../constants/registrationConstants';
import { GET_PROFILE } from '../constants/userConstants';

// const baseURL = 'https://api.aacharya.net';
// const baseURL = 'http://localhost:3339';
const baseURL = 'https://aacharya.herokuapp.com';

export const loginWithPhone =
	(phoneNumber, countryCode, history) => async (dispatch, getState) => {
		//console.log(phoneNumber, countryCode);
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`${baseURL}/api/users/login`, {
				phoneNumber,
				countryCode,
			});
			//console.log(data.user);
			dispatch({
				type: LOGIN_WITH_PHONE,
				payload: data.user,
			});
			if (data.status === 'success') {
				history.push('/otp');
			}
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


export const emailLogin = (email, password, isMobileUser, history) => async (dispatch, getState) => {
	debugger
	//console.log(email, password);
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {

		const { data } = await axios.post(`${baseURL}/api/users/emailLogin`, {
			email,
			password,
			isMobileUser,
		});
		//console.log(data);
		dispatch({
			type: EMAIL_LOGIN,
			payload: data.user,
		});
		dispatch({
			type: GET_TOKEN,
			payload: data.accessToken,
		});

		if (data.user && data.user.profileCompletion) {
			//console.log('coming');
			if (data.user && data.user.isCoachingCenter) {
				history.push('/institute');
			} else if (data.user && data.user.isTutor) {
				history.push('/tutor');
			} else if (data.user && data.user.isParent) {
				history.push('/');
			} else if (data.user && data.user.isLearner) {
				history.push('/');
			}
		} else {
			history.push('/onboarding');
		}
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

export const adminEmailLogin = (userId,access_token, history) => async (dispatch, getState) => {
	debugger
	//console.log(email, password);
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`${baseURL}/api/getUserById`, {
			access_token,
			userId,
		});
		console.log(data);
		dispatch({
			type: EMAIL_LOGIN,
			payload: data.user,
		});
		dispatch({
			type: GET_TOKEN,
			payload: data.accessToken,
		});

		if (data.user && data.user.profileCompletion) {
			//console.log('coming');
			if (data.user && data.user.isCoachingCenter) {
			 window.location.href = window.location.origin + '/institute';
			} else if (data.user && data.user.isTutor) {
				//history.push('/tutor');
				window.location.href = window.location.origin + '/tutor';
			} else if (data.user && data.user.isParent) {
				//history.push('/');
				window.location.href = window.location.origin + '/';
			} else if (data.user && data.user.isLearner) {
				//history.push('/');
				window.location.href = window.location.origin + '/';
			}
		} else {
			history.push('/onboarding');
		}
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

export const userSignUp =
	(name, email, countryCode, phoneNumber, password, referralCode, history) =>
		async (dispatch, getState) => {
			dispatch({
				type: 'SET_LOADING',
				payload: true,
			});
			try {
				const { data } = await axios.post(`${baseURL}/api/users/signup`, {
					name,
					email,
					countryCode,
					phoneNumber,
					password,
					referralCode,
				});
				//console.log(data);
				dispatch({
					type: USER_SIGNUP,
					payload: data.user,
				});
				if (data.status === 'fail') {
					toast.error(data.msg);
				}
				if (data.status === 'success') {
					history.push('/otp');
				}

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

export const loginVerify =
	(otp, phoneNumber, history) => async (dispatch, getState) => {
		//console.log(otp, phoneNumber);
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`${baseURL}/api/users/loginVerify`, {
				otp: otp,
				phoneNumber: phoneNumber,
			});
			//console.log('loginVerify', data);
			dispatch({
				type: OTP_VERIFY,
				payload: data,
			});
			dispatch({
				type: GET_PROFILE,
				payload: data.user,
			});
			dispatch({
				type: GET_TOKEN,
				payload: data.accessToken,
			});
			// if (data.user && !data.user.isCoachingCenter) {
			// 	history.push('/onboarding');
			// } else {
			// 	toast.error(data.msg);
			// }
			if (data.user && data.user.profileCompletion) {
				//console.log('Coming');
				if (data.user && data.user.isCoachingCenter) {
					history.push('/institute');
				} else if (data.user && data.user.isTutor) {
					history.push('/tutor');
				} else if (data.user && data.user.isParent) {
					history.push('/');
				} else if (data.user && data.user.isLearner) {
					history.push('/');
				}
			} else {
				history.push('/onboarding');
			}

			// if (data.user && !data.user.profileCompletion) {
			// 	history.push('/onboarding');
			// } else if (data.user && data.user.isCoachingCenter) {
			// 	history.push('/institute');
			// } else if (data.user && data.user.isTutor) {
			// 	history.push('/tutor');
			// } else if (
			// 	data.user &&
			// 	data.user.isParent &&
			// 	data.user.profileCompletion
			// ) {
			// 	history.push('/');
			// } else if (
			// 	data.user &&
			// 	data.user.isLearner &&
			// 	data.user.profileCompletion
			// ) {
			// 	history.push('/');
			// }

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
				toast.error(`Failed with error : ${error}`);
			}
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};
