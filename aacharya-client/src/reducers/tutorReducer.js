import { USER_LOGOUT } from '../constants/registrationConstants';
import {
	GET_ALL_INSTITUTES,
	GET_ALL_TUTORS,
	GET_OPTIONS_PROVIDER_PROFILE,
	UPDATE_TUTOR_PROFILE,
	UPDATE_INSTITUTE_PROFILE,
	GET_TUTOR_BY_ID,
	GET_GLOBAL_LEADS,
	GET_STATISTICS,
	GET_CALL_HISTORY,
	GET_SUBSCRIPTION_TABLE,
	GET_PRODUCTS,
	PURCHASE_SUBSCRIPTION,
	CLEAN_SUBS,
	FIND_INSTITUTE_BY_SUBJECT,
	FIND_TUTOR_BY_SUBJECT,
	SELECTED_SEARCH_SUBJECT,
	PURCHASE_PRODUCT,
	GET_INSTITUTE_CONFIG,
} from '../constants/tutorConstants';

const initialState = {
	tutors: [],
	totalTopTutor:0,
	findTutor: [],
	selectedSearchSubject: null,
	tutorProfile: null,
	updatedTutorProfile: null,
	updatedInstituteProfile: null,
	providerProfileOptions: null,
	subscriptionTableList: null,
	institutes: [],
	findInstitute: [],
	globalLeads: [],
	statistics: null,
	callHistory: [],
	loading: false,
	// tutOnboardingCompleted: false,
	// InstOnboardingCompleted: false,
	purchaseProducts: [],
	purchaseSubs: [],
	purchaseComplete: 0,
};

export const tutorReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_ALL_TUTORS:
			return {
				...state,
				tutors: payload.data,
				totalTopTutor:payload.totalCount
			};
		case GET_ALL_INSTITUTES:
			// //console.log(payload);
			return {
				...state,
				institutes: payload,
			};
		// case UPDATE_TUTOR_PROFILE:
		// 	//console.log(payload);
		// 	return {
		// 		...state,
		// 		updatedTutorProfile: payload,
		// 		// tutOnboardingCompleted: true,
		// 	};
		// case UPDATE_INSTITUTE_PROFILE:
		// 	//console.log(payload);
		// 	return {
		// 		...state,
		// 		updatedInstituteProfile: payload,
		// 		// InstOnboardingCompleted: true,
		// 	};
		case GET_OPTIONS_PROVIDER_PROFILE:
			return {
				...state,
				providerProfileOptions: payload,
			};
		case GET_INSTITUTE_CONFIG:
			return {
				...state,
				instituteConfig: payload,
			};
		case GET_SUBSCRIPTION_TABLE:
			return {
				...state,
				subscriptionTableList: payload,
			};
		case GET_TUTOR_BY_ID:
			return {
				...state,
				tutorProfile: payload,
			};
		case GET_GLOBAL_LEADS:
			return {
				...state,
				globalLeads: payload,
			};
		case GET_STATISTICS:
			return {
				...state,
				statistics: payload,
			};
		case GET_CALL_HISTORY:
			return {
				...state,
				callHistory: payload,
			};
		case PURCHASE_SUBSCRIPTION:
			return {
				...state,
				purchaseComplete: 1,
			};
		case PURCHASE_PRODUCT:
			return {
				...state,
				purchaseComplete: 1,
			};
		case CLEAN_SUBS:
			return {
				...state,
				purchaseComplete: 0,
			};
		case GET_PRODUCTS:
			return {
				...state,
				purchaseProducts: payload.products,
				purchaseSubs: payload.subscriptions,
			};
		case FIND_INSTITUTE_BY_SUBJECT:
			return {
				...state,
				findInstitute: payload,
			};
		case FIND_TUTOR_BY_SUBJECT:
			return {
				...state,
				findTutor: payload,
			};
		case SELECTED_SEARCH_SUBJECT:
			return {
				...state,
				selectedSearchSubject: payload,
			};
		case USER_LOGOUT:
			return {
				...state,
				tutorProfile: null,
				updatedTutorProfile: null,
				updatedInstituteProfile: null,
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
