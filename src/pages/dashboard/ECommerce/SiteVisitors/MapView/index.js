import React, {useState} from 'react';
import MapChart from './MapChart';
import ReactTooltip from 'react-tooltip';
import {StyledMapView} from '../index.styled';

const MapView = () => {
  const [content, setContent] = useState('');
  return (
    <StyledMapView>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </StyledMapView>
  );
};

export default MapView;
