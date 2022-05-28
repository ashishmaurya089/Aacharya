import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Loader from "@chatscope/chat-ui-kit-react/dist/cjs/Loader";
import TypingIndicator from "@chatscope/chat-ui-kit-react/dist/cjs/TypingIndicator";
import moment from "moment";

import { getChatDetails, sendMsgToChatRoom } from "../../actions/chatActions";
import { useInterval } from "../../utils/Polling";

import useStyles from "./styles";

function ChatRoom({ setChatListOpen, setchatRoomOpen }) {
  const classes = useStyles();
  const { getAllChats, getChatRoomDetails, selectedChat, loading } =
    useSelector((state) => state.chatsData);
    
  const { user, providerProfile } = useSelector((state) => state.usersData);
  //console.log('user >>>>>>>>>>>',user);
  const dispatch = useDispatch();

  const inputRef = useRef();

  const handleSend = (message) => {
    dispatch(sendMsgToChatRoom(selectedChat._id, message));
    inputRef.current.focus();
  };
  // var sortData = getChatRoomDetails.sort((a, b) => {
  // 	return new Date(a.createdAt) - new Date(b.createdAt);
  // });
  useInterval(() => {
    dispatch(getChatDetails(selectedChat._id));
  }, 1000);

  const contentAvatar = () => {
    if (selectedChat.provider === user._id) {
      return (
        <Avatar
          src={selectedChat.details[1].seekerImage}
          name={selectedChat.details[0].seekerName}
        />
      );
    } else {
      return (
        <>
          <Avatar
            src={selectedChat.details[3].providerImage}
            name={selectedChat.details[2].providerName}
          />
        </>
      );
    }
  };
  const contentHeaderName = () => {
    if (selectedChat.provider === user._id) {
      return (
        <ConversationHeader.Content
          userName={selectedChat.details[0].seekerName}
          // info='Active 10 mins ago'
        />
      );
    } else {
      return (
        <>
          <ConversationHeader.Content
            userName={selectedChat.details[2].providerName}
            // info='Active 10 mins ago'
          />
        </>
      );
    }
  };
  return (
    <>
      <div
        style={{
          height: "650px",
        }}
      >
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back
              onClick={() => {
                setChatListOpen(true);
                setchatRoomOpen(false);
              }}
            />
            {contentAvatar()}
            {contentHeaderName()}
            {/* <Avatar
							src={selectedChat.details[1].seekerImage}
							name={selectedChat.details[0].seekerName}
						/>
						<ConversationHeader.Content
							userName={selectedChat.details[0].seekerName}
							// info='Active 10 mins ago'
						/> */}
            {/* <ConversationHeader.Actions>
										<VoiceCallButton />
										<VideoCallButton />
										<InfoButton />
									</ConversationHeader.Actions> */}
          </ConversationHeader>
          <MessageList
            scrollBehavior="smooth"
            // typingIndicator={<TypingIndicator content='Eliot is typing' />}
          >
            {loading ? (
              <Loader className={classes.loader} />
            ) : (
              <>
                {getChatRoomDetails && getChatRoomDetails.length > 0
                  ? getChatRoomDetails.map((m, i) => {
                      if (m.author === user._id) {
                        return (
                          <Message
                            key={i}
                            model={{
                              message: `${m.message}`,
                              direction: "outgoing",
                              position: "first",
                              // sentTime: `${moment(m.createdAt).format('LT')}`,
                              // sender: `${selectedChat.details[1].seekername}`,
                            }}
                          >
                            <Message.Footer
                              direction="outgoing"
                              sentTime={`${moment(m.createdAt).format(
                                "L"
                              )} ${moment(m.createdAt).format("LT")}`}
                            />
                          </Message>
                        );
                      } else {
                        return (
                          <Message
                            key={i}
                            model={{
                              message: `${m.message}`,
                              direction: "incoming",
                              position: "first",
                              // sentTime: `${moment(m.createdAt).format('LT')}`,
                              // sender: `${selectedChat.details[1].seekername}`,
                            }}
                          >
                            <Message.Footer
                              direction="outgoing"
                              sentTime={`${moment(m.createdAt).format(
                                "L"
                              )} ${moment(m.createdAt).format("LT")}`}
                            />
                          </Message>
                        );
                      }
                    })
                  : null}
              </>
            )}
          </MessageList>

          <MessageInput
            placeholder="Type message here"
            onSend={handleSend}
            ref={inputRef}
            attachButton={false}
          />
        </ChatContainer>
      </div>
    </>
  );
}

export default ChatRoom;
