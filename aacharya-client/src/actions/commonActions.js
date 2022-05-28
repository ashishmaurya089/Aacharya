import axios from '../axios';
import { toast } from 'react-toastify';
import {
	ADD_FAQ,
	DELETE_FAQ,
	GET_AVATAR,
	GET_BACKDROP,
	GET_BANNERS,
	GET_COMPETITION_DOCUMENTS,
	GET_DEGREE_PROOF,
	GET_DISTANCE_BETWEEN_TWO,
	GET_DOCUMENTS,
	GET_EVENT_FAQS,
	GET_FAQS,
	GET_FIRM_PROOF,
	GET_GALLERY,
	GET_HEAD_PROOF,
	GET_ID_PROOF,
	GET_LOGO,
	GET_REFERRAL_CODE,
	GET_WORK_PROOF,
	GET_AWARD_PROOF,
	GET_HIGHEST_PROOF,
	UPDATE_FAQ,
	UPDATE_LOCATION,
} from '../constants/commonConstants';

export const updateLocation = (coordinates) => async (dispatch, getState) => {
	// //console.log(coordinates);
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/users/updateLocation`, {
			coordinates: coordinates,
		});
		// //console.log(data);
		toast.success('Location Updated');
		dispatch({
			type: UPDATE_LOCATION,
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

export const getBanners = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/getBanners`);
		dispatch({
			type: GET_BANNERS,
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

export const getAvatar = (formData) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/upload/avatar`, formData, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		});
		// //console.log(data.url);
		if (data.status === 'success') {
			toast.success('Profile Image Uploaded');
		}
		dispatch({
			type: GET_AVATAR,
			payload: data.url,
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

export const uploadDocuments =
	(type, formData) => async (dispatch, getState) => {
		debugger
		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			// //console.log('starting to upload');
			const { data } = await axios.post(`/api/upload/documents`, formData, {
				headers: {
					'content-type': 'multipart/form-data',
				},
			});
			console.log(data);
			if (data.status === 'success') {
				debugger
				if (type === 'TutorDocuments') {
					toast.success('Documents Uploaded');
					dispatch({
						type: GET_DEGREE_PROOF,
						payload: data.data,
					});
				} else if (type === 'TutorIdProof') {
					toast.success('Id Proof Uploaded');
					dispatch({
						type: GET_ID_PROOF,
						payload: data.data,
					});
				} else if (type === 'TutorAwardProof') {
					toast.success('Award Proof Uploaded');
					dispatch({
						type: GET_AWARD_PROOF,
						payload: data.data,
					});
				} else if (type === 'TutorHighestProof') {
					toast.success('Highest Degree Proof Uploaded');
					console.log(data.data)
					dispatch({
						type: GET_HIGHEST_PROOF,
						payload: data.data,
					});
				} else if (type === 'TutorWorkProof') {
					toast.success('Work Proof Uploaded');
					dispatch({
						type: GET_WORK_PROOF,
						payload: data.data,
					});
				} else if (type === 'InstituteBackdrop') {
					toast.success('Backdrop Uploaded');
					dispatch({
						type: GET_BACKDROP,
						payload: data.data,
					});
				} else if (type === 'InstituteFirmProof') {
					toast.success('Firm Proof Uploaded');
					dispatch({
						type: GET_FIRM_PROOF,
						payload: data.data,
					});
				} else if (type === 'RecognitionsProof') {
					toast.success('Recognitions Proof Uploaded');
					dispatch({
						type: GET_FIRM_PROOF,
						payload: data.data,
					});
				} else if (type === 'InstituteHeadIdProof') {
					toast.success('Id Proof Uploaded');
					dispatch({
						type: GET_HEAD_PROOF,
						payload: data.data,
					});
				}
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

			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};

export const getReferralCode = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/users/getReferralCode`);
		// //console.log(data);
		dispatch({
			type: GET_REFERRAL_CODE,
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

export const getDistanceBetweenTwo = (body) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/getDistanceBetweenTwo`, body);
		//console.log(data);
		//console.log(getState);
		dispatch({
			type: GET_DISTANCE_BETWEEN_TWO,
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
export const getGallery = (page, perPage) => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/getGallery`, {
			page: page,
			perPage: perPage,
		});
		//console.log(data);
		dispatch({
			type: GET_GALLERY,
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
