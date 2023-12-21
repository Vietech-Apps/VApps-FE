import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import UserTabs from "./UserTabs";
import moment from "moment";
import PropTypes from "prop-types";
import AddGroupChat from "./GroupChat";
import { useIntl } from "react-intl";
import { useAuthUser } from "meta/utility/AuthHooks";
import {
  StyledChatSidebar,
  StyledChatSidebarSearch,
  StyledChatSidebarSearchView,
  StyledChatSidebarUserView,
} from "./index.styled";

const ChatSideBar = ({
  setSelectedUser,
  selectedChat,
  setSelectedChat,
  connectionList,
  usersList,
  loading,
  setRefreshing,
}) => {
  const [keywords, setKeywords] = useState("");
  const { user } = useAuthUser();

  const getConnectionList = () => {
    const connectionList = usersList?.filter((p) => (p) => p._id !== user._id);
    // if (keywords !== "") {
    //   return connectionList?.filter((item) =>
    //     item.name?.toUpperCase().includes(keywords.toUpperCase())
    //   );
    // }
    return connectionList;
  };

  const getChatList = () => {
    let chatsList = connectionList?.filter(
      (item) => item.latestMessage || item.isGroupChat
    );
    chatsList.sort((a, b) => {
      let momentA = moment(a.latestMessage?.createdAt).format("X");
      let momentB = moment(b.latestMessage?.createdAt).format("X");
      return momentB - momentA;
    });
    return chatsList;
  };

  const connectionListData = getConnectionList();

  const chatListData = getChatList();

  const { messages } = useIntl();

  return (
    <StyledChatSidebar>
      <StyledChatSidebarUserView>
        <UserInfo user={user} showStatusActive={true} />
      </StyledChatSidebarUserView>

      <StyledChatSidebarSearchView>
        {/* <StyledChatSidebarSearch
          placeholder={messages["common.searchHere"]}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        /> */}
        <AddGroupChat users={connectionListData} />
      </StyledChatSidebarSearchView>

      <UserTabs
        connectionListData={connectionListData}
        setRefreshing={setRefreshing}
        chatListData={chatListData}
        loading={loading}
        setSelectedUser={setSelectedUser}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
    </StyledChatSidebar>
  );
};

export default ChatSideBar;
ChatSideBar.propTypes = {
  loading: PropTypes.any,
  connectionList: PropTypes.array,
  selectedUser: PropTypes.object,
  setSelectedUser: PropTypes.func,
};
