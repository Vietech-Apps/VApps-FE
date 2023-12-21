import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { StyledTodoDots, StyledTodoLabelItem } from "./index.styled";

const LabelItem = ({ label }) => {
  return (
    <StyledTodoLabelItem key={label._id}>
      <NavLink to={`/apps/todo/label/${label.title.replace(/\s+/g, "-")}`}>
        <StyledTodoDots className="todo-dots" />
        {label.title}
      </NavLink>
    </StyledTodoLabelItem>
  );
};

export default LabelItem;

LabelItem.propTypes = {
  label: PropTypes.object.isRequired,
};
