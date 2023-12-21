import React from 'react';
import ProcessListing from './Process';
import AppPageMetadata from 'meta/core/AppPageMetadata';

const Process = () => {
  return (
    <>
      <AppPageMetadata title='Process' />
      <ProcessListing />
    </>
  );
};

export default Process;
