import React from "react";
import ChatItem from "./ChatItem";
import PropTypes from "prop-types";
import AppList from "meta/core/AppList";
import ListEmptyResult from "meta/core/AppList/ListEmptyResult";
import { useIntl } from "react-intl";
import ChatListSkeleton from "meta/core/AppSkeleton/ChatListSkeleton";
import { StyledAppScrollbar, StyledChatSidebarTitle } from "../../index.styled";

const ChatList = ({ chatListData, loading, setSelectedChat, selectedChat }) => {
  const { messages } = useIntl();
  return (
    <StyledAppScrollbar>
      <StyledChatSidebarTitle>Connections</StyledChatSidebarTitle>
      <AppList
        data={chatListData}
        ListEmptyComponent={
          <ListEmptyResult
            content={messages["chatApp.noUserFound"]}
            loading={loading}
            placeholder={<ChatListSkeleton />}
          />
        }
        renderItem={(item) => (
          <ChatItem
            key={item._id}
            item={item}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        )}
      />
    </StyledAppScrollbar>
  );
};

export default ChatList;

ChatList.propTypes = {
  chatListData: PropTypes.array,
  loading: PropTypes.bool,
  setSelectedUser: PropTypes.func,
  selectedUser: PropTypes.object,
};
