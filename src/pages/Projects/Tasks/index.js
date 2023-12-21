import React, {useEffect} from 'react';
import Main from './Tasks';
import AppPageMetadata from 'meta/core/AppPageMetadata';
import {useDispatch} from 'react-redux';
import {onGetProcessList} from 'redux/actions';
import AppAnimateGroup from 'meta/core/AppAnimateGroup';
import AppCard from 'meta/core/AppCard';
import './components/index.style.less';

const Index = () => {
  // const {messages} = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetProcessList());
  }, [dispatch]);

  return (
    <>
      <AppPageMetadata title={'Task Manager'} />
      <AppAnimateGroup type='bottom'>
        <AppCard>
          <Main />
        </AppCard>
      </AppAnimateGroup>
    </>
  );
};

export default Index;
