import React from "react";
import IntlMessages from "meta/utility/IntlMessages";
import PropTypes from "prop-types";
import { CheckOutlined } from "@ant-design/icons";
import { StyledTodoDetailStatusBtn } from "../index.styled";
import { putDataApi } from "meta/utility/APIHooks";
import { useInfoViewActionsContext } from "meta/utility/AppContextProvider/InfoViewContextProvider";

const StatusToggleButton = ({ selectedTask, onUpdateSelectedTask }) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const onChangeTaskStatus = (status) => {
    const task = selectedTask;
    task.status = status;

    putDataApi("/api/todoApp/task/", infoViewActionsContext, {
      task,
    })
      .then((data) => {
        onUpdateSelectedTask(data[0]);
        infoViewActionsContext.showMessage("Task Updated Successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <>
      {selectedTask.status === 3 ? (
        <StyledTodoDetailStatusBtn
          className="bg-color"
          onClick={() => onChangeTaskStatus(1)}
        >
          <CheckOutlined className="check-icon" />
          <IntlMessages id="todo.completed" />
        </StyledTodoDetailStatusBtn>
      ) : (
        <StyledTodoDetailStatusBtn onClick={() => onChangeTaskStatus(3)}>
          <CheckOutlined className="check-icon" />
          <IntlMessages id="todo.markAsCompleted" />
        </StyledTodoDetailStatusBtn>
      )}
    </>
  );
};

export default StatusToggleButton;

StatusToggleButton.propTypes = {
  selectedTask: PropTypes.object.isRequired,
  onUpdateSelectedTask: PropTypes.func,
};
