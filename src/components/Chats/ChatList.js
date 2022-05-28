import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, Divider, IconButton } from '@material-ui/core';
import { ChevronLeft, Close } from '@material-ui/icons';
// Chatscope library
import {
	MainContainer,
	ChatContainer,
	MessageList,
	Message,
	MessageInput,
	ConversationList,
	Conversation,
	Avatar,
	ConversationHeader,
} from '@chatscope/chat-ui-kit-react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import Loader from '@chatscope/chat-ui-kit-react/dist/cjs/Loader';

import { getChatDetails, getChats } from '../../actions/chatActions';
import ChatRoom from './ChatRoom';

import useStyles from './styles';

export default function ChatList({ openChat, handleDrawerClose }) {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	const { getAllChats, getChatRoomDetails, loading } = useSelector(
		(state) => state.chatsData
	);
	const { user, providerProfile } = useSelector((state) => state.usersData);

	const [ChatListOpen, setChatListOpen] = React.useState(true);
	const [chatRoomOpen, setchatRoomOpen] = React.useState(false);

	const handleClose = () => {
		handleDrawerClose();
		setchatRoomOpen(false);
		setChatListOpen(true);
	};
	useEffect(() => {
		dispatch(getChats());
	}, []);

	const handleChatDetails = (chat) => {
		//console.log('chat>>>>>>',chat);
		dispatch(getChatDetails(chat._id));
		setChatListOpen(false);
		setchatRoomOpen(true);
		dispatch({
			type: 'SELECTED_CHAT',
			payload: chat,
		});
	};
	return (
		<>
			<div className={classes.root}>
				<CssBaseline />
				<Drawer
					className={classes.drawer}
					variant='persistent'
					anchor='right'
					open={openChat}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={handleClose}>
							{theme.direction === 'rtl' ? <ChevronLeft /> : <Close />}
						</IconButton>
					</div>
					<Divider />
					{ChatListOpen && (
						<div
							style={{
								height: '100%',
							}}
						>
							{!loading ? (
								<ConversationList>
									{getAllChats && getAllChats.length > 0 ? (
										getAllChats.map((chat) => {
											if (user) {
												if (chat.provider === user._id) {
													return (
														<Conversation
															key={chat._id}
															name={chat.details[0].seekerName}
															// lastSenderName={chat.details[2].providerName}
															info={chat.latestMsg}
															onClick={() => handleChatDetails(chat)}
														>
															<Avatar
																src={chat.details[1].seekerImage}
																name={chat.details[0].seekerName}
															/>
														</Conversation>
													);
												} else {
													return (
														<Conversation
															key={chat._id}
															name={chat.details[2].providerName}
															// lastSenderName={chat.details[2].providerName}
															info={chat.latestMsg}
															onClick={() => handleChatDetails(chat)}
														>
															<Avatar
																src={chat.details[3].providerImage}
																name={chat.details[2].providerName}
															/>
														</Conversation>
													);
												}
											}
										})
									) : (
										<div
											style={{
												position: 'absolute',
												height: '100%',
												width: '100%',
											}}
										>
											<h5
												style={{
													position: 'relative',
													top: '40%',
													color: '#999',
													left: '30%',
												}}
											>
												No Messages
											</h5>
										</div>
									)}
								</ConversationList>
							) : (
								<Loader className={classes.loader} />
							)}
						</div>
					)}

					{chatRoomOpen && (
						<ChatRoom
							setChatListOpen={setChatListOpen}
							setchatRoomOpen={setchatRoomOpen}
						/>
					)}
				</Drawer>
			</div>
		</>
	);
}
