import React from 'react';
import TaskList from './TaskList';
// import DateSelector from './DateSelector';
import PropTypes from 'prop-types';
import AppCard from 'meta/core/AppCard';
import AppRowContainer from 'meta/core/AppRowContainer';
import {Calendar, Col} from 'antd';
import './index.style.less';
import {useIntl} from 'react-intl';
import IntlMessages from 'meta/utility/IntlMessages';
import AppScrollbar from 'meta/core/AppScrollbar';

const TodayTasks = (props) => {
  const {todayTaskData} = props;
  const {messages} = useIntl();

  return (
    <AppCard
      className='today-task-card card-hover'
      title={messages['dashboard.todayTasks']}
      heightFull
      extra={
        <div className='today-task-extra'>
          <a href='#' className='link link-grey link-hide'>
            <IntlMessages id='common.createTask' />
          </a>
          <a href='#' className='link'>
            <IntlMessages id='common.viewAll' />
          </a>
        </div>
      }
    >
      <AppRowContainer>
        <Col xs={24} md={12} xxl={14}>
          <AppScrollbar className='today-task-scrollbar'>
            <TaskList todayTaskData={todayTaskData} />
          </AppScrollbar>
        </Col>

        <Col xs={24} md={12} xxl={10} className='task-calendar-col'>
          <Calendar className='task-calendar' />
        </Col>
      </AppRowContainer>
    </AppCard>
  );
};

export default TodayTasks;
