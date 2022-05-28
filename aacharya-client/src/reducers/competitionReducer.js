import {
	COMPETITION_REGISTRATION,
	COMPETITION_UPLOADS,
	GET_COMPETITION,
	GET_COMPETITION_BY_ID,
	GET_SUBSCRIBED_COMPETITIONS,
	SELECTED_COMPETITION,
} from '../constants/competitionConstants';

export const competitionReducer = (
	state = {
		competitions: [],
		competition: null,
		subscribedCompetitions: [],
		registeredCompetition: {},
		selectedCompetition: {},
		competitionDocs: [],
		loading: false,
		page: 0,
		hasNext: false,
	},
	action
) => {
	switch (action.type) {
		case GET_COMPETITION:
			return {
				...state,
				competitions: action.payload,
			};
		case GET_COMPETITION_BY_ID:
			return {
				...state,
				competition: action.payload,
			};
		case COMPETITION_REGISTRATION:
			return {
				...state,
				registeredCompetition: action.payload,
			};
		case GET_SUBSCRIBED_COMPETITIONS:
			return {
				...state,
				subscribedCompetitions: action.payload,
			};
		case COMPETITION_UPLOADS:
			return {
				...state,
				competitionDocs: action.payload,
			};
		// case SELECTED_COMPETITION:
		// 	return {
		// 		...state,
		// 		selectedCompetition: action.payload,
		// 	};

		case 'SET_LOADING':
			return {
				...state,
				loading: action.payload,
			};

		default:
			return state;
	}
};
