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
import { getSenderFull } from "pages/apps/Chat/ChatLogics";

const ConnectionItem = ({ item, selectedChat, setSelectedUser }) => {
  const { user } = useAuthUser();

  return (
    <StyledChatListItem
      className={clsx("item-hover", {
        active:
          selectedChat?.users &&
          getSenderFull(user, selectedChat?.users)?._id === item._id,
      })}
      onClick={() => setSelectedUser({ userId: item._id })}
    >
      <StyledChatUserAvatarView>
        <StyledChatAvatar src={item?.picture[0]?.url} />
        <StyledChatUserStatusDot
          className="chat-user-status-dot chat-user-status-dot-only"
          style={{
            backgroundColor: item?.status === "online" ? green[6] : red[6],
          }}
        />
      </StyledChatUserAvatarView>
      <StyledChatListItemContent>
        <h3>{`${item?.name} ${item?.lastName}`}</h3>
        <p className="text-truncate mb-0">@{item?.process?.title}</p>
      </StyledChatListItemContent>
    </StyledChatListItem>
  );
};

export default ConnectionItem;
