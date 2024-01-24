import React from "react";
import TaskSideBar from "./TaskSideBar/index";
import TasksList from "./TasksList";
import TaskDetail from "./TaskDetail";
import { useIntl } from "react-intl";
import AppsContainer from "meta/core/AppsContainer";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useParams } from "react-router-dom";
import { useGetData } from "meta/services/auth/ezAPI";
import { useAuthUser } from "meta/utility/AuthHooks";

const ToDo = () => {
  const { user } = useAuthUser();
  const [
    { apiData: taskLists, loading },
    { setQueryParams, setData, reCallAPI },
  ] = useGetData(`/scrum/todo/list/${user?._id}`, {});

  const paramas = useParams();
  const { id } = paramas;

  const onGetMainComponent = () => {
    if (id) {
      return <TaskDetail />;
    } else {
      return (
        <TasksList
          taskLists={taskLists}
          loading={loading}
          setQueryParams={setQueryParams}
          setData={setData}
        />
      );
    }
  };

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages["todo.todoApp"]}
      sidebarContent={<TaskSideBar reCallAPI={reCallAPI} />}
    >
      <AppPageMetadata title="Todo App" />
      {onGetMainComponent()}
    </AppsContainer>
  );
};

export default ToDo;
