import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import BoardList from './project-list/ProjectList';
import {useParams} from 'react-router-dom';
import {onGetMemberList, onGetScrumLabelList} from 'redux/actions';

const ScrumBoard = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(onGetScrumLabelList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetMemberList());
  }, [dispatch]);

  const onGetMainComponent = () => {
   
      return <BoardList />;
    
  };

  return <>{onGetMainComponent()}</>;
};

export default ScrumBoard;
