import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { MessageType } from "meta/services/db/apps/chat/connectionList";
import { Button, Input } from "antd";
import { generateUniqueID } from "meta/utility/Utils";
import {
  StyledAddNewMessage,
  StyledNewMessageAction,
  StyledNewMsgActionFirst,
} from "../index.styled";

const AddNewMessage = ({
  sendFileMessage,
  typingHandler,
  onSendMessage,
  message = "",
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles) => {
      sendFileMessage({
        message: "",
        message_type: MessageType.MEDIA,
        media: acceptedFiles.map((file) => {
          return {
            id: generateUniqueID(),
            url: URL.createObjectURL(file),
            mime_type: file.type,
            file_name: file.name,
            file_size: file.size,
          };
        }),
      });
    },
  });

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      onClickSendMessage();
    }
  };

  const onClickSendMessage = () => {
    if (message) {
      onSendMessage();
    }
  };

  const { messages } = useIntl();

  return (
    <StyledAddNewMessage>
      <StyledNewMsgActionFirst>
        {message === "" ? (
          <Button
            {...getRootProps({
              className: "message-btn dropzone",
            })}
          >
            <input {...getInputProps()} />
            <PaperClipOutlined />
          </Button>
        ) : null}
      </StyledNewMsgActionFirst>
      <Input
        placeholder={messages["chatApp.sendMessagePlaceholder"]}
        value={message}
        onChange={(event) => {
          if (event.target.value !== "\n") typingHandler(event);
        }}
        onKeyPress={onKeyPress}
      />

      <StyledNewMessageAction>
        <Button className="message-btn" onClick={onClickSendMessage}>
          <SendOutlined />
        </Button>
      </StyledNewMessageAction>
    </StyledAddNewMessage>
  );
};

export default AddNewMessage;

AddNewMessage.defaultProps = {
  message: "",
};

AddNewMessage.propTypes = {
  sendFileMessage: PropTypes.func,
  onSendMessage: PropTypes.func,
  currentMessage: PropTypes.string,
};
