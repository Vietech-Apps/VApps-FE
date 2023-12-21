import React from "react";
import PropTypes from "prop-types";
import SenderMessageItem from "./SenderMessageItem";
import ReceiverMessageItem from "./ReceiverMessageItem";
import AppList from "meta/core/AppList";
import ListEmptyResult from "meta/core/AppList/ListEmptyResult";
import { AppAnimates } from "shared/constants/AppEnums";
import { StyledChatMsgList } from "./MessageItem.style";

const MessagesList = ({
  userMessages,
  authUser,
  selectedChat,
  onClickEditMessage,
  deleteMessage,
}) => {
  return (
    <StyledChatMsgList>
      <AppList
        animation={AppAnimates.SLIDEUPIN}
        data={userMessages}
        ListEmptyComponent={<ListEmptyResult title="Say Hi" />}
        renderItem={(item, index) => {
          if (item.sender._id === authUser._id) {
            return (
              <SenderMessageItem
                authUser={authUser}
                item={item}
                isPreviousSender={
                  index > 0 &&
                  item.sender._id === userMessages[index - 1].sender._id
                }
                isLast={
                  (index + 1 < userMessages.length &&
                    item.sender._id !== userMessages[index + 1].sender._id) ||
                  index + 1 === userMessages.length
                }
                key={item._id}
                onClickEditMessage={onClickEditMessage}
                deleteMessage={deleteMessage}
              />
            );
          } else {
            return (
              <ReceiverMessageItem
                isPreviousSender={
                  index > 0 &&
                  item.sender._id === userMessages[index - 1].sender._id
                }
                isLast={
                  (index + 1 < userMessages.length &&
                    item.sender._id !== userMessages[index + 1].sender._id) ||
                  index + 1 === userMessages.length
                }
                selectedChat={selectedChat}
                item={item}
                key={item._id}
              />
            );
          }
        }}
      />
    </StyledChatMsgList>
  );
};

export default MessagesList;
