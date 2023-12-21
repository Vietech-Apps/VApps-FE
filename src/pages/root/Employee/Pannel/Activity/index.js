import React from 'react';
import AppCard from 'meta/core/AppCard';
import NotificationCell from './NotificationCell';
import {List} from 'antd';
import './index.style.less';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppMenu from 'meta/core/AppMenu';
import AppScrollbar from 'meta/core/AppScrollbar';

const NotificationsEcom = (props) => {
  const {messages} = useIntl();
  return (
    <AppCard
      className='no-card-space-ltr-rtl'
      title={'Activities'}
      extra={<AppMenu />}
    >
      <AppScrollbar className='notification-scrollBar'>
        <List
          itemLayout='horizontal'
          dataSource={props.notifications}
          renderItem={(item) => <NotificationCell key={item.id} item={item} />}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default NotificationsEcom;

NotificationsEcom.propTypes = {
  notifications: PropTypes.array,
};
