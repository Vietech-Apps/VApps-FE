import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  EditOutlined,
  FileTextOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import IntlMessages from "meta/utility/IntlMessages";
import { MessageType } from "meta/services/db/apps/chat/connectionList";
import { getFileSize } from "meta/utility/Utils";
import { Dropdown } from "antd";
import AppMediaViewer from "meta/core/AppMedialViewer";
import clsx from "clsx";
import {
  StyledChatMediaWrapper,
  StyledChatMsgListItem,
  StyledMediaAttach,
  StyledMediaCol,
  StyledMediaCounter,
  StyledMediaImg,
  StyledMediaRow,
  StyledMediaVideo,
  StyledMediaVideoIcon,
  StyledMessageTypePara,
  StyledMsgChat,
  StyledMsgChatAvatar,
  StyledMsgChatItem,
  StyledMsgChatSender,
  StyledMsgChatView,
  StyledMsgInfoEdit,
  StyledMsgMoreDropdownLink,
  StyledMsgTime,
} from "./MessageItem.style";
import { timeFromNow } from "meta/common/MyFns";

const showMediaItems = 2;

const getMediaMessage = (item) => {
  if (item.mime_type.startsWith("image")) {
    return (
      <StyledMediaImg>
        <img alt="" src={item.url} />
      </StyledMediaImg>
    );
  } else if (item.mime_type.startsWith("video")) {
    return (
      <StyledMediaVideo>
        <video src={item.url} />
        <StyledMediaVideoIcon />
      </StyledMediaVideo>
    );
  } else {
    return (
      <StyledMediaAttach>
        <FileTextOutlined />
        <p>
          <span>{item.file_name}</span>
          <span>{getFileSize(item.file_size)}</span>
        </p>
      </StyledMediaAttach>
    );
  }
};

const getMessage = (item, setIndex) => {
  if (item.isText) {
    return <StyledMessageTypePara>{item.content}</StyledMessageTypePara>;
  } else {
    return (
      <StyledChatMediaWrapper>
        <StyledMediaRow>
          {item.media.slice(0, showMediaItems).map((data, index) => (
            <StyledMediaCol
              key={"media-" + data.id}
              onClick={() => setIndex(index)}
            >
              {getMediaMessage(data)}
            </StyledMediaCol>
          ))}
          {item.media.length > showMediaItems ? (
            <StyledMediaCol onClick={() => setIndex(showMediaItems)}>
              <StyledMediaCounter>
                +{item.media.length - showMediaItems}
              </StyledMediaCounter>
            </StyledMediaCol>
          ) : null}
        </StyledMediaRow>
      </StyledChatMediaWrapper>
    );
  }
};
const SenderMessageItem = ({
  authUser,
  item,
  onClickEditMessage,
  isPreviousSender = false,
  deleteMessage,
  isLast,
}) => {
  const [index, setIndex] = useState(-1);
  const getUserAvatar = () => {
    const name = authUser.displayName;
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    if (authUser.email) {
      return authUser.email.charAt(0).toUpperCase();
    }
  };

  const onClose = () => {
    setIndex(-1);
  };
  const items = [
    {
      key: 2,
      label: (
        <span
          onClick={() => {
            deleteMessage(item.id);
          }}
        >
          <IntlMessages id="common.delete" />
        </span>
      ),
    },
  ];

  if (item.isText)
    items.unshift({
      key: 1,
      label: (
        <span
          onClick={() => {
            onClickEditMessage(item);
          }}
        >
          <IntlMessages id="common.edit" />
        </span>
      ),
    });

  return (
    <StyledChatMsgListItem
      className={clsx(
        "right",
        isPreviousSender ? "hide-user-info" : "first-chat-message",
        isLast ? "last-chat-message" : ""
      )}
    >
      <StyledMsgChatView className="message-chat-view">
        <StyledMsgChatItem className="message-chat-item">
          <StyledMsgTime className="message-time">
            {timeFromNow(item.createdAt)}
          </StyledMsgTime>
          <StyledMsgChat className="message-chat">
            {getMessage(item, setIndex)}

            {item.edited && (
              <StyledMsgInfoEdit>
                <EditOutlined />
              </StyledMsgInfoEdit>
            )}
          </StyledMsgChat>
        </StyledMsgChatItem>
        <StyledMsgChatSender className="message-chat-sender">
          {authUser?.picture ? (
            <StyledMsgChatAvatar
              size={34}
              className="message-chat-avatar"
              src={authUser?.picture[0]?.url}
            />
          ) : (
            <StyledMsgChatAvatar className="message-chat-avatar">
              {getUserAvatar()}
            </StyledMsgChatAvatar>
          )}
          <Dropdown menu={{ items }} trigger={["click"]}>
            <StyledMsgMoreDropdownLink className="message-more-dropdown-link">
              <MoreOutlined />
            </StyledMsgMoreDropdownLink>
          </Dropdown>
        </StyledMsgChatSender>
      </StyledMsgChatView>

      <AppMediaViewer index={index} medias={item.media} onClose={onClose} />
    </StyledChatMsgListItem>
  );
};

export default SenderMessageItem;

SenderMessageItem.defaultProps = {};

SenderMessageItem.propTypes = {
  authUser: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  isPreviousSender: PropTypes.bool,
  isLast: PropTypes.bool,
  onClickEditMessage: PropTypes.func,
  deleteMessage: PropTypes.func,
};
