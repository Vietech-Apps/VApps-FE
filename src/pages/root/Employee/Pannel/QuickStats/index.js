import React from 'react';
import StatsCard from './StatsCard';
import './index.style.less';
import AppRowContainer from 'meta/core/AppRowContainer';
import {Col} from 'antd';
import {blue, cyan, geekblue, red} from '@ant-design/colors';
import {
  UserOutlined,
  ContainerOutlined,
  FileZipOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import IntlMessages from 'meta/utility/IntlMessages';

const QuickStats = ({quickStatsData}) => {
  return (
    <>
      {/* <h2 className='card-outer-title text-uppercase'>
        <IntlMessages id='dashboard.quickStats' />
      </h2> */}
      <AppRowContainer>
        <Col xs={24} sm={24}>
          <StatsCard
            icon={'/assets/images/dashboard/total-projects.svg'}
            data={quickStatsData.clientsData}
            heading={'Total Tasks'}
          />
        </Col>
      </AppRowContainer>
    </>
  );
};

export default QuickStats;
