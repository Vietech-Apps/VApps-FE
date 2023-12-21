import React, {useEffect} from 'react';
import AppRowContainer from 'meta/core/AppRowContainer';
import {Col} from 'antd';
import QuickStats from './QuickStats';
import Welcome from './Welcome';
import TimeDate from './timeDate';
import MonthlyEarning from './TaskGraph';
import TodayTasks from './Todos';
//import NotificationsEcom from './Notifications';
//import Activity from './Activity';
import {AppInfoView} from 'meta';
import crmData from './crm';
import AppPageMetadata from 'meta/core/AppPageMetadata';

const CRM = () => {
  //notifications;
  return (
    <>
      <AppPageMetadata title='My Dashboard' />
      {crmData ? (
        <AppRowContainer delay={150}>
          <Col xs={24} lg={8} key={'b'}>
            <Welcome revenueData={crmData.revenueData} />
          </Col>
          <Col xs={24} lg={8} key={'c'}>
            <TimeDate revenueData={crmData.revenueData} />
          </Col>

          <Col xs={24} lg={8} className='mb-0' key={'a'}>
            <QuickStats quickStatsData={crmData.quickStatsData} />
          </Col>
          <Col xs={24} lg={16} key={'f'}>
            <TodayTasks todayTaskData={crmData.dealsTableData} />
          </Col>
          <Col xs={24} lg={8} key={'d'}>
            <MonthlyEarning earningGraphData={crmData.earningGraphData} />
          </Col>
          {/* <Col xs={24} lg={12} key={'h'}>
            <NotificationsEcom notifications={crmData.notifications} />
          </Col>
          <Col xs={24} lg={12} key={'h'}>
            <Activity notifications={crmData.notifications} />
          </Col> */}
        </AppRowContainer>
      ) : null}

      <AppInfoView />
    </>
  );
};

export default CRM;
