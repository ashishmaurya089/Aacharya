import {
	BOOK_A_DEMO,
	GET_SKILLS,
	GET_SKILL_BY_ID,
	GET_SUBSCRIBED_SKILLS,
	SEARCH_SKILL,
	SELECTED_SKILL,
	SKILL_REGISTRATION,
} from '../constants/skillConstants';

export const skillReducer = (
	state = {
		skills: [],
		skill: null,
		subscribedSkills: [],
		registeredSkills: {},
		searchedSkills: [],
		demoBooking: {},
		selectedSkill: {},
		loading: false,
		page: 0,
		hasNext: false,
	},
	action
) => {
	switch (action.type) {
		case GET_SKILLS:
			return {
				...state,
				skills: action.payload,
			};
		case GET_SKILL_BY_ID:
			return {
				...state,
				skill: action.payload,
			};
		case SKILL_REGISTRATION:
			return {
				...state,
				registeredSkills: action.payload,
			};
		case BOOK_A_DEMO:
			return {
				...state,
				demoBooking: action.payload,
			};
		case SEARCH_SKILL:
			return {
				...state,
				searchedSkills: action.payload,
			};
		case GET_SUBSCRIBED_SKILLS:
			return {
				...state,
				subscribedSkills: action.payload,
			};
		// case SELECTED_SKILL:
		// 	return {
		// 		...state,
		// 		selectedSkill: action.payload,
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
