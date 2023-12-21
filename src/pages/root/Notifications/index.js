import AppCard from 'meta/core/AppCard';
import React from 'react';
import {Comment, Tooltip, List, Avatar} from 'antd';
import moment from 'moment';
import {useSelector} from 'react-redux';
import jwtAxios from 'meta/services/auth/jwt-api';
const NotificationList = () => {
  const notifications = useSelector(
    (state) => state.notificationList.notificationList,
  );
  const handleClick = async (item) => {
    await jwtAxios.patch(`meta/notification/update/${item._id}`, {
      isRead: true,
    });
  };
  return (
    <AppCard>
      <List
        className='comment-list'
        header={`${notifications.length} Total`}
        itemLayout='horizontal'
        dataSource={notifications}
        renderItem={(item) => (
          <li>
            <Comment
              className='notify-listItem item-hover'
              onClick={() => handleClick(item)}
              author={<a>{item.senderId.name}</a>}
              avatar={
                <Avatar
                  className='notify-message-avatar'
                  src={item.senderId.avatar}
                />
              }
              content={
                <p>
                  {item.message} {item.type.substring(0, 3)} Id_{item.docId}
                </p>
              }
              datetime={
                <Tooltip title='vaild for 3 day'>
                  <span>{moment(item.createdAt).fromNow()}</span>
                </Tooltip>
              }
            />
          </li>
        )}
      />
    </AppCard>
  );
};

export default NotificationList;
