import React from 'react';
import AppCard from 'meta/core/AppCard';
import './index.style.less';

const StatsCard = (props) => {
  const {icon, data, heading} = props;

  return (
    <AppCard className='stats-card card-hover'>
      <div className='stats-row'>
        <div className='stats-avatar'>
          <img src={icon} alt='icon' />
        </div>
        <div className='stats-content'>
          <h3>{data.count}</h3>
          <p>{heading}</p>
        </div>
      </div>
    </AppCard>
  );
};

export default StatsCard;
