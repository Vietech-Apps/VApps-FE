import React from "react";
import { useNavigate } from "react-router-dom";
import IntlMessages from "meta/utility/IntlMessages";
import PropTypes from "prop-types";
import AppsStarredIcon from "meta/core/AppsStarredIcon";
import StatusToggleButton from "./StatusToggleButton";
import { BiArrowBack } from "react-icons/bi";

import {
  StyledTodoDetailArrow,
  StyledTodoDetailDeleteIcon,
  StyledTodoStarIconView,
} from "../index.styled";

import { putDataApi } from "meta/utility/APIHooks";
import { useInfoViewActionsContext } from "meta/utility/AppContextProvider/InfoViewContextProvider";
import { usePutData } from "meta/services/auth/ezAPI";
import errorHandler from "meta/services/auth/errorHandler";
import successHandler2 from "meta/services/auth/successHandle2";
import jwtAxios from "meta/services/auth/jwt-api";

const TaskDetailHeader = (props) => {
  const { onUpdateSelectedTask, selectedTask } = props;
  const infoViewActionsContext = useInfoViewActionsContext();
  const navigate = useNavigate();
  const onClickBackButton = () => {
    navigate(-1);
  };

  const onChangeStarred = async (checked, task) => {
    try {
      const response = await jwtAxios.put(`scrum/todo/update/${task._id}`, {
        isStarred: checked,
      });
      successHandler2(response);
      onUpdateSelectedTask(response.data.result);
    } catch (error) {
      errorHandler(error);
    }
  };

  const onDeleteTask = async () => {
    const task = selectedTask;

    try {
      const response = await jwtAxios.put(`scrum/todo/update/${task._id}`, {
        isRemoved: true,
        folderValue: 126,
      });
      successHandler2(response);
      onUpdateSelectedTask(response.data.result);
    } catch (error) {
      errorHandler(error);
    }

    navigate(-1);
  };

  return (
    <>
      <StyledTodoDetailArrow
        title={<IntlMessages id="common.back" />}
        onClick={onClickBackButton}
        icon={<BiArrowBack />}
      />

      <StatusToggleButton
        selectedTask={selectedTask}
        onUpdateSelectedTask={onUpdateSelectedTask}
      />

      <StyledTodoStarIconView>
        <AppsStarredIcon item={selectedTask} onChange={onChangeStarred} />
      </StyledTodoStarIconView>

      <StyledTodoDetailDeleteIcon
        deleteAction={onDeleteTask}
        deleteTitle={<IntlMessages id="todo.deleteMessage" />}
      />
    </>
  );
};

export default TaskDetailHeader;

TaskDetailHeader.propTypes = {
  selectedTask: PropTypes.object.isRequired,
  onUpdateSelectedTask: PropTypes.func,
};
