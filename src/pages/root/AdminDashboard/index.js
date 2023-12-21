import React, {useEffect, useState} from 'react';
import AppRowContainer from 'meta/core/AppRowContainer';
import {Card, Col, Statistic} from 'antd';

import MonthlyEarning from './TaskGraph';
import TodayTasks from './TodayTasks';
import {AppInfoView} from 'meta';
import crmData from './crm';
import AppPageMetadata from 'meta/core/AppPageMetadata';
import jwtAxios from 'meta/services/auth/jwt-api';
import {GiOrganigram} from 'react-icons/gi';
import {RiUserStarLine} from 'react-icons/ri';
import {AiOutlineUsergroupAdd} from 'react-icons/ai';
import {BiLocationPlus} from 'react-icons/bi';

const CRM = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await jwtAxios.get('meta/dashboard');
      setData(response.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <AppPageMetadata title='CRM Dashboard' />
      {crmData ? (
        <AppRowContainer delay={150}>
          <Col xs={24} lg={6} className='mb-1' key={'aa'}>
            <Card hoverable>
              <Statistic
                title='Employees'
                value={data?.admin?.all}
                prefix={<AiOutlineUsergroupAdd />}
              />
            </Card>
          </Col>
          <Col xs={24} lg={6} className='mb-1' key={'ab'}>
            <Card hoverable>
              <Statistic
                title='Process'
                value={data?.process?.all}
                prefix={<GiOrganigram />}
              />
            </Card>
          </Col>
          <Col xs={24} lg={6} className='mb-1' key={'ac1'}>
            <Card hoverable>
              <Statistic
                title='Desigantion'
                value={data?.designation?.all}
                prefix={<RiUserStarLine />}
              />
            </Card>
          </Col>
          <Col xs={24} lg={6} className='mb-1' key={'ac'}>
            <Card hoverable>
              <Statistic
                title='Venues'
                value={data?.venue?.all}
                prefix={<BiLocationPlus />}
              />
            </Card>
          </Col>
          {/*<Col xs={24} lg={8} className='mb-1' key={'ab'}>
            <SocialDataCard data={data.process}/>
          </Col>
          <Col xs={24} lg={8} className='mb-1' key={'ac'}>
            <SocialDataCard data={data.admin}/>
          </Col> */}
          <Col xs={24} lg={16} key={'f'}>
            <TodayTasks todayTaskData={crmData.todayTaskData} />
          </Col>
          <Col xs={24} lg={8} key={'d'}>
            <MonthlyEarning earningGraphData={crmData.earningGraphData} />
          </Col>
        </AppRowContainer>
      ) : null}

      <AppInfoView />
    </>
  );
};

export default CRM;
