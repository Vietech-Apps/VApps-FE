import React, { useState } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatContent from "./ChatContent";
import { useIntl } from "react-intl";
import AppsContainer from "meta/core/AppsContainer";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useGetData } from "meta/services/auth/ezAPI";
import { useAuthUser } from "meta/utility/AuthHooks";

const Chat = () => {
  const { user } = useAuthUser();
  const [
    { apiData: selectedChat },
    { setQueryParams: setSelectedUser, setData: setSelectedChat },
  ] = useGetData("chat/read", {}, {}, false);

  const [
    { apiData: connectionList, loading },
    { setRefreshing, setData: setConnectionData },
  ] = useGetData("chat/all", []);
  const [{ apiData: usersList }] = useGetData("admin/alllist", []);

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages["chatApp.chat"]}
      sidebarContent={
        <ChatSideBar
          selectedChat={selectedChat}
          setRefreshing={setRefreshing}
          setSelectedChat={setSelectedChat}
          setSelectedUser={setSelectedUser}
          connectionList={connectionList}
          usersList={usersList?.filter((p) => p._id !== user._id)}
          loading={loading}
        />
      }
    >
      <AppPageMetadata title="Chat App" />
      <ChatContent
        selectedChat={selectedChat}
        setRefreshing={setRefreshing}
        setSelectedChat={setSelectedChat}
        setConnectionData={setConnectionData}
      />
    </AppsContainer>
  );
};

export default Chat;
