import {
	GET_CHATS,
	GET_CHAT_DETAILS,
	SELECTED_CHAT,
	SEND_MSG_TO_CHAT_ROOM,
	START_CHAT,
} from '../constants/chatConstants';

const initialState = {
	chat: null,
	selectedChat: null,
	sendMsgToChatRoom: null,
	getAllChats: [],
	getChatRoomDetails: [],
	loading: false,
};

export const chatReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case START_CHAT:
			//console.log(payload);
			return {
				...state,
				chat: payload,
			};
		case SEND_MSG_TO_CHAT_ROOM:
			//console.log(payload);

			return {
				...state,
				// sendMsgToChatRoom: payload,
				getChatRoomDetails: [...state.getChatRoomDetails, payload],
			};
		case GET_CHATS:
			//console.log(payload);
			return {
				...state,
				getAllChats: payload,
			};
		case GET_CHAT_DETAILS:
			//console.log(payload);
			return {
				...state,
				getChatRoomDetails: payload,
			};
		case SELECTED_CHAT:
			//console.log(payload);
			return {
				...state,
				selectedChat: payload,
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
