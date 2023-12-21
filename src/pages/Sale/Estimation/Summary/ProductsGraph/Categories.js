import React from "react";
import PropTypes from "prop-types";
import {
  StyledEarningMonthCategories,
  StyledEarningMonthCategoriesItem,
} from "./index.styled";
import { Rs } from "meta/Reusable/CalcData";

const Categories = ({ data, color }) => {
  return (
    <StyledEarningMonthCategories>
      {data?.map((item, i) => {
        return (
          <StyledEarningMonthCategoriesItem key={item._id}>
            <span className="dot" style={{ backgroundColor: color[i][5] }} />
            <p>{item.make}</p>
            <p>{Rs(item.total)}</p>
          </StyledEarningMonthCategoriesItem>
        );
      })}
    </StyledEarningMonthCategories>
  );
};

export default Categories;

Categories.defaultProps = {
  data: [],
};

Categories.propTypes = {
  data: PropTypes.array,
};
