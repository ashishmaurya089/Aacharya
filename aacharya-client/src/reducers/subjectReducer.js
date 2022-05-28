import {
	FETCH_SEGMENTS,
	FETCH_LEVELS,
	FETCH_STREAMS,
	FETCH_CATEGORIES,
	FETCH_SUBJECTS,
	SUBJECT_MESSAGE,
	SELECT_SEGMENT,
	SELECT_LEVEL,
	SELECT_STREAM,
	SELECT_CATEGORY,
	REMOVE_SUBJECT,
	SEARCH_SUBJECTS,
	SEARCH_CATEGORY,
	SEARCH_STREAM,
	SEARCH_LEVEL,
} from '../constants/subjectConstants';

export const subjectReducer = (
	state = {
		segments: [],
		selectedSegmentId: '',
		levels: [],
		selectedLevelId: '',
		searchedLevels: [],
		streams: [],
		selectedStreamId: '',
		searchedStreams: [],
		categories: [],
		selectedCategoryId: '',
		searchedCategories: [],
		subjects: [],
		searchedSubjects: [],
		msg: '',
		loading: false,
		hasNext: false,
		page: 0,
	},
	action
) => {
	switch (action.type) {
		case FETCH_SEGMENTS:
			return {
				...state,
				segments: action.payload,
			};
		case FETCH_LEVELS:
			return {
				...state,
				levels: [...action.payload],
			};
		case FETCH_STREAMS:
			return {
				...state,
				streams: [...action.payload],
			};
		case FETCH_CATEGORIES:
			return {
				...state,
				categories: [...action.payload],
			};
		case FETCH_SUBJECTS:
			return {
				...state,
				subjects: [...action.payload],
				hasNext: action.hasNext,
				page: action.page,
			};
		case SEARCH_LEVEL:
			return {
				...state,
				searchedLevels: action.payload,
			};
		case SEARCH_STREAM:
			return {
				...state,
				searchedStreams: action.payload,
			};
		case SEARCH_CATEGORY:
			return {
				...state,
				searchedCategories: action.payload,
			};
		case SEARCH_SUBJECTS:
			return {
				...state,
				searchedSubjects: action.payload,
			};
		case SELECT_SEGMENT:
			return {
				...state,
				selectedSegmentId: action.payload,
			};
		case SELECT_LEVEL:
			return {
				...state,
				selectedLevelId: action.payload,
			};
		case SELECT_STREAM:
			return {
				...state,
				selectedStreamId: action.payload,
			};
		case SELECT_CATEGORY:
			return {
				...state,
				selectedCategoryId: action.payload,
			};
		case 'RESET_CATEGORY':
			return {
				...state,
				selectedCategoryId: null,
			};
		case SUBJECT_MESSAGE:
			return {
				...state,
				msg: action.payload,
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
