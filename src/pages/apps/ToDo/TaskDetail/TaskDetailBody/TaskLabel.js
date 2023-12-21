import React from "react";
import { Select } from "antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { putDataApi, useGetDataApi } from "meta/utility/APIHooks";
import { useInfoViewActionsContext } from "meta/utility/AppContextProvider/InfoViewContextProvider";
import { useGetData } from "meta/services/auth/ezAPI";

const TaskLabel = ({ selectedTask, onUpdateSelectedTask }) => {
  const [{ apiData: labelList }] = useGetData("meta/label/list?type=todo", []);
  const infoViewActionsContext = useInfoViewActionsContext();

  const onChangePriority = (value) => {
    selectedTask.label = labelList.filter((label) => value.includes(label._id));
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
    <Select
      placeholder={messages["common.label"]}
      maxTagCount={2}
      style={{ minWidth: 100 }}
      mode="multiple"
      defaultValue={selectedTask?.label?.map((label) => label._id)}
      onChange={onChangePriority}
    >
      {labelList?.map((label) => {
        return (
          <Select.Option value={label._id} key={label._id}>
            {label.title}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default TaskLabel;

TaskLabel.propTypes = {
  selectedTask: PropTypes.object.isRequired,
  onUpdateSelectedTask: PropTypes.func,
};
