import React from "react";
import IntlMessages from "meta/utility/IntlMessages";
import AppsDeleteIcon from "meta/core/AppsDeleteIcon";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Dropdown } from "antd";
import { MdLabelOutline } from "react-icons/md";
import AppIconButton from "meta/core/AppIconButton";
import { StyledTodoHeaderCheckedAction } from "../index.styled";
import { putDataApi, useGetDataApi } from "meta/utility/APIHooks";
import { useInfoViewActionsContext } from "meta/utility/AppContextProvider/InfoViewContextProvider";

const CheckedTasksActions = ({
  checkedTasks,
  setCheckedTasks,
  onUpdateTasks,
  setData,
  page,
}) => {
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const infoViewActionsContext = useInfoViewActionsContext();

  const [{ apiData: labelList }] = useGetDataApi("/api/todo/labels/list", []);

  const onDeleteTasks = () => {
    putDataApi("/api/todo/update/folder", infoViewActionsContext, {
      taskIds: checkedTasks,
      type: path[path.length - 2],
      name: path[path.length - 1],
      page,
    })
      .then((data) => {
        setData(data);
        infoViewActionsContext.showMessage("Task Deleted Successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    setCheckedTasks([]);
  };

  const onSelectLabel = (key) => {
    putDataApi("/api/todo/update/label", infoViewActionsContext, {
      taskIds: checkedTasks,
      type: +key,
    })
      .then((data) => {
        onUpdateTasks(data);
        infoViewActionsContext.showMessage("Task Updated Successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    setCheckedTasks([]);
  };

  const menuLabel = labelList.map((label, index) => {
    return {
      key: index,
      label: <span onClick={() => onSelectLabel(label.id)}> {label.name}</span>,
    };
  });

  return (
    <>
      <StyledTodoHeaderCheckedAction>
        <AppsDeleteIcon
          deleteAction={onDeleteTasks}
          deleteTitle={<IntlMessages id="todo.deleteMessage" />}
        />

        <Dropdown menu={{ items: menuLabel }} trigger={["click"]}>
          <AppIconButton
            title={<IntlMessages id="common.label" />}
            icon={<MdLabelOutline />}
          />
        </Dropdown>
      </StyledTodoHeaderCheckedAction>
    </>
  );
};

export default CheckedTasksActions;

CheckedTasksActions.propTypes = {
  checkedTasks: PropTypes.array.isRequired,
  setCheckedTasks: PropTypes.func,
  onUpdateTasks: PropTypes.func,
  setData: PropTypes.func,
  page: PropTypes.number.isRequired,
};
