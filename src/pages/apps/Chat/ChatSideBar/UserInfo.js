import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "antd";
import { green, red } from "@ant-design/colors";
import { DownOutlined } from "@ant-design/icons";
import { BiCheck } from "react-icons/bi";

import {
  StyledChatUserAvatar,
  StyledChatUserAvatarView,
  StyledChatUserInfo,
  StyledChatUserInfoContext,
  StyledChatUserName,
  StyledChatUserStatus,
  StyledChatUserStatusDot,
  StyledChatUserStatusText,
  StyledDropDownItem,
} from "./userInfo.styled";

const UserInfo = ({ user, showStatus, showStatusActive }) => {
  const getUserAvatar = () => {
    const name = user.displayName || user.name;
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };

  if (!user) {
    return null;
  }

  const items = [
    {
      key: 1,
      label: (
        <StyledDropDownItem className="active">
          <BiCheck className="icon" /> Active
        </StyledDropDownItem>
      ),
    },
    {
      key: 2,
      label: (
        <StyledDropDownItem>
          <BiCheck className="icon" /> Away
        </StyledDropDownItem>
      ),
    },
    {
      key: 3,
      label: (
        <StyledDropDownItem>
          <BiCheck className="icon" /> Do not distrub
        </StyledDropDownItem>
      ),
    },
    {
      key: 4,
      label: (
        <StyledDropDownItem>
          <BiCheck className="icon" />
          Invisible
        </StyledDropDownItem>
      ),
    },
  ];

  return (
    <StyledChatUserInfo>
      <StyledChatUserAvatarView>
        {user?.picture ? (
          <StyledChatUserAvatar src={user?.picture[0]?.url} />
        ) : (
          <StyledChatUserAvatar>{getUserAvatar()}</StyledChatUserAvatar>
        )}
        {showStatus && (
          <StyledChatUserStatusDot
            className="chat-user-status-dot chat-user-status-dot-only"
            style={{
              backgroundColor: user.status === "online" ? green[6] : red[6],
            }}
          />
        )}
        {showStatusActive && (
          <StyledChatUserStatus>
            <StyledChatUserStatusDot
              className="chat-user-status-dot"
              style={{
                backgroundColor: user.status === "online" ? green[6] : red[6],
              }}
            />
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <DownOutlined />
              </a>
            </Dropdown>
          </StyledChatUserStatus>
        )}
      </StyledChatUserAvatarView>
      <StyledChatUserInfoContext>
        <StyledChatUserName className="text-truncate">
          {user.displayName || user.name
            ? user.displayName || user.name
            : user.email}
        </StyledChatUserName>
        <StyledChatUserStatusText className="text-truncate">
          {user.status ? user.status : "Online"}
        </StyledChatUserStatusText>
      </StyledChatUserInfoContext>
    </StyledChatUserInfo>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  showStatus: PropTypes.bool,
  showStatusActive: PropTypes.bool,
};
