import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TaskContentHeader from "./TaskContentHeader";
import TaskListItem from "./TaskListItem";
import TaskCalender from "./TaskCalendar";
import { useLocation } from "react-router-dom";
import AddNewTask from "../AddNewTask";
import AppsPagination from "meta/core/AppsPagination";
import AppsHeader from "meta/core/AppsContainer/AppsHeader";
import AppsContent from "meta/core/AppsContainer/AppsContent";
import ListEmptyResult from "meta/core/AppList/ListEmptyResult";
import TodoListSkeleton from "meta/core/AppSkeleton/TodoListSkeleton";
import AppList from "meta/core/AppList";
import TaskListItemMobile from "./TaskListItemMobile";
import {
  StyledTodoFooter,
  StyledTodoListDesktop,
  StyledTodoListMobile,
} from "./index.styled";
import { useGetDataApi } from "meta/utility/APIHooks";
import { useInfoViewActionsContext } from "meta/utility/AppContextProvider/InfoViewContextProvider";
import { useGetData, usePutData } from "meta/services/auth/ezAPI";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import errorHandler from "meta/services/auth/errorHandler";

const TasksList = ({ taskLists, loading, setQueryParams, setData }) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const { pathname } = useLocation();

  const [{ apiData: labelList }] = useGetData("meta/label/list?type=todo", []);

  const [filterText, onSetFilterText] = useState("");

  const [page, setPage] = useState(0);

  const [checkedTasks, setCheckedTasks] = useState([]);

  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);

  const [pageView, setPageView] = useState("list");

  useEffect(() => {
    setPage(0);
  }, [pathname]);

  useEffect(() => {
    const path = pathname.split("/");
    setQueryParams({
      type: path[path.length - 2],
      name: path[path.length - 1],
      page: page,
    });
  }, [page, pageView, pathname]);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  const onChange = (page) => {
    setPage(page - 1);
  };

  const onChangeCheckedTasks = (checked, id) => {
    if (checked) {
      setCheckedTasks(checkedTasks.concat(id));
    } else {
      setCheckedTasks(checkedTasks.filter((taskId) => taskId !== id));
    }
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

  const onUpdateSelectedTask = (task) => {
    setData({
      data: taskLists?.data?.map((item) => {
        if (item._id === task._id) {
          return task;
        }
        return item;
      }),
      count: taskLists?.count,
    });
  };

  const onDeleteSelectedTask = (task) => {
    setData({
      data: taskLists?.data.filter((item) => item.id !== task.id),
      count: taskLists?.count - 1,
    });
  };

  // const onGetFilteredItems = () => {
  //   if (filterText === "") {
  //     return taskLists;
  //   } else {
  //     return taskLists.filter((task) =>
  //       task.title.toUpperCase().includes(filterText.toUpperCase())
  //     );
  //   }
  // };

  const onChangePageView = (view) => {
    setPageView(view);
  };
  const onUpdateTasks = (tasks) => {
    setData({
      data: taskLists?.data.map((item) => {
        const contact = tasks.find((contact) => contact.id === item.id);
        if (contact) {
          return contact;
        }
        return item;
      }),
      count: taskLists?.count,
    });
  };

  // const list = onGetFilteredItems();
  return (
    <>
      <AppsHeader>
        <TaskContentHeader
          taskLists={[]}
          checkedTasks={checkedTasks}
          setCheckedTasks={setCheckedTasks}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          onUpdateTasks={onUpdateTasks}
          setData={setData}
          onChange={onChange}
          page={page}
          onChangePageView={onChangePageView}
          pageView={pageView}
        />
      </AppsHeader>
      <AppsContent>
        {pageView === "list" ? (
          <>
            <StyledTodoListDesktop>
              <AppList
                data={taskLists?.data}
                renderItem={(task) => (
                  <TaskListItem
                    key={task._id}
                    task={task}
                    labelList={labelList}
                    onChangeCheckedTasks={onChangeCheckedTasks}
                    checkedTasks={checkedTasks}
                    onChangeStarred={onChangeStarred}
                    onUpdateSelectedTask={onDeleteSelectedTask}
                  />
                )}
                ListEmptyComponent={
                  <ListEmptyResult
                    loading={loading}
                    actionTitle="Add Task"
                    onClick={onOpenAddTask}
                    placeholder={<TodoListSkeleton />}
                  />
                }
              />
            </StyledTodoListDesktop>
            <StyledTodoListMobile>
              <AppList
                data={taskLists?.data}
                renderItem={(task) => (
                  <TaskListItemMobile
                    key={task.id}
                    task={task}
                    labelList={labelList}
                    checkedTasks={checkedTasks}
                    onChangeStarred={onChangeStarred}
                    onChangeCheckedTasks={onChangeCheckedTasks}
                  />
                )}
                ListEmptyComponent={
                  <ListEmptyResult
                    loading={loading}
                    actionTitle="Add Task"
                    onClick={onOpenAddTask}
                    placeholder={<TodoListSkeleton />}
                  />
                }
              />
            </StyledTodoListMobile>
          </>
        ) : (
          <TaskCalender taskList={taskLists?.data} />
        )}
      </AppsContent>

      {taskLists?.data?.length > 0 ? (
        <StyledTodoFooter>
          <AppsPagination
            count={taskLists?.count}
            page={page}
            onChange={onChange}
          />
        </StyledTodoFooter>
      ) : null}

      {isAddTaskOpen ? (
        <AddNewTask
          isAddTaskOpen={isAddTaskOpen}
          onCloseAddTask={onCloseAddTask}
        />
      ) : null}
    </>
  );
};

export default TasksList;
