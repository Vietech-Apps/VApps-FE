import React from "react";
import IntlMessages from "meta/utility/IntlMessages";
import KBItem from "./KBItem";
import PropTypes from "prop-types";
import AppRowContainer from "meta/core/AppRowContainer";
import { StyledKnowSection } from "./index.styled";
import AppAnimate from "meta/core/AppAnimate";

const Installation = ({ installationQueries }) => {
  return (
    <StyledKnowSection>
      <AppAnimate animation="transition.slideLeftIn" delay={200}>
        <h3>
          <IntlMessages id="knowledge.installation" />
        </h3>
      </AppAnimate>
      <AppRowContainer>
        {installationQueries.map((data) => (
          <KBItem data={data} key={data.id} />
        ))}
      </AppRowContainer>
    </StyledKnowSection>
  );
};

export default Installation;

Installation.propTypes = {
  installationQueries: PropTypes.array.isRequired,
};
