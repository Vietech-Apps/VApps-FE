import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';
import AppAnimateGroup from 'meta/core/AppAnimateGroup';
import './AuthWrapper.style.less';
import {AppInfoView} from 'meta';
import SigninLogo from 'meta/core/AppLayout/components/SigninLogo';

const AuthWrapper = ({children}) => {
  return (
    <AppAnimateGroup
      type='scale'
      animateStyle={{flex: 1}}
      delay={4}
      interval={10}
      duration={200}>
      <div className='auth-wrap' key={'wrap'}>
        <Card className='auth-card'>
          <div className='auth-main-content'>
            <div className='auth-card-header'>
              <SigninLogo />
            </div>
            {children}
          </div>
          <div className='auth-wel-action'>
            <img src='/assets/images/signIn.jpg' alt='meta-logo' />
          
          </div>
        </Card>
      </div>
      <AppInfoView />
    </AppAnimateGroup>
  );
};

export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropTypes.node,
};
