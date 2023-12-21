import React from "react";
import IntlMessages from "meta/utility/IntlMessages";
import KBItem from "./KBItem";
import PropTypes from "prop-types";
import AppRowContainer from "meta/core/AppRowContainer";
import { StyledKnowSales } from "./index.styled";
import AppAnimate from "meta/core/AppAnimate";

const Sales = ({ saleQueries }) => {
  return (
    <StyledKnowSales>
      <AppAnimate animation="transition.slideLeftIn" delay={200}>
        <h3>
          <IntlMessages id="knowledge.sales" />
        </h3>
      </AppAnimate>
      <AppRowContainer>
        {saleQueries.map((sale, index) => (
          <KBItem data={sale} key={index} />
        ))}
      </AppRowContainer>
    </StyledKnowSales>
  );
};

export default Sales;

Sales.propTypes = {
  saleQueries: PropTypes.array.isRequired,
};
