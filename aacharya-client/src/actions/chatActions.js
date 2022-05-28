import axios from '../axios';
import { toast } from 'react-toastify';
import {
	GET_CHATS,
	GET_CHAT_DETAILS,
	SEND_MSG_TO_CHAT_ROOM,
	START_CHAT,
} from '../constants/chatConstants';

export const startChat = (peerId) => async (dispatch, getState) => {
	// peerId , forSubject
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/chat/startChat`, {
			peerId: peerId,
		});
		dispatch({
			type: START_CHAT,
			payload: data.data,
		});
		dispatch(getChats());
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
export const sendMsgToChatRoom =
	(chatRoomId, message) => async (dispatch, getState) => {
		// chatRoomId , message

		dispatch({
			type: 'SET_LOADING',
			payload: true,
		});
		try {
			const { data } = await axios.post(`/api/chat/sendMsg`, {
				chatRoomId,
				message,
			});
			dispatch({
				type: SEND_MSG_TO_CHAT_ROOM,
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
			}
			dispatch({
				type: 'SET_LOADING',
				payload: false,
			});
		}
	};
export const getChats = () => async (dispatch, getState) => {
	dispatch({
		type: 'SET_LOADING',
		payload: true,
	});
	try {
		const { data } = await axios.post(`/api/chat/getChats`);
		// data is array
		dispatch({
			type: GET_CHATS,
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
export const getChatDetails = (chatId) => async (dispatch, getState) => {
	// //console.log(chatId);
	// chatId, perPage, page
	const perPage = 20;
	const page = 1;
	// dispatch({
	// 	type: 'SET_LOADING',
	// 	payload: true,
	// });
	try {
		const { data } = await axios.post(`/api/chat/getChatDetail`, { chatId });
		// //console.log(data.data);
		// data is array
		dispatch({
			type: GET_CHAT_DETAILS,
			payload: data.data.reverse(),
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
