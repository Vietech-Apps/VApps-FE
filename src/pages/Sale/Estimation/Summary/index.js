import AppPageMetadata from 'meta/core/AppPageMetadata';
import React from 'react';
import List from './List';

const index = () => {
  return (
    <>
      <AppPageMetadata title='Analytic' />
      <List />
    </>
  );
};

export default index;
