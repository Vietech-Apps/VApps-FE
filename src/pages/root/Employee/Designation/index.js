import React from 'react';
import DesignationListing from './Designation';
import AppPageMetadata from 'meta/core/AppPageMetadata';

const Designation = () => {
  return (
    <>
      <AppPageMetadata title='Designation' />
      <DesignationListing />
    </>
  );
};

export default Designation;
