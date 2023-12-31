import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import IntlMessages from "meta/utility/IntlMessages";
import clsx from "clsx";
import PropTypes from "prop-types";
import Labels from "./Labels";
import Priority from "./Priority";
import AppsStarredIcon from "meta/core/AppsStarredIcon";
import { Avatar, Checkbox } from "antd";
import AppIconButton from "meta/core/AppIconButton";
import { AiOutlineDelete } from "react-icons/ai";
import { MdLabelOutline } from "react-icons/md";
import {
  StyledTodoListCheckboxView,
  StyledTodoListImg,
  StyledTodoListImgView,
  StyledTodoListItem,
  StyledTodoListItemHide,
  StyledTodoListItemLeft,
  StyledTodoListStarView,
  StyledTodoListTitle,
  StyledTodoListItemRight,
  StyledTodoListRightContent,
  StyledTodoListStartDate,
  StyledTodoListItemAction,
} from "../index.styled";
import { useInfoViewActionsContext } from "meta/utility/AppContextProvider/InfoViewContextProvider";
import { putDataApi } from "meta/utility/APIHooks";

const TaskListItem = ({
  task,
  onChangeCheckedTasks,
  checkedTasks,
  onChangeStarred,
  onUpdateSelectedTask,
}) => {
  const navigate = useNavigate();
  const { name } = useParams();
  const infoViewActionsContext = useInfoViewActionsContext();

  const onViewTaskDetail = (task) => {
    navigate(`/apps/todo/${name}/${task._id}`);
  };

  const onDeleteTask = () => {
    task.folderValue = 126;
    putDataApi("/api/todoApp/task/", infoViewActionsContext, {
      task,
    })
      .then(() => {
        onUpdateSelectedTask(task);
        infoViewActionsContext.showMessage("Task Deleted Successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <StyledTodoListItem
      key={task.id}
      className={clsx("item-hover", {
        checked: checkedTasks.includes(task._id),
      })}
      onClick={() => onViewTaskDetail(task)}
    >
      <StyledTodoListItemLeft>
        <StyledTodoListCheckboxView
          onClick={(event) => event.stopPropagation()}
        >
          <Checkbox
            checked={checkedTasks.includes(task._id)}
            onChange={(event) => onChangeCheckedTasks(event, task._id)}
            color="primary"
          />
        </StyledTodoListCheckboxView>

        <StyledTodoListImgView>
          <StyledTodoListStarView onClick={(event) => event.stopPropagation()}>
            <AppsStarredIcon item={task} onChange={onChangeStarred} />
          </StyledTodoListStarView>
          <StyledTodoListImg>
            <Avatar src={task?.assignedTo?.image} />
          </StyledTodoListImg>
        </StyledTodoListImgView>

        <StyledTodoListTitle className="text-truncate">
          {task.title}
        </StyledTodoListTitle>

        {task.priority ? (
          <StyledTodoListItemHide>
            <Priority priority={task.priority} />
          </StyledTodoListItemHide>
        ) : null}
      </StyledTodoListItemLeft>

      <StyledTodoListItemRight>
        {task.label ? <Labels labels={task.label} /> : null}

        <StyledTodoListRightContent className="todo-list-item-right-content">
          <StyledTodoListStartDate className="text-truncate">
            <IntlMessages id="todo.scheduleFor" /> {task.startDate}
          </StyledTodoListStartDate>
        </StyledTodoListRightContent>

        <StyledTodoListItemAction className="todo-list-item-action">
          <AppIconButton
            onClick={onDeleteTask}
            title={<IntlMessages id="common.delete" />}
            icon={<AiOutlineDelete />}
          />

          <AppIconButton
            title={<IntlMessages id="common.label" />}
            icon={<MdLabelOutline />}
          />
        </StyledTodoListItemAction>
      </StyledTodoListItemRight>
    </StyledTodoListItem>
  );
};

export default TaskListItem;

TaskListItem.defaultProps = {
  checkedTasks: [],
};

TaskListItem.propTypes = {
  task: PropTypes.object.isRequired,
  onChangeCheckedTasks: PropTypes.func,
  checkedTasks: PropTypes.array,
  onChangeStarred: PropTypes.func,
  onUpdateSelectedTask: PropTypes.func,
  match: PropTypes.object,
};
