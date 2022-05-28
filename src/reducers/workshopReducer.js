import {
	GET_SUBSCRIBED_WORKSHOPS,
	GET_WORKSHOPS,
	GET_WORKSHOP_BY_ID,
	SEARCH_WORKSHOP,
	SELECTED_WORKSHOP,
	WORKSHOP_REGISTRATION,
} from '../constants/workshopConstants';

export const workshopReducer = (
	state = {
		workshops: [],
		workshop: null,
		subscribedWorkshops: [],
		searchedWorkshops: [],
		selectedWorkshop: {},
		registeredWorkshops: {},
		loading: false,
		page: 0,
		hasNext: false,
	},
	action
) => {
	switch (action.type) {
		case GET_WORKSHOPS:
			return {
				...state,
				workshops: action.payload,
			};
		case GET_WORKSHOP_BY_ID:
			return {
				...state,
				workshop: action.payload,
			};
		// case SELECTED_WORKSHOP:
		// 	return {
		// 		...state,
		// 		workshops: action.payload,
		// 	};
		case WORKSHOP_REGISTRATION:
			return {
				...state,
				registeredWorkshops: action.payload,
			};
		case SEARCH_WORKSHOP:
			return {
				...state,
				searchedWorkshops: action.payload,
			};
		case GET_SUBSCRIBED_WORKSHOPS:
			return {
				...state,
				subscribedWorkshops: action.payload,
			};

		case 'SET_LOADING':
			return {
				...state,
				loading: action.payload,
			};

		default:
			return state;
	}
};
