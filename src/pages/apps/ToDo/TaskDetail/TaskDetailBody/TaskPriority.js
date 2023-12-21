import React from "react";
import { blue, green, red } from "@ant-design/colors";
import { Select } from "antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { StyledTodoSelectBox } from "../index.styled";
import { putDataApi, useGetDataApi } from "meta/utility/APIHooks";
import { useInfoViewActionsContext } from "meta/utility/AppContextProvider/InfoViewContextProvider";

const TaskPriority = ({ selectedTask, onUpdateSelectedTask }) => {
  const infoViewActionsContext = useInfoViewActionsContext();
 const priorityList = [
   { id: 4545554, name: "High", type: 1, color: red[5] },
   { id: 9384234, name: "Medium", type: 2, color: blue[5] },
   { id: 4354454, name: "Low", type: 3, color: green[5] },
 ];

  const onChangePriority = (value) => {
    selectedTask.priority = priorityList.find(
      (priority) => priority.type === value
    );
    putDataApi("/api/todoApp/task/", infoViewActionsContext, {
      task: selectedTask,
    })
      .then((data) => {
        onUpdateSelectedTask(data[0]);
        infoViewActionsContext.showMessage("Task Updated Successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const { messages } = useIntl();
  return (
    <StyledTodoSelectBox
      defaultValue={selectedTask?.priority?.type}
      placeholder={messages["common.priority"]}
      onChange={(value) => onChangePriority(value)}
    >
      {priorityList.map((priority) => {
        return (
          <Select.Option key={priority.id} value={priority.type}>
            {priority.name}
          </Select.Option>
        );
      })}
    </StyledTodoSelectBox>
  );
};

export default TaskPriority;

TaskPriority.propTypes = {
  selectedTask: PropTypes.object.isRequired,
  onUpdateSelectedTask: PropTypes.func,
};
