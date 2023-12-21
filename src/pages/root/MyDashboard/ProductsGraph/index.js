import React from "react";
import EarningGraph from "./EarningGraph";
import PropTypes from "prop-types";
import Categories from "./Categories";
import { useIntl } from "react-intl";

import {
  StyledEarningMonthCard,
  StyledEarningMonthGraphView,
} from "./index.styled";

const EarningInMonth = ({ data, color }) => {
  return (
    <StyledEarningMonthCard
      title={"Task"}
      actions={[<Categories key={1} data={data} color={color} />]}
      heightFull
    >
      <StyledEarningMonthGraphView>
        <EarningGraph data={data} color={color} />
      </StyledEarningMonthGraphView>
    </StyledEarningMonthCard>
  );
};

export default EarningInMonth;

EarningInMonth.defaultProps = {
  data: [],
};

EarningInMonth.propTypes = {
  data: PropTypes.array,
};
