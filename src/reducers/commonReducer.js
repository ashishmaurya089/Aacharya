import {
	GET_AVATAR,
	GET_BACKDROP,
	GET_BANNERS,
	GET_COMPETITION_DOCUMENTS,
	GET_DEGREE_PROOF,
	GET_DISTANCE_BETWEEN_TWO,
	GET_FIRM_PROOF,
	GET_GALLERY,
	GET_HEAD_PROOF,
	GET_RECOGNITION_PROOF,
	GET_ID_PROOF,
	GET_LOGO,
	GET_REFERRAL_CODE,
	GET_WORK_PROOF,
	GET_AWARD_PROOF,
	GET_HIGHEST_PROOF,
	RESET_UPLOADED_FILES,
} from '../constants/commonConstants';
import { USER_LOGOUT } from '../constants/registrationConstants';

// import { toast } from 'react-toastify';

const initialState = {
	banners: [],
	idProof: [],
	workProof: [],
	recogProof:[],
	highestProof: [],
	awardProof: [],
	degreeProof: [],
	backdrop: [],
	logo: '',
	distance: null,
	firmProof: [],
	headProof: [],
	referral: null,
	profileImage: '',
	gallery: [],
	loading: false,
};

export const commonReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_BANNERS:
			return {
				...state,
				banners: payload,
			};
		case GET_AVATAR:
			return {
				...state,
				profileImage: payload,
			};
		case GET_ID_PROOF:
			return {
				...state,
				idProof: payload,
			};
		case GET_WORK_PROOF:
			return {
				...state,
				workProof: payload,
			};
		case GET_HIGHEST_PROOF:
			return {
				...state,
				highestProof: payload,
			};
		case GET_AWARD_PROOF:
			return {
				...state,
				awardProof: payload,
			};
		case GET_DEGREE_PROOF:
			return {
				...state,
				degreeProof: payload,
			};
		case GET_FIRM_PROOF:
			return {
				...state,
				firmProof: payload,
			};
		case GET_BACKDROP:
			return {
				...state,
				backdrop: payload,
			};
		case GET_LOGO:
			return {
				...state,
				logo: payload,
			};
		case GET_HEAD_PROOF:
			return {
				...state,
				headProof: payload,
			};
		case GET_RECOGNITION_PROOF:
			return {
				...state,
				recogProof: payload,
			};
		case GET_REFERRAL_CODE:
			return {
				...state,
				referral: payload,
			};
		case GET_DISTANCE_BETWEEN_TWO:
			return {
				...state,
				distance: payload,
			};
		case GET_GALLERY:
			return {
				...state,
				gallery: [...state.gallery, ...payload],
			};
		case USER_LOGOUT:
			return {
				...state,
				idProof: [],
				workProof: [],
				degreeProof: [],
				backdrop: [],
				logo: '',
				firmProof: [],
				headProof: [],
				profileImage: '',
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
