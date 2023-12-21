import React, { useEffect, useRef, useState } from "react";
import AddNewMessage from "./AddNewMessage";
import MessagesList from "./MessagesList";
import moment from "moment";
import Header from "./Header";
import IntlMessages from "meta/utility/IntlMessages";
import AppsHeader from "meta/core/AppsContainer/AppsHeader";
import { MessageType } from "meta/services/db/apps/chat/connectionList";
import { useAuthUser } from "meta/utility/AuthHooks";
import {
  StyledMessageScreen,
  StyledMsgAppsFooter,
  StyledMsgScreenScrollbar,
  StyledNoMsg,
  StyledScrollChatNoMain,
} from "../index.styled";
import { postDataApi } from "meta/utility/APIHooks";
import { useInfoViewActionsContext } from "meta/utility/AppContextProvider/InfoViewContextProvider";
import { useGetData, usePostData, usePutData } from "meta/services/auth/ezAPI";
import { getSender, getSenderFull } from "../../ChatLogics";
import { io } from "socket.io-client";
var selectedChatCompare, socket;
const MessagesScreen = ({
  selectedChat,
  selectedUser,
  setSelectedUser,
  setConnectionData,
}) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const infoViewActionsContext = useInfoViewActionsContext();

  const [selectedMessage, setSelectedMessage] = useState(null);
  useEffect(() => {
    socket = io();
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
      console.log("Socket Activated");
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  const [{ apiData: userMessages }, { setQueryParams, setData }] = useGetData(
    "chat/message",
    [],
    {},
    false
  );
  const { user } = useAuthUser();

  let _scrollBarRef = useRef(null);

  useEffect(() => {
    setQueryParams({ chatId: selectedChat?._id });
    selectedChatCompare = selectedChat;

    socket.emit("join chat", selectedChat._id);
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log(
        selectedChatCompare._id,
        newMessageRecieved.chat._id,
        "newMessageRecieved"
      );
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //   if (!notification.includes(newMessageRecieved)) {
        //     setNotification([newMessageRecieved, ...notification]);
        //     setFetchAgain(!fetchAgain);
        //   }
      } else {
        console.log("object");

        setData([...userMessages, newMessageRecieved]);
        //  setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    if (userMessages?.length > 0) {
      if (_scrollBarRef?.current) {
        const scrollEl = _scrollBarRef.current.getScrollElement();
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    }
  }, [userMessages, _scrollBarRef]);

  const sendFileMessage = (fileMessage) => {
    const data = {
      ...fileMessage,
      sender: user.id,
      time: moment().format("llll"),
    };
    postDataApi("/api/chatApp/message", infoViewActionsContext, {
      channelId: selectedUser?.channelId,
      message: data,
    })
      .then((data) => {
        setData(data?.userMessages);
        setConnectionData(data?.connectionData);
        infoViewActionsContext.showMessage("Message Added Successfully!");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onSend = () => {
    socket.emit("stop typing", selectedChat._id);
    if (!message) {
      // data.edited = true;
      usePutData("chat/message", infoViewActionsContext, {
        content: message,
        chatId: selectedChat._id,
      })
        .then((data) => {
          setData([...userMessages, data?.result]);
          //setConnectionData(data?.connectionData);
          infoViewActionsContext.showMessage("Message Edited Successfully!");
        })
        .catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });

      setMessage("");
      setIsEdit(false);
      setSelectedMessage(null);
    } else {
      usePostData("chat/message/send", infoViewActionsContext, {
        content: message,
        chatId: selectedChat._id,
      })
        .then((data) => {
          setData([...userMessages, data?.result]);
          socket.emit("new message", data.result);
          //setConnectionData(data?.connectionData);
          infoViewActionsContext.showMessage("Message Added Successfully!");
        })
        .catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
      setMessage("");
    }
  };

  const onChangeStarred = (checked) => {
    setIsChecked(checked);
  };

  const onClickEditMessage = (data) => {
    if (data.message_type === MessageType.TEXT) {
      setIsEdit(true);
      setMessage(data.message);
      setSelectedMessage(data);
    }
  };

  const deleteMessage = (messageId) => {
    postDataApi("/api/chatApp/delete/message", infoViewActionsContext, {
      channelId: selectedUser?.channelId,
      messageId,
    })
      .then((data) => {
        setData(data?.userMessages);
        setConnectionData(data?.connectionData);
        infoViewActionsContext.showMessage("Message Deleted Successfully!");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const deleteConversation = () => {
    postDataApi("/api/chatApp/delete/user/messages", infoViewActionsContext, {
      channelId: selectedUser?.channelId,
    })
      .then((data) => {
        //setSelectedUser(undefined);
        setConnectionData(data);
        infoViewActionsContext.showMessage("Chat Deleted Successfully!");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };
  const clearChatHistory = () => {
    postDataApi("/api/chatApp/clearChat", infoViewActionsContext, {
      channelId: selectedUser?.channelId,
    })
      .then((data) => {
        setData(data?.userMessages);
        setConnectionData(data?.connectionData);
        infoViewActionsContext.showMessage("Chat Cleared Successfully!");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <StyledMessageScreen>
      <AppsHeader>
        <Header
          isChecked={isChecked}
          onChangeStarred={onChangeStarred}
          selectedUser={getSenderFull(user, selectedChat.users)}
          deleteConversation={deleteConversation}
          clearChatHistory={clearChatHistory}
        />
      </AppsHeader>

      {userMessages && user ? (
        <StyledMsgScreenScrollbar ref={_scrollBarRef}>
          <MessagesList
            userMessages={userMessages}
            authUser={user}
            selectedChat={selectedChat}
            onClickEditMessage={onClickEditMessage}
            deleteMessage={deleteMessage}
          />
          {istyping && <div>Typing...</div>}
        </StyledMsgScreenScrollbar>
      ) : (
        <StyledScrollChatNoMain>
          <StyledNoMsg>
            <IntlMessages id="chatApp.sayHi" />
            {!selectedChat.isGroupChat
              ? getSender(user, selectedChat.users)
              : selectedChat.chatName}
          </StyledNoMsg>
        </StyledScrollChatNoMain>
      )}

      <StyledMsgAppsFooter>
        <AddNewMessage
          currentMessage={message}
          message={message}
          setMessage={setMessage}
          typingHandler={typingHandler}
          sendFileMessage={sendFileMessage}
          onSendMessage={onSend}
        />
      </StyledMsgAppsFooter>
    </StyledMessageScreen>
  );
};

export default MessagesScreen;
