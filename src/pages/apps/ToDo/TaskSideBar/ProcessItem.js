import React from "react";
import { NavLink } from "react-router-dom";
import { StyledTodoDots, StyledTodoLabelItem } from "./index.styled";

const ProcessItem = ({ label }) => {
  return (
    <StyledTodoLabelItem key={label._id}>
      <NavLink to={`/apps/todo/process/${label.title}`}>
        <StyledTodoDots className="todo-dots" />
        {label.title}
      </NavLink>
    </StyledTodoLabelItem>
  );
};

export default ProcessItem;
