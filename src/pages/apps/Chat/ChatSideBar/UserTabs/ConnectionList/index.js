import React from "react";
import ConnectionItem from "./ConnectionItem";
import PropTypes from "prop-types";
import AppList from "meta/core/AppList";
import ListEmptyResult from "meta/core/AppList/ListEmptyResult";
import ChatListSkeleton from "meta/core/AppSkeleton/ChatListSkeleton";
import { useIntl } from "react-intl";
import { StyledAppScrollbar, StyledChatSidebarTitle } from "../../index.styled";

const ConnectionList = ({
  connectionListData,
  loading,
  selectedChat,
  setSelectedUser,
}) => {
  const { messages } = useIntl();
  return (
    <StyledAppScrollbar>
      <StyledChatSidebarTitle>Contacts</StyledChatSidebarTitle>
      <AppList
        data={connectionListData}
        ListEmptyComponent={
          <ListEmptyResult
            content={messages["chatApp.noUserFound"]}
            loading={loading}
            placeholder={<ChatListSkeleton />}
          />
        }
        renderItem={(item) => (
          <ConnectionItem
            key={item._id}
            item={item}
            setSelectedUser={setSelectedUser}
            selectedChat={selectedChat}
          />
        )}
      />
    </StyledAppScrollbar>
  );
};

export default ConnectionList;

ConnectionList.propTypes = {
  connectionListData: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  selectedUser: PropTypes.object,
  setSelectedUser: PropTypes.func,
};
