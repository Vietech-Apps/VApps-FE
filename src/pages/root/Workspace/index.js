import React from 'react';
import CalendarListing from './Calendar';
import AppPageMetadata from 'meta/core/AppPageMetadata';

const Calendar = () => {
  return (
    <>
      <AppPageMetadata title='Calendar' />
      <CalendarListing />
    </>
  );
};

export default Calendar;
