import { USER_LOGOUT } from '../constants/registrationConstants';
import {
	UPDATE_INSTITUTE_PROFILE,
	UPDATE_TUTOR_PROFILE,
} from '../constants/tutorConstants';
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
	UPDATE_PROFILE,
	GET_FORGOT_PASS,
	GET_FORGOT_CHANGE_PASS,
} from '../constants/userConstants';

const initialState = {
	user: null,
	providerProfile: null,
	learnerProfile: null,
	rating: [],
	allRatings: [],
	organisation: {},
	searchOrganisation: [],
	subjectsAdded: false,
	tutorFaqs: [],
	userFaqs: [],
	// learnerOnBoarding: false,
	msg: '',
	forgotPassDetail: {},
	forgotChangePass: {},
	loading: false,
};

export const userReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_RATING:
			//console.log(payload);
			let newData = state.allRatings.map((rating) => {
				if (rating._id === payload._id) {
					rating = payload;
				}
				return rating;
			});
			return {
				...state,
				rating: payload,
				allRatings: newData,
			};
		case GET_RATING:
			return {
				...state,
				allRatings: payload,
			};

		case ADD_ORGANISATION:
			//console.log(payload);
			return {
				...state,
				organisation: payload,
			};
		case SEARCH_ORGANISATION:
			//console.log(payload);
			return {
				...state,
				searchOrganisation: payload,
			};
		case UPDATE_PROFILE:
			//console.log(payload);
			return {
				...state,
				user: payload,
				// learnerOnBoarding: true,
			};
		case UPDATE_TUTOR_PROFILE:
		case UPDATE_INSTITUTE_PROFILE:
			//console.log(payload);
			return {
				...state,
				providerProfile: payload,
				// learnerOnBoarding: true,
			};
		case GET_PROFILE:
			//console.log(payload);
			return {
				...state,
				user: payload.user,
				providerProfile: payload.providerProfile,
				learnerProfile: payload.learnerProfile,
			};
		case GET_FORGOT_PASS:
			return {
				...state,
				forgotPassDetail: action.payload,
			};
		case GET_FORGOT_CHANGE_PASS:
			return {
				...state,
				forgotChangePass: action.payload,
			};
		case GET_TUTOR_FAQS:
			return {
				...state,
				tutorFaqs: payload,
			};
		case GET_USER_FAQS:
			return {
				...state,
				userFaqs: payload,
			};
		case REMOVE_SUBJECT:
			return {
				...state,
				subjectAddRemove: action.payload,
			};
		case ADD_SERVICES:
			return {
				...state,
				// subjectsAdded: action.payload,
				subjectsAdded: true,
			};
		case 'MSG':
			//console.log(action.payload);
			return {
				...state,
				msg: action.payload,
			};
		case USER_LOGOUT:
			return {
				...state,
				user: null,
				providerProfile: null,
				learnerProfile: null,
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
