import React from 'react';
import PropTypes from 'prop-types';
import AppCard from 'meta/core/AppCard';
import './index.style.less';
import IntlMessages from 'meta/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {useAuthUser} from 'meta/utility/AuthHooks';
import Clock from 'react-live-clock';
import {Textfit} from 'react-textfit';
import moment from 'moment';

const TotalRevenue = ({revenueData}) => {
  const {user} = useAuthUser();
  const {messages} = useIntl();
  return (
    <AppCard className='stats-card card-hover'>
      <div className='welcome-card-header'>
        <h5>{messages['dashboard.analytics.welcome']}</h5>
        <h1>{`${user.name}${' '}${user.lastName}`}</h1>
      </div>
    </AppCard>
  );
};

export default TotalRevenue;
