import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { green, red } from "@ant-design/colors";
import {
  StyledChatAvatar,
  StyledChatListItem,
  StyledChatListItemContent,
} from "../../index.styled";
import {
  StyledChatUserAvatarView,
  StyledChatUserStatusDot,
} from "../../userInfo.styled";
import { useAuthUser } from "meta/utility/AuthHooks";
import { getSender, getSenderFull } from "pages/apps/Chat/ChatLogics";
import { StyledMsgChatAvatar } from "pages/apps/Chat/ChatContent/MessagesScreen/MessageItem.style";

const ChatItem = ({ item, selectedChat, setSelectedChat }) => {
  const { user } = useAuthUser();
  return (
    <StyledChatListItem
      className={clsx("item-hover", {
        active: selectedChat && selectedChat?._id === item._id,
      })}
      onClick={() => setSelectedChat(item)}
    >
      <StyledChatUserAvatarView>
        {item?.isGroupChat ? (
          <StyledChatAvatar className="message-chat-avatar">
            {item?.name?.charAt(0).toUpperCase()}
          </StyledChatAvatar>
        ) : getSenderFull(user, item?.users)?.picture ? (
          <StyledChatAvatar
            src={getSenderFull(user, item?.users)?.picture[0]?.url}
          />
        ) : (
          <StyledChatAvatar className="message-chat-avatar">
            {getSenderFull(user, item?.users)?.name?.charAt(0).toUpperCase()}
          </StyledChatAvatar>
        )}
        <StyledChatUserStatusDot
          className="chat-user-status-dot chat-user-status-dot-only"
          style={{
            backgroundColor: item.status === "online" ? green[6] : red[6],
          }}
        />
      </StyledChatUserAvatarView>
      <StyledChatListItemContent>
        <h3>
          {!item.isGroupChat ? getSender(user, item?.users) : item?.chatName}
        </h3>
        {item?.latestMessage && (
          <p className="text-truncate mb-0">
            <b>{item?.latestMessage?.sender?.name} : </b>
            {item.latestMessage.content.length > 50
              ? item.latestMessage.content.substring(0, 51) + "..."
              : item.latestMessage.content}
          </p>
        )}
      </StyledChatListItemContent>
    </StyledChatListItem>
  );
};

export default ChatItem;
