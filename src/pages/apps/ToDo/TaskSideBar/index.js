import React from "react";
import PropTypes from "prop-types";
import AddNewTask from "../AddNewTask";
import IntlMessages from "meta/utility/IntlMessages";
import AppsSideBarFolderItem from "meta/core/AppsSideBarFolderItem";
import LabelItem from "./LabelItem";
import AppList from "meta/core/AppList";
import ListEmptyResult from "meta/core/AppList/ListEmptyResult";
import SidebarPlaceholder from "meta/core/AppSkeleton/SidebarListSkeleton";
import { Button } from "antd";
import {
  StyledPlusOutlined,
  StyledTodoScrollbar,
  StyledTodoSidebarContent,
  StyledTodoSidebarHeader,
  StyledTodoSidebarList,
  StyledTodoSidebarTitle,
} from "./index.styled";
import { useGetDataApi } from "meta/utility/APIHooks";
import { useGetData } from "meta/services/auth/ezAPI";
import {
  StyledChatSidebarTabs,
  StyledTabItem,
} from "pages/apps/Chat/ChatSideBar/index.styled";
import { BsChatSquareText } from "react-icons/bs";
import { BiUserPin } from "react-icons/bi";
import ProcessItem from "./ProcessItem";

const TaskSideBar = ({ reCallAPI }) => {
  // const { user } = useAuthUser();

  const folderList = [
    { id: 120, name: "All", alias: "all", icon: "user" },
    { id: 121, name: "Starred", alias: "starred", icon: "star" },
    { id: 123, name: "Scheduled", alias: "scheduled", icon: "clock" },
    { id: 124, name: "Today", alias: "today", icon: "calendar-minus" },
    { id: 125, name: "Completed", alias: "completed", icon: "check-circle" },
    { id: 126, name: "Deleted", alias: "deleted", icon: "trash-alt" },
  ];

  const [{ apiData: labelList }] = useGetData("meta/label/list?type=todo", []);

  const [{ apiData: processList }] = useGetData("meta/process/list", []);

  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };
  const items = [
    {
      label: (
        <StyledTabItem>
          <BsChatSquareText />
          {"Labels"}
        </StyledTabItem>
      ),
      key: "1",
      children: (
        <AppList
          data={labelList}
          ListEmptyComponent={
            <ListEmptyResult
              loading={true}
              placeholder={<SidebarPlaceholder />}
            />
          }
          renderItem={(label) => <LabelItem key={label._id} label={label} />}
        />
      ),
    }, // remember to pass the key prop
    {
      label: (
        <StyledTabItem>
          <BiUserPin />
          {"Departments"}
        </StyledTabItem>
      ),
      key: "2",
      children: (
        <AppList
          data={processList}
          ListEmptyComponent={
            <ListEmptyResult
              loading={true}
              placeholder={<SidebarPlaceholder />}
            />
          }
          renderItem={(label) => <ProcessItem key={label._id} label={label} />}
        />
      ),
    },
  ];

  return (
    <>
      <StyledTodoSidebarHeader>
        <Button
          ghost
          type="primary"
          icon={<StyledPlusOutlined style={{ marginRight: 8 }} />}
          onClick={onOpenAddTask}
        >
          <IntlMessages id="todo.addNewTask" />
        </Button>
      </StyledTodoSidebarHeader>

      <StyledTodoScrollbar>
        <StyledTodoSidebarContent>
          <StyledTodoSidebarList itemLayout="horizontal">
            <AppList
              data={folderList}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={<SidebarPlaceholder />}
                />
              }
              renderItem={(item) => (
                <AppsSideBarFolderItem
                  key={item.id}
                  item={item}
                  path={`/apps/todo/folder/${item.alias}`}
                />
              )}
            />
          </StyledTodoSidebarList>

          <StyledChatSidebarTabs defaultActiveKey="1" items={items} />
        </StyledTodoSidebarContent>
      </StyledTodoScrollbar>

      {isAddTaskOpen ? (
        <AddNewTask
          isAddTaskOpen={isAddTaskOpen}
          onCloseAddTask={onCloseAddTask}
          reCallAPI={reCallAPI}
        />
      ) : null}
    </>
  );
};

export default TaskSideBar;

TaskSideBar.propTypes = {
  reCallAPI: PropTypes.func,
};
