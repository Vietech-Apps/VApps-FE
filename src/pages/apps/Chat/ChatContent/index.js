import React from "react";
import NoUserScreen from "./NoUserScreen";
import MessagesScreen from "./MessagesScreen";
import { StyledChatContentScreen, StyledChatNoScreen } from "./index.styled";

const ChatContent = ({ selectedChat, setSelectedChat, setConnectionData }) => {
  return (
    <>
      {selectedChat?.users ? (
        <StyledChatContentScreen>
          <MessagesScreen
            setConnectionData={setConnectionData}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </StyledChatContentScreen>
      ) : (
        <StyledChatNoScreen>
          <NoUserScreen />
        </StyledChatNoScreen>
      )}
    </>
  );
};

export default ChatContent;
