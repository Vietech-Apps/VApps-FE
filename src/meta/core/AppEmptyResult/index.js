import React from 'react';
import PropTypes from 'prop-types';
import IntlMessages from '../../utility/IntlMessages';
import {
  StyledEmptyResult,
  StyledTitle,
  StyledParaText,
  StyledEmptyResultBtn,
} from './index.styled';

const AppEmptyResult = ({title, description, actionTitle, onAction}) => {
  return (
    <StyledEmptyResult>
      <StyledTitle level={4}>{title}</StyledTitle>
      {description ? <StyledParaText>{description}</StyledParaText> : null}
      {actionTitle ? (
        <StyledEmptyResultBtn onClick={onAction}>
          {actionTitle}
        </StyledEmptyResultBtn>
      ) : null}
    </StyledEmptyResult>
  );
};

export default AppEmptyResult;

AppEmptyResult.defaultProps = {
  title: <IntlMessages id='common.noRecordFound' />,
  description: '',
};

AppEmptyResult.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  actionTitle: PropTypes.string,
  onAction: PropTypes.func,
};
