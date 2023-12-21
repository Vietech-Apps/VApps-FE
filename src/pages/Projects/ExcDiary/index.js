import React, {useEffect, useState} from 'react';
import Main from './ExecDiary';
import {useIntl} from 'react-intl';
import AppPageMetadata from 'meta/core/AppPageMetadata';
import {useDispatch} from 'react-redux';
import {onGetProcessList} from 'redux/actions';

const Index = () => {
  // const {messages} = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetProcessList());
  }, [dispatch]);

  return (
    <>
      <AppPageMetadata title={'Exective Diary'} />
      <Main />
    </>
  );
};

export default Index;
