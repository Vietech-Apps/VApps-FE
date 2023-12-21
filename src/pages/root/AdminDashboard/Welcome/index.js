import React from 'react';
import AppCard from 'meta/core/AppCard';
import './index.style.less';

const TotalRevenue = () => {
  return (
    <AppCard className='stats-card card-hover'>
      <div className='welcome-card-header'>
        <h5>{'Welcome to'}</h5>
        <h1>{`Admin Dashboard!`}</h1>
      </div>
    </AppCard>
  );
};

export default TotalRevenue;
