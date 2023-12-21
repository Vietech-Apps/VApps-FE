import React from "react";

import PropTypes from "prop-types";
import { List } from "antd";
import {
  StyledNotifyListItem,
  StyledNotifyMsgAvatar,
  StyleTime,
} from "./NotificationItem.styled";
import { StyledCrUserInfoAvatar } from "../AppLayout/components/UserInfo/index.styled";
import moment from "moment";
import jwtAxios from "meta/services/auth/jwt-api";
import { useNavigate } from "react-router-dom";

const NotificationItem = (props) => {
  const { item, setRefreshing } = props;

  const navigate = useNavigate();
  const getUserAvatar = () => {
    if (item.senderId.name) {
      return item.senderId.name.charAt(0).toUpperCase();
    }
    if (item.senderId.email) {
      return item.senderId.email.charAt(0).toUpperCase();
    }
  };
  const handleClick = async (item) => {
    await jwtAxios.patch(`meta/notification/update/${item._id}`, {
      isRead: true,
    });
    setRefreshing();
    navigate(item.path);
  };
  return (
    <StyledNotifyListItem
      onClick={() => handleClick(item)}
      className="item-hover"
    >
      <List.Item.Meta
        size={"small"}
        avatar={
          item.senderId.picture[0]?.url ? (
            <StyledNotifyMsgAvatar
              src={item.senderId?.picture[0]?.url}
              alt={item.senderId.name}
            />
          ) : (
            <StyledCrUserInfoAvatar>{getUserAvatar()}</StyledCrUserInfoAvatar>
          )
        }
        title={
          <>
            {item.senderId?.name} {item.senderId?.lastName}
            <StyleTime className="message-time">
              {moment(item.createdAt).fromNow()}
            </StyleTime>
          </>
        }
        description={item.message}
      />
    </StyledNotifyListItem>
  );
};

export default NotificationItem;

NotificationItem.propTypes = {
  item: PropTypes.object.isRequired,
};
