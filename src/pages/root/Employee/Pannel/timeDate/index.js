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
  return (
    <>
      <AppCard className='stats-card card-hover'>
        <div className='welcome-card-header'>
          <h5>{moment().format('dddd[,] MMM DD YYYY')}</h5>
          <h2>
            <Textfit mode='single' forceSingleModeWidth={false}>
              <Clock format='hh:mm:ss' interval={1000} ticking={true} />
            </Textfit>
          </h2>
        </div>
      </AppCard>
    </>
  );
};

export default TotalRevenue;
