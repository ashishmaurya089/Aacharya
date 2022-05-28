// Bearer Token Needed for axios
import axios from '../axios';
import { toast } from 'react-toastify';
import {
	GET_ALL_INSTITUTES,
	GET_ALL_TUTORS,
	GET_CALL_HISTORY,
	GET_GLOBAL_LEADS,
	GET_OPTIONS_PROVIDER_PROFILE,
	GET_STATISTICS,
	GET_SUBSCRIPTION_TABLE,
	GET_TUTOR_BY_ID,
	PURCHASE_CONTACT,
	UPDATE_INSTITUTE_PROFILE,
	UPDATE_TUTOR_PROFILE,
	GET_PRODUCTS,
	PURCHASE_SUBSCRIPTION,
	CLEAN_SUBS,
	FIND_INSTITUTE_BY_SUBJECT,
	FIND_TUTOR_BY_SUBJECT,
	PURCHASE_PRODUCT,
	GET_INSTITUTE_CONFIG,
} from '../constants/tutorConstants';

export const cleanSubscription = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: CLEAN_SUBS,
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
export const getAllTutors = (page) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/tutors/getTutors`,{page,"perPage":12});
		dispatch({
			type: GET_ALL_TUTORS,
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
		// toast.error(`Failed with error : ${error}`);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};

export const getAllInstitutes = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/tutors/getInstitutes`);
		// //console.log(data);
		dispatch({
			type: GET_ALL_INSTITUTES,
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
export const updateTutorProfile =
	(type, formData, homeRoute) => async (dispatch, getState) => {
		debugger
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		//console.log(formData);
		try {
			const { data } = await axios.post(
				`/api/tutors/updateProviderProfile`,
				formData
			);
			//console.log(data);
			if (type === 'Tutor') {
				toast.success('Account Updated');
				homeRoute('/tutor');
				dispatch({
					type: UPDATE_TUTOR_PROFILE,
					payload: data.data,
				});
			} else if (type === 'Institute') {
				toast.success('Account Updated');
				homeRoute('/institute');
				dispatch({
					type: UPDATE_INSTITUTE_PROFILE,
					payload: data.data,
				});
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

export const getOptionsForProviderProfile =
	() => async (dispatch, getState) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(
				`/api/tutors/getOptionsForProviderProfile`
			);
			dispatch({
				type: GET_OPTIONS_PROVIDER_PROFILE,
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
			}
			// toast.error(`Failed with error : ${error}`);
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};
export const getInstituteConfig = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/tutors/getInstituteConfig`);
		dispatch({
			type: GET_INSTITUTE_CONFIG,
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
		}
		// toast.error(`Failed with error : ${error}`);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};
export const getTutorById = (tutorId) => async (dispatch, getState) => {
	//console.log(tutorId);
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/tutors/getTutorById`, {
			tutorId: tutorId,
		});
		dispatch({
			type: GET_TUTOR_BY_ID,
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
export const getGlobalLeads = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/tutors/getGlobalLeads`);
		dispatch({
			type: GET_GLOBAL_LEADS,
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
export const getStatistics = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/tutors/getStatistics`);
		dispatch({
			type: GET_STATISTICS,
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
		// toast.error(`Failed with error : ${error}`);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};
export const callTutor =
	(provider, forSubject) => async (dispatch, getState) => {
		try {
			const { data } = await axios.post(`/api/users/callTutor`, {
				provider: provider,
				forSubject: forSubject,
			});
			// //console.log(data);
		} catch (error) {
			if (error.response.data.msg) {
				toast.error(error.response.data.msg);
			} else {
				toast.error(error);
			}
			// toast.error(`Failed with error : ${error}`);
		}
	};
export const getCallHistory = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/tutors/getCallHistory`);
		// //console.log(data);
		dispatch({
			type: GET_CALL_HISTORY,
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

export const getProducts = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/users/getProducts`);
		//console.log(data);
		dispatch({
			type: GET_PRODUCTS,
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
		// toast.error(`Failed with error : ${error}`);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};

export const getSubscriptionTable = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/tutors/getSubscriptionTable`);
		//console.log(data);
		dispatch({
			type: GET_SUBSCRIPTION_TABLE,
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
		// toast.error(`Failed with error : ${error}`);
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
	}
};
export const purchaseContact = (leadId) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/tutors/purchaseContact`, {
			leadId: leadId,
		});
		//console.log(data);
		toast.success(data);
		dispatch({
			type: PURCHASE_CONTACT,
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

export const purchaseSubscription =
	(uniqueid, subs) => async (dispatch, getState) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`/api/users/subscribe`, {
				productId: subs.productId,
				purchaseToken: uniqueid,
				success: true,
				playStorePurchase: false,
			});
			//console.log(data);

			toast.success('Subscription purchase complete');
			dispatch({
				type: PURCHASE_SUBSCRIPTION,
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
export const purchaseProduct =
	(uniqueid, pro) => async (dispatch, getState) => {
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`/api/users/purchase`, {
				productId: pro.productId,
				purchaseToken: uniqueid,
				success: true,
				playStorePurchase: false,
			});

			toast.success('Product purchase complete');
			dispatch({
				type: PURCHASE_PRODUCT,
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

export const findTutorBySubject = (body) => async (dispatch, getState) => {
	debugger
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/tutors/findTutorBySubject`, body);
		//console.log(data);
		dispatch({
			type: FIND_TUTOR_BY_SUBJECT,
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

export const findInstituteBySubject = (body) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(
			`/api/tutors/findInstituteBySubject`,
			body
		);
		//console.log(data);
		dispatch({
			type: FIND_INSTITUTE_BY_SUBJECT,
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
