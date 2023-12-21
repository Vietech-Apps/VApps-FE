import React from 'react';
import AppCard from 'meta/core/AppCard';
import PropTypes from 'prop-types';
import './index.style.less';
import AppScrollbar from 'meta/core/AppScrollbar';


const WelcomeCard = ({data}) => {
  return (
    <AppCard className='welcome-card'>
      <div className='welcome-card-info'>
        <div className='welcome-card-content'>
          <div className='welcome-card-header'>
            <h5>Designation</h5>
            {/* <h3>{messages['dashboard.analytics.eddieMassy']}</h3> */}
          </div>
          <AppScrollbar scrollToTop className='welcome-card-scroll'>
            <div className='welcome-card-container'>
              <div className='welcome-card-row'>
               
                  <div className='welcome-card-col' key={'box-'}>
                    <div className='welcome-card-col-thumb'>
                      <span className='ant-avatar ant-avatar-circle ant-avatar-image'>
                        {/* {getWelcomeIcon(item.icon)} */}
                      </span>
                    </div>
                    <div className='welcome-card-col-content'>
                      <h5 className='special-title'>{data.all}</h5>
                      <p>{data?.removed}</p>
                    </div>
                  </div>
               
              </div>
            </div>
          </AppScrollbar>
        </div>
        {/* <div className='welcome-img'>
          <img alt='welcome' src={'/assets/images/dashboard/welcomImage.svg'} />
        </div> */}
      </div>
    </AppCard>
  );
};

export default WelcomeCard;

WelcomeCard.defaultProps = {
  data: [],
};

WelcomeCard.propTypes = {
  data: PropTypes.array,
};
